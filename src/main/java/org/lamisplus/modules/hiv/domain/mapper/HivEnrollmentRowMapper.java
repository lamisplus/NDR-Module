package org.lamisplus.modules.hiv.domain.mapper;

import org.lamisplus.modules.hiv.domain.dto.HivEnrollmentDto;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class HivEnrollmentRowMapper implements RowMapper<HivEnrollmentDto> {

    @Override
    public HivEnrollmentDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        HivEnrollmentDto hivEnrollmentDTO = new HivEnrollmentDto ();
        hivEnrollmentDTO.setId (rs.getLong ("id"));
        hivEnrollmentDTO.setArchived (rs.getInt ("archived"));
        hivEnrollmentDTO.setBreastfeeding (rs.getBoolean ("breastfeeding"));
        hivEnrollmentDTO.setDateConfirmedHiv (rs.getDate ("date_confirmed_hiv").toLocalDate ());
       // hivEnrollmentDTO.setDateEnrolledPMTCT (rs.getDate ("date_enrolled_pmtct").toLocalDate ());
        hivEnrollmentDTO.setDateOfRegistration (rs.getDate ("date_of_registration").toLocalDate ());
       // hivEnrollmentDTO.setDateStarted (rs.getDate ("date_started").toLocalDate ());
        hivEnrollmentDTO.setEnrollmentSettingId (rs.getLong ("enrollment_setting_id"));
        hivEnrollmentDTO.setEntryPointId (rs.getLong ("entry_point_id"));
        hivEnrollmentDTO.setPersonId (rs.getLong ("person_id"));
        hivEnrollmentDTO.setPregnant (rs.getBoolean ("pregnant"));
        hivEnrollmentDTO.setSendMessage (rs.getBoolean ("send_message"));
        hivEnrollmentDTO.setSourceOfReferrer (rs.getString ("source_of_referrer"));
        hivEnrollmentDTO.setStatusAtRegistrationId (rs.getLong ("status_at_registration_id"));
        hivEnrollmentDTO.setTargetGroupId (rs.getLong ("target_group_id"));
        hivEnrollmentDTO.setTbStatusId (rs.getLong ("tb_status_id"));
        hivEnrollmentDTO.setUniqueId (rs.getString ("unique_id"));
        hivEnrollmentDTO.setUuid (rs.getString ("uuid"));
        hivEnrollmentDTO.setOvcNumber (rs.getString ("ovc_number"));
        hivEnrollmentDTO.setPregnancyStatusId (rs.getLong ("pregnancy_status_id"));
        //hivEnrollmentDTO.setDateOfLpm (rs.getDate ("date_of_lpm").toLocalDate ());
        hivEnrollmentDTO.setFacilityName (rs.getString ("facility_name"));
        return hivEnrollmentDTO;
    }
}
