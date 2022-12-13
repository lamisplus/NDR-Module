WITH bio_data AS (
    SELECT
        DISTINCT ON (p.uuid) p.uuid as personUuid,
    p.hospital_number as hospitalNumber,
    EXTRACT(
    YEAR
    from
    AGE(NOW(), date_of_birth)
    ) as age,
    INITCAP(p.sex) as gender,
    p.date_of_birth as dateOfBirth,
    facility.name as facilityName,
    facility_lga.name as lga,
    facility_state.name as state,
    boui.code as datimId,
    tgroup.display as targetGroup,
    eSetting.display as enrollmentSetting,
    hac.visit_date as artStartDate,
    hr.description as regimenAtStart,
    hrt.description as regimenLineAtStart
FROM
    patient_person p
    INNER JOIN base_organisation_unit facility ON facility.id = facility_id
    INNER JOIN base_organisation_unit facility_lga ON facility_lga.id = facility.parent_organisation_unit_id
    INNER JOIN base_organisation_unit facility_state ON facility_state.id = facility_lga.parent_organisation_unit_id
    INNER JOIN base_organisation_unit_identifier boui ON boui.organisation_unit_id = facility_id
    INNER JOIN hiv_enrollment h ON h.person_uuid = p.uuid
    LEFT JOIN base_application_codeset tgroup ON tgroup.id = h.target_group_id
    LEFT JOIN base_application_codeset eSetting ON eSetting.id = h.enrollment_setting_id
    INNER JOIN hiv_art_clinical hac ON hac.hiv_enrollment_uuid = h.uuid
    AND hac.archived = 0
    INNER JOIN hiv_regimen hr ON hr.id = hac.regimen_id
    INNER JOIN hiv_regimen_type hrt ON hrt.id = hac.regimen_type_id
WHERE
    h.archived = 0
  AND h.facility_id = 1712
  AND hac.is_commencement = true
  AND hac.visit_date >= '01-01-1992'
  AND hac.visit_date <= '01-12-2022'
    ),
    current_clinical AS (
SELECT
    tvs.person_uuid as person_uuid10,
    body_weight as currentWeight,
    tbs.display as tbStatus,
    bac.display as currentClinicalStage,
    preg.display as pregnancyStatus,
    CASE WHEN hac.tb_screen is not null THEN hac.visit_date ELSE null END AS dateOfTbScreened
FROM
    triage_vital_sign tvs
    INNER JOIN (
    SELECT
    person_uuid,
    MAX(capture_date) AS MAXDATE
    FROM
    triage_vital_sign
    GROUP BY
    person_uuid
    ORDER BY
    MAXDATE ASC
    ) AS current_triage ON current_triage.MAXDATE = tvs.capture_date
    AND current_triage.person_uuid = tvs.person_uuid
    INNER JOIN hiv_art_clinical hac ON tvs.uuid = hac.vital_sign_uuid
    INNER JOIN (
    SELECT
    person_uuid,
    MAX(hac.visit_date) AS MAXDATE
    FROM
    hiv_art_clinical hac
    GROUP BY
    person_uuid
    ORDER BY
    MAXDATE ASC
    ) AS current_clinical_date ON current_clinical_date.MAXDATE = hac.visit_date
    AND current_clinical_date.person_uuid = hac.person_uuid
    INNER JOIN hiv_enrollment he ON he.person_uuid = hac.person_uuid
    LEFT JOIN base_application_codeset bac ON bac.id = hac.clinical_stage_id
    LEFT JOIN base_application_codeset preg ON preg.code = hac.pregnancy_status
    LEFT JOIN base_application_codeset tbs ON tbs.id = hac.tb_status :: Integer
WHERE
    hac.archived = 0
  AND he.archived = 0
  AND he.facility_id = 1712
    ),
    laboratory_details_viral_load AS (
SELECT
    DISTINCT ON(lo.patient_uuid) lo.patient_uuid as person_uuid20,
    bac_viral_load.display viralLoadIndication,
    ls.date_sample_collected as dateOfViralLoadSampleCollection,
    lr.result_reported as currentViralLoad,
    lr.date_result_reported as dateOfCurrentViralLoad
FROM
    laboratory_order lo
    LEFT JOIN (
    SELECT
    patient_uuid,
    MAX(order_date) AS MAXDATE
    FROM
    laboratory_order lo
    GROUP BY
    patient_uuid
    ORDER BY
    MAXDATE ASC
    ) AS current_lo ON current_lo.patient_uuid = lo.patient_uuid
    AND current_lo.MAXDATE = lo.order_date
    LEFT JOIN laboratory_test lt ON lt.lab_order_id = lo.id
    AND lt.patient_uuid = lo.patient_uuid
    LEFT JOIN base_application_codeset bac_viral_load ON bac_viral_load.id = lt.viral_load_indication
    LEFT JOIN laboratory_labtest ll ON ll.id = lt.lab_test_id
    INNER JOIN hiv_enrollment h ON h.person_uuid = current_lo.patient_uuid
    LEFT JOIN laboratory_sample ls ON ls.test_id = lt.id
    AND ls.patient_uuid = lo.patient_uuid
    LEFT JOIN laboratory_result lr ON lr.test_id = lt.id
    AND lr.patient_uuid = lo.patient_uuid
WHERE
    ll.lab_test_name = 'Viral Load'
  AND h.archived = 0
  AND lo.archived = 0
  AND lo.facility_id = 1712
    ),
