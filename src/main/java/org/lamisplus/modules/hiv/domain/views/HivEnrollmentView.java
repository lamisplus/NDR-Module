package org.lamisplus.modules.hiv.domain.views;

import com.blazebit.persistence.view.EntityView;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.JsonNode;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;

import java.time.LocalDate;
import java.time.LocalDateTime;

@EntityView(HivEnrollment.class)
public interface HivEnrollmentView extends HivEnrollmentIdView {
    String getUniqueId();


    @JsonIgnore
    Integer getArchived();

    Long getEntryPointId();

    Long getTargetGroupId();

    Long getStatusAtRegistrationId();

    Long getPersonId();

    Long getTbStatusId();

    Long getEnrollmentSettingId();

    Boolean getSendMessage();

    LocalDate getDateConfirmedHiv();

    LocalDate getDateEnrolledPMTCT();

    String getSourceOfReferrer();

    LocalDateTime getTimeHivDiagnosis();

    Boolean getPregnant();

    Boolean getBreastfeeding();

    LocalDate getDateOfRegistration();

    JsonNode getExtra();

    LocalDate getDateStarted();

    @JsonIgnore
    String getUuid();
}

//    @UpdatableMapping(orphanRemoval = true)
//    @AllowUpdatableEntityViews
//    ApplicationCodeSetView getStatusAtRegistration();
//
//    @UpdatableMapping(orphanRemoval = true)
//    @AllowUpdatableEntityViews
//    ApplicationCodeSetView getTbStatus();
//
//    @UpdatableMapping(orphanRemoval = true)
//    @AllowUpdatableEntityViews
//    PersonView getPerson();
