package org.lamisplus.modules.patient.domain.repository;

import org.lamisplus.modules.patient.domain.dto.PersonResponseDto;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PersonRowMapper implements RowMapper<PersonResponseDto> {
    @Override
    public PersonResponseDto mapRow(ResultSet rs, int rowNum) throws SQLException {
        PersonResponseDto person = new PersonResponseDto ();
        Object addresses = (rs.getObject ("addresses") != null) ? rs.getObject ("addresses").toString () : "";
        Object identifiers = (rs.getObject ("identifiers") != null) ? rs.getObject ("identifiers").toString () : "";
        Object contacts = (rs.getObject ("contacts") != null) ? rs.getObject ("contacts").toString () : "";
        Object contactPoints = (rs.getObject ("contact_points") != null) ? rs.getObject ("contact_points").toString () : "";
        Object gender = (rs.getObject ("gender") != null) ? rs.getObject ("gender").toString () : "";
        Object education = (rs.getObject ("education") != null) ? rs.getObject ("education").toString () : "";
        Object employment_status = (rs.getObject ("employment_status") != null) ? rs.getObject ("employment_status").toString () : "";
        Object organization = (rs.getObject ("organization") != null) ? rs.getObject ("organization").toString () : "";
        Object marital_status = (rs.getObject ("marital_status") != null) ? rs.getObject ("marital_status").toString () : "";
        person.setId (rs.getLong ("id"));
        person.setAddress (addresses);
        person.setContact (contacts);
        person.setContactPoint (contactPoints);
        person.setIdentifier (identifiers);
        person.setSurname (rs.getString ("surname"));
        person.setFirstname (rs.getString ("first_name"));
        person.setOtherName (rs.getString ("other_name"));
        person.setActive (rs.getBoolean ("active"));
        person.setGender (gender);
        person.setEducation (education);
        person.setEmploymentStatus (employment_status);
        person.setOrganization (organization);
        person.setMaritalStatus (marital_status);
        person.setDeceased (rs.getBoolean ("deceased"));
        person.setDateOfBirth (rs.getDate ("date_of_birth").toLocalDate ());
        person.setDateOfRegistration (rs.getDate ("date_of_registration").toLocalDate ());
        return person;
    }
}
