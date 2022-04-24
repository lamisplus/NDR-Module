package org.lamisplus.modules.hiv.domain.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.lamisplus.modules.hiv.domain.dto.ARTDto;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ARTRowMapper implements RowMapper<ARTDto> {
    @Override
    public ARTDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        ARTDto artDto = new ARTDto ();
        ObjectMapper mapper = new ObjectMapper ();
        artDto.setArtDate (rs.getDate ("art_start_date"));
        artDto.setBloodPressure (rs.getString ("blood_pressure"));
        artDto.setBodyWeight (rs.getDouble ("body_weight"));
        artDto.setCd4 (rs.getString ("cd_4"));
        artDto.setCd4Percentage (rs.getLong ("cd_4_percentage"));
        artDto.setClinicalNote (rs.getString ("clinical_note"));
        artDto.setEnrollmentId (rs.getLong ("hiv_enrollment_id"));
        artDto.setUuid (rs.getString ("uuid"));
        artDto.setHeight (rs.getDouble ("height"));
        artDto.setFunctionalStatusId (rs.getLong ("functional_status_id"));
        Object regimen = rs.getObject ("regimen");
        try {
            JsonNode regimenNode = mapper.readTree (regimen.toString ());
            artDto.setRegimen (regimenNode);
        } catch (JsonProcessingException e) {
            throw new RuntimeException (e);
        }
        artDto.setViralLoad (rs.getLong ("viral_load"));
        artDto.setIsCommencement (rs.getBoolean ("is_commencement"));
        artDto.setWhoStagingId (rs.getLong ("who_staging_id"));
        artDto.setId (rs.getLong ("id"));
        return artDto;
    }
}
