package org.lamisplus.modules.hiv.repository;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
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
        return jdbcTemplate.query("SELECT * FROM hiv_enrollment",
                new BeanPropertyRowMapper<HivEnrollment>(HivEnrollment.class));
    }

    public Optional<HivEnrollment> findById(Long id) {
        return jdbcTemplate.query("SELECT * FROM hiv_enrollment WHERE id=?",
                new BeanPropertyRowMapper<HivEnrollment>(HivEnrollment.class), id).stream().findFirst();
    }

    public int deleteById(Long id) {
        return jdbcTemplate.update("DELETE FROM hiv_enrollment WHERE id=?", id);
    }

    public HivEnrollment save(HivEnrollment hivEnrollment) {
         final String extra = (hivEnrollment.getExtra() != null)? hivEnrollment.getExtra().toString(): "";
        if(hivEnrollment.getId() == null || hivEnrollment.getId() == 0){
            jdbcTemplate.update("INSERT INTO hiv_enrollment(id, archived, breastfeeding, created_by, " +
                            "date_confirmed_hiv, date_created, date_enrolled_pmtct, date_modified, date_of_registration, date_started, " +
                            "enrollment_setting_id, entry_point_id, extra, modified_by, person_id, pregnant, send_message, " +
                            "source_of_referrer, status_at_registration_id, target_group_id, tb_status_id, time_hiv_diagnosis, unique_id, uuid)" +
                            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (to_json(?::jsonb)), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    hivEnrollment.getId(), hivEnrollment.getArchived(), hivEnrollment.getBreastfeeding(),
                    hivEnrollment.getCreatedBy(), hivEnrollment.getDateConfirmedHiv(), hivEnrollment.getDateCreated(),
                    hivEnrollment.getDateEnrolledPMTCT(), hivEnrollment.getDateModified(), hivEnrollment.getDateOfRegistration(),
                    hivEnrollment.getDateStarted(), hivEnrollment.getEnrollmentSettingId(), hivEnrollment.getEntryPointId(),
                    extra, hivEnrollment.getModifiedBy(), hivEnrollment.getPersonId(), hivEnrollment.getPregnant(),
                    hivEnrollment.getSendMessage(), hivEnrollment.getSourceOfReferrer(), hivEnrollment.getStatusAtRegistrationId(),
                    hivEnrollment.getTargetGroupId(), hivEnrollment.getTbStatusId(), hivEnrollment.getTimeHivDiagnosis(), hivEnrollment.getUniqueId());

        }
        jdbcTemplate.update("UPDATE hiv_enrollment SET archived=?, breastfeeding=?, " +
                        "date_confirmed_hiv=?, date_enrolled_pmtct=?, date_modified=?, date_of_registration=?, date_started=?, " +
                        "enrollment_setting_id=?, entry_point_id=?, extra=(to_json(?::jsonb)), modified_by=?, person_id=?, pregnant=?, send_message=?, " +
                        "source_of_referrer=?, status_at_registration_id=?, target_group_id=?, tb_status_id=?, time_hiv_diagnosis=?, unique_id=?)" +
                        " WHERE id=?",
                hivEnrollment.getArchived(), hivEnrollment.getBreastfeeding(),
                hivEnrollment.getDateConfirmedHiv(), hivEnrollment.getDateEnrolledPMTCT(), hivEnrollment.getDateModified(), hivEnrollment.getDateOfRegistration(),
                hivEnrollment.getDateStarted(), hivEnrollment.getEnrollmentSettingId(), hivEnrollment.getEntryPointId(),
                extra, hivEnrollment.getModifiedBy(), hivEnrollment.getPersonId(), hivEnrollment.getPregnant(),
                hivEnrollment.getSendMessage(), hivEnrollment.getSourceOfReferrer(), hivEnrollment.getStatusAtRegistrationId(),
                hivEnrollment.getTargetGroupId(), hivEnrollment.getTbStatusId(), hivEnrollment.getTimeHivDiagnosis(), hivEnrollment.getUniqueId(), hivEnrollment.getId());

        return jdbcTemplate.query("SELECT * FROM hiv_enrollment WHERE uuid=?", new BeanPropertyRowMapper<HivEnrollment>(HivEnrollment.class), hivEnrollment.getUuid()).stream().findFirst().get();

    }




}
