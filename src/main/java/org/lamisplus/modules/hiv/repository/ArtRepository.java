//package org.lamisplus.modules.hiv.repository;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.lamisplus.modules.hiv.domain.dto.ARTDto;
//import org.lamisplus.modules.hiv.domain.entity.ART;
//import org.lamisplus.modules.hiv.domain.mapper.ARTRowMapper;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.jdbc.core.PreparedStatementSetter;
//import org.springframework.stereotype.Component;
//
//import java.sql.Timestamp;
//
//@Component
//@RequiredArgsConstructor
//@Slf4j
//public class ArtRepository {
//
//    private final JdbcTemplate jdbcTemplate;
//
//    private final String insertQuery =
//            "INSERT INTO art(created_by, created_date, last_modified_by, last_modified_date, art_start_date, " +
//                    "blood_pressure, body_weight, cd_4, cd_4_percentage, clinical_note, functional_status_id, height," +
//                    " is_commencement, uuid, viral_load, who_staging_id, hiv_enrollment_id,regimen,art_status,archived)" +
//                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,(to_json(?::jsonb)),?,?)";
//    private final String getByUuidQuery = "SELECT * FROM art where  uuid = ? ";
//
//
//
//
//    public ARTDto save(ART art) {
//        PreparedStatementSetter preparedStatementSetter = getPreparedStatementSetter (art);
//        int insertedId = jdbcTemplate.update (insertQuery, preparedStatementSetter);
//        log.info ("id", insertedId);
//        return getArtByUuid(art.getUuid ());
//    }
//
//
//
//    public ARTDto getArtByUuid(String uuid) {
//        return jdbcTemplate.queryForObject (getByUuidQuery, new Object[]{uuid}, new ARTRowMapper ());
//    }
//
//
//    private PreparedStatementSetter getPreparedStatementSetter(ART art) {
//        return ps -> {
//            ps.setObject (1, art.getCreatedBy ());
//            ps.setTimestamp (2, Timestamp.from (art.getCreatedDate ()));
//            ps.setObject (3, art.getLastModifiedBy ());
//            ps.setTimestamp (4, Timestamp.from (art.getLastModifiedDate ()));
//            ps.setObject (5, art.getArtDate ());
//            ps.setObject (6, art.getBloodPressure ());
//            ps.setObject (7, art.getBodyWeight ());
//            ps.setObject (8, art.getCd4 ());
//            ps.setObject (9, art.getCd4Percentage ());
//            ps.setObject (10, art.getClinicalNote ());
//            ps.setObject (11, art.getFunctionalStatusId ());
//            ps.setObject (12, art.getHeight ());
//            ps.setObject (13, art.getIsCommencement ());
//            ps.setObject (14, art.getUuid ());
//            ps.setObject (15, art.getViralLoad ());
//            ps.setObject (16, art.getWhoStagingId ());
//            ps.setObject (17, art.getHivEnrollment ().getId ());
//            ps.setObject (18, art.getRegimen ().toString ());
//            ps.setObject (19, art.getArt_status ());
//            ps.setObject (20, 0);
//        };
//    }
//
//
//}
