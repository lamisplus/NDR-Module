package org.lamisplus.modules.patient.domain.views;

import com.blazebit.persistence.view.CreatableEntityView;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.PrePersist;
import com.fasterxml.jackson.databind.JsonNode;
import org.lamisplus.modules.patient.domain.entity.Person;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@EntityView(Person.class)
@CreatableEntityView
public interface PersonCreateView extends PersonView {

    void setActive(Boolean active);

    void setArchived(Integer archived);

    void setContactPoints(JsonNode contactPoints);

    void setAddresses(JsonNode addresses);

    void setGender(JsonNode gender);

    void setIdentifiers(JsonNode identifiers);

    void setDeceased(Boolean deceased);


    void setDeceasedDateTime(LocalDateTime deceasedDateTime);

    void setMaritalStatus(JsonNode maritalStatus);

    void setEmploymentStatus(JsonNode employmentStatus);

    void setEducation(JsonNode education);

    void setOrganization(JsonNode organization);


    void setContacts(JsonNode contacts);

    void setDateOfBirth(LocalDate dateOfBirth);

    void setDateOfRegistration(LocalDate dateOfRegistration);

    void setUuid(String uuid);

    void setFirstName(String firstName);


    void setSurname(String surname);


    void setOtherName(String otherName);

    @PrePersist
    default void prePersist() {
       setArchived(0);
        setUuid (UUID.randomUUID ().toString ());
    }


}
