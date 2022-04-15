package org.lamisplus.modules.patient.domain.views;

import com.blazebit.persistence.view.EntityView;
import com.fasterxml.jackson.databind.JsonNode;
import org.lamisplus.modules.patient.domain.entity.Person;

import java.time.LocalDate;
import java.time.LocalDateTime;

@EntityView(Person.class)
public interface PersonView extends PersonIdView {
    Boolean isActive();

    Integer getArchived();

    JsonNode getContactPoints();

    JsonNode getAddresses();

    JsonNode getGender();

    JsonNode getIdentifiers();

    Boolean isDeceased();

    LocalDateTime getDeceasedDateTime();

    JsonNode getMaritalStatus();

    JsonNode getEmploymentStatus();

    JsonNode getEducation();

    JsonNode getOrganization();

    JsonNode getContacts();

    LocalDate getDateOfBirth();

    LocalDate getDateOfRegistration();

    String getUuid();

    String getFirstName();

    String getSurname();

    String getOtherName();

}