--7242\n" +
    laboratory_details_cd4 AS (
SELECT
    lo.patient_uuid as person_uuid30,
    lr.result_reported as lastCD4Count,
    lr.date_result_reported as dateOfLastCD4Count
FROM
    laboratory_order lo
    INNER JOIN (
    SELECT
    lo.patient_uuid,
    MAX(lo.order_date) AS MAXDATE
    FROM
    laboratory_order lo
    INNER JOIN laboratory_test lt ON lt.lab_order_id = lo.id
    INNER JOIN laboratory_labtest ll ON ll.id = lt.lab_test_id
    AND ll.lab_test_name = 'CD4'
    GROUP BY
    lo.patient_uuid
    ORDER BY
    MAXDATE ASC
    ) current_lo ON current_lo.patient_uuid = lo.patient_uuid
    AND current_lo.MAXDATE = lo.order_date
    INNER JOIN laboratory_test lt ON lt.lab_order_id = lo.id
    INNER JOIN laboratory_result lr ON lr.test_id = lt.id
    INNER JOIN laboratory_labtest ll ON ll.id = lt.lab_test_id
    AND ll.lab_test_name = 'CD4'
WHERE
    lo.archived = 0
  AND lt.archived = 0
    ),
    pharmacy_details_regimen AS (
SELECT
    DISTINCT ON (hartp.person_uuid) hartp.person_uuid as person_uuid40,
    r.visit_date as lastPickupDate,
    hartp.next_appointment as nextPickupDate,
    hartp.refill_period / 30 :: INTEGER as monthsOfARVRefill,
    r.description as currentARTRegimen,
    r.regimen_name as currentRegimenLine,
    (
    CASE WHEN stat.hiv_status ILIKE '%STOP%'
    OR stat.hiv_status ILIKE '%DEATH%'
    OR stat.hiv_status ILIKE '%OUT%' THEN stat.hiv_status WHEN hartp.visit_date + hartp.refill_period + INTERVAL '28 day' < CURRENT_DATE THEN 'IIT' ELSE 'ACTIVE' END
    ) AS currentStatus,
    (
    CASE WHEN stat.hiv_status ILIKE '%STOP%'
    OR stat.hiv_status ILIKE '%DEATH%'
    OR stat.hiv_status ILIKE '%OUT%' THEN stat.status_date WHEN hartp.visit_date + hartp.refill_period + INTERVAL '28 day' < CURRENT_DATE THEN (
    hartp.visit_date + hartp.refill_period + INTERVAL '28 day'
    ):: date ELSE hartp.visit_date END
    ) AS dateOfCurrentStatus
FROM
    hiv_art_pharmacy hartp
    INNER JOIN (
    SELECT
    distinct r.*
    FROM
    (
    SELECT
    h.person_uuid,
    h.visit_date,
    pharmacy_object ->> 'regimenName' :: VARCHAR AS regimen_name,
    hrt.description
    FROM
    hiv_art_pharmacy h,
    jsonb_array_elements(h.extra -> 'regimens') with ordinality p(pharmacy_object)
    INNER JOIN hiv_regimen hr ON hr.description = pharmacy_object ->> 'regimenName' :: VARCHAR
    INNER JOIN hiv_regimen_type hrt ON hrt.id = hr.regimen_type_id
    WHERE
    hrt.id IN (1, 2, 3, 4, 14)
    ) r
    INNER JOIN (
    SELECT
    hap.person_uuid,
    MAX(visit_date) AS MAXDATE
    FROM
    hiv_art_pharmacy hap
    INNER JOIN hiv_enrollment h ON h.person_uuid = hap.person_uuid
    WHERE
    h.archived = 0
    GROUP BY
    hap.person_uuid
    ORDER BY
    MAXDATE ASC
    ) max ON max.MAXDATE = r.visit_date
    AND r.person_uuid = max.person_uuid
    ) r ON r.visit_date = hartp.visit_date
    AND r.person_uuid = hartp.person_uuid
    INNER JOIN hiv_enrollment he ON he.person_uuid = r.person_uuid
    LEFT JOIN (
    SELECT
    sh1.person_id,
    sh1.hiv_status,
    sh1.status_date
    FROM
    hiv_status_tracker sh1
    INNER JOIN (
    SELECT
    person_id as p_id,
    MAX(hst.id) AS MAXID
    FROM
    hiv_status_tracker hst
    INNER JOIN hiv_enrollment h ON h.person_uuid = person_id
    GROUP BY
    person_id
    ORDER BY
    person_id ASC
    ) sh2 ON sh1.person_id = sh2.p_id
    AND sh1.id = sh2.MAXID
    ORDER BY
    sh1.person_id ASC
    ) stat ON stat.person_id = hartp.person_uuid
WHERE
    he.archived = 0
  AND hartp.archived = 0
  AND hartp.facility_id = 1712
ORDER BY
    hartp.person_uuid ASC
    ),
