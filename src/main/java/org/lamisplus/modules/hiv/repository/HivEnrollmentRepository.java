package org.lamisplus.modules.hiv.repository;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.hiv.domain.dto.HivEnrollmentDTO;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class HivEnrollmentRepository {
    private final JdbcTemplate jdbcTemplate;

    public List<HivEnrollment> findAll() {
        String selectAllQuery = "SELECT * FROM hiv_enrollment";
        return jdbcTemplate.query (
                selectAllQuery,
                new BeanPropertyRowMapper<HivEnrollment> (HivEnrollment.class));
    }

    public int deleteById(Long id) {
        return jdbcTemplate.update ("DELETE FROM hiv_enrollment WHERE id=?", id);
    }

    public HivEnrollmentDTO save(HivEnrollment hivEnrollment) {
        if (hivEnrollment.getId () == null || hivEnrollment.getId () == 0) {

            String insertQuery = "INSERT INTO hiv_enrollment(archived, breastfeeding, " +
                    "created_by, date_confirmed_hiv, date_created, " +
                    "date_enrolled_pmtct, date_modified, date_of_registration, " +
                    "date_started, enrollment_setting_id, entry_point_id, " +
                    " modified_by, person_id, " +
                    "pregnant, send_message, source_of_referrer, " +
                    "status_at_registration_id, target_group_id, tb_status_id, " +
                    "time_hiv_diagnosis, unique_id, uuid, facility_name, pregnancy_status_id, ovc_number, date_of_lpm)" +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)";
            jdbcTemplate.update (insertQuery,
                                 hivEnrollment.getArchived (),
                                 hivEnrollment.getBreastfeeding (),
                                 hivEnrollment.getCreatedBy (),
                                 hivEnrollment.getDateConfirmedHiv (),
                                 hivEnrollment.getDateCreated (),
                                 hivEnrollment.getDateEnrolledPMTCT (),
                                 hivEnrollment.getDateModified (),
                                 hivEnrollment.getDateOfRegistration (),
                                 hivEnrollment.getDateStarted (),
                                 hivEnrollment.getEnrollmentSettingId (),
                                 hivEnrollment.getEntryPointId (),
                                 hivEnrollment.getModifiedBy (),
                                 hivEnrollment.getPersonId (),
                                 hivEnrollment.getPregnant (),
                                 hivEnrollment.getSendMessage (),
                                 hivEnrollment.getSourceOfReferrer (),
                                 hivEnrollment.getStatusAtRegistrationId (),
                                 hivEnrollment.getTargetGroupId (),
                                 hivEnrollment.getTbStatusId (),
                                 hivEnrollment.getTimeHivDiagnosis (),
                                 hivEnrollment.getUniqueId (),
                                 hivEnrollment.getUuid (),
                                 hivEnrollment.getFacilityName (),
                                 hivEnrollment.getPregnancyStatusId (),
                                 hivEnrollment.getOvcNumber (),
                                 hivEnrollment.getDateOfLpm ());

        } else {
            String updateQuery =
                    "UPDATE hiv_enrollment SET archived=?, breastfeeding=?, date_confirmed_hiv=?, " +
                            "date_enrolled_pmtct=?, date_modified=?, date_of_registration=?, " +
                            "date_started=?, enrollment_setting_id=?, entry_point_id=?, " +
                            "modified_by=?, person_id=?, " +
                            "pregnant=?, send_message=?, source_of_referrer=?, " +
                            "status_at_registration_id=?, target_group_id=?, tb_status_id=?, " +
                            "time_hiv_diagnosis=?, unique_id=?, facility_name =?, pregnancy_status_id = ?, ovc_number = ?," +
                            "date_of_lpm = ? " +
                            " WHERE id=?";
            jdbcTemplate.update (updateQuery,
                                 hivEnrollment.getArchived (),
                                 hivEnrollment.getBreastfeeding (),
                                 hivEnrollment.getDateConfirmedHiv (),
                                 hivEnrollment.getDateEnrolledPMTCT (),
                                 hivEnrollment.getDateModified (),
                                 hivEnrollment.getDateOfRegistration (),
                                 hivEnrollment.getDateStarted (),
                                 hivEnrollment.getEnrollmentSettingId (),
                                 hivEnrollment.getEntryPointId (),
                                 hivEnrollment.getModifiedBy (),
                                 hivEnrollment.getPersonId (),
                                 hivEnrollment.getPregnant (),
                                 hivEnrollment.getSendMessage (),
                                 hivEnrollment.getSourceOfReferrer (),
                                 hivEnrollment.getStatusAtRegistrationId (),
                                 hivEnrollment.getTargetGroupId (),
                                 hivEnrollment.getTbStatusId (),
                                 hivEnrollment.getTimeHivDiagnosis (),
                                 hivEnrollment.getUniqueId (),
                                 hivEnrollment.getFacilityName (),
                                 hivEnrollment.getPregnancyStatusId (),
                                 hivEnrollment.getOvcNumber (),
                                 hivEnrollment.getDateOfLpm (),
                                 hivEnrollment.getId ()
            );
        }

        return findByUUID (hivEnrollment.getUuid ()).get ();
    }

    public Optional<HivEnrollmentDTO> findById(Long id) {
        String findByIdQuery = "SELECT * FROM hiv_enrollment WHERE id = ?";
        return Optional.ofNullable (jdbcTemplate.queryForObject (
                findByIdQuery,
                new Object[]{id},
                new HivEnrollmentRowMapper ()));
    }

    public Optional<HivEnrollmentDTO> findByUUID(String uuid) {
        String findByUuidQuery = "SELECT * FROM hiv_enrollment WHERE uuid = ?";
        return Optional.ofNullable (jdbcTemplate.queryForObject (
                findByUuidQuery,
                new Object[]{uuid},
                new HivEnrollmentRowMapper ()));
    }
}