--7917\n" +
    eac AS (
SELECT
    he.person_uuid as person_uuid50,
    max_date_eac.FIRSTDATE AS dateOfCommencementOfEAC,
    count AS numberOfEACSessionCompleted,
    last_eac_complete.LASTEACCOMPLETEDDATE AS dateOfLastEACSessionCompleted,
    ext_date.EXTENDDATE AS dateOfExtendEACCompletion,
    r.date_result_reported AS DateOfRepeatViralLoadResult,
    r.result_reported AS repeatViralLoadResult
FROM
    hiv_eac he
    LEFT JOIN (
    SELECT
    hes.eac_id,
    MAX(hes.eac_session_date) AS FIRSTDATE
    FROM
    hiv_eac_session hes
    WHERE
    status = 'FIRST EAC'
    AND archived = 0
    GROUP BY
    hes.eac_id
    ORDER BY
    FIRSTDATE ASC
    ) AS max_date_eac ON max_date_eac.eac_id = he.uuid
    LEFT JOIN (
    SELECT
    COUNT(hes.eac_id) as count,
    eac_id
    FROM
    hiv_eac_session hes
    GROUP BY
    hes.eac_id
    ) AS completed_eac ON completed_eac.eac_id = he.uuid
    LEFT JOIN (
    SELECT
    hes.eac_id,
    MAX(hes.eac_session_date) AS LASTEACCOMPLETEDDATE
    FROM
    hiv_eac he
    INNER JOIN hiv_eac_session hes ON hes.eac_id = he.uuid
    WHERE
    he.status = 'COMPLETED'
    AND he.archived = 0
    GROUP BY
    hes.eac_id
    ORDER BY
    LASTEACCOMPLETEDDATE ASC
    ) AS last_eac_complete ON last_eac_complete.eac_id = he.uuid
    LEFT JOIN (
    SELECT
    hes.eac_id,
    MAX(hes.eac_session_date) AS EXTENDDATE
    FROM
    hiv_eac_session hes
    WHERE
    hes.status not ilike 'FIRST%'
    AND status not ilike 'SECOND%'
    AND status not ilike 'THIRD%'
    AND hes.archived = 0
    GROUP BY
    hes.eac_id
    ORDER BY
    EXTENDDATE ASC
    ) AS ext_date ON ext_date.eac_id = he.uuid
    LEFT JOIN (
    SELECT
    l.patient_uuid,
    l.date_result_reported,
    l.result_reported
    FROM
    laboratory_result l
    INNER JOIN(
    SELECT
    lr.patient_uuid,
    MIN(lr.date_result_reported) AS date_result_reported
    FROM
    laboratory_result lr
    INNER JOIN (
    SELECT
    hes.eac_id,
    hes.person_uuid,
    MAX(hes.eac_session_date) AS LASTEACCOMPLETEDDATE
    FROM
    hiv_eac he
    INNER JOIN hiv_eac_session hes ON hes.eac_id = he.uuid
    WHERE
    he.status = 'COMPLETED'
    AND he.archived = 0
    GROUP BY
    hes.eac_id,
    hes.person_uuid
    ORDER BY
    LASTEACCOMPLETEDDATE ASC
    ) AS last_eac_complete ON last_eac_complete.person_uuid = lr.patient_uuid
    AND lr.date_result_reported > LASTEACCOMPLETEDDATE
    GROUP BY
    lr.patient_uuid
    ) r ON l.date_result_reported = r.date_result_reported
    AND l.patient_uuid = r.patient_uuid
    ) r ON r.patient_uuid = he.person_uuid
WHERE
    he.archived = 0
    ),
    biometric AS (
SELECT
    he.person_uuid as person_uuid60,
    biometric_count.enrollment_date as dateBiometricsEnrolled,
    biometric_count.count as numberOfFingersCaptured
FROM
    hiv_enrollment he
    LEFT JOIN(
    SELECT
    b.person_uuid,
    count(b.person_uuid),
    max(enrollment_date) enrollment_date
    FROM
    biometric b
    WHERE
    archived = 0
    GROUP BY
    b.person_uuid
    ) biometric_count ON biometric_count.person_uuid = he.person_uuid
WHERE
    he.archived = 0
    )
SELECT
    bd.*,
    ldvl.*,
    ldc.*,
    pdr.*,
    b.*,
    c.*,
    e.*
FROM
    bio_data bd
        LEFT JOIN current_clinical c ON c.person_uuid10 = bd.personUuid
        LEFT JOIN laboratory_details_viral_load ldvl ON ldvl.person_uuid20 = bd.personUuid
        LEFT JOIN laboratory_details_cd4 ldc ON ldc.person_uuid30 = bd.personUuid
        LEFT JOIN pharmacy_details_regimen pdr ON pdr.person_uuid40 = bd.personUuid
        LEFT JOIN eac e ON e.person_uuid50 = bd.personUuid
        LEFT JOIN biometric b ON b.person_uuid60 = bd.personUuid
