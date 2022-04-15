package org.lamisplus.modules.hiv.domain.views;

import com.blazebit.persistence.view.CreatableEntityView;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.PrePersist;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.JsonNode;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.lamisplus.modules.hiv.utility.LocalDateConverter;

import javax.persistence.Convert;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@EntityView(HivEnrollment.class)
@CreatableEntityView
public interface HivEnrollmentCreatView extends HivEnrollmentView {

    void setUniqueId(String uniqueId);

    void setEntryPointId(Long entryPointId);

    void setStatusAtRegistrationId(Long statusAtRegistrationId);

    void setEnrollmentSettingId(Long enrollmentSettingId);

    void setTbStatusId(Long tbStatusId);

    void setPersonId(Long personId);

    void setTargetGroupId(Long targetGroupId);

    @Convert(converter = LocalDateConverter.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    void setDateConfirmedHiv(LocalDate dateConfirmedHiv);

    @Convert(converter = LocalDateConverter.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    void setDateEnrolledPMTCT(LocalDate dateEnrolledPMTCT);

    void setSourceOfReferrer(String sourceOfReferrer);

    void setTimeHivDiagnosis(LocalDateTime timeHivDiagnosis);

    void setPregnant(Boolean pregnant);

    void setBreastfeeding(Boolean breastfeeding);

    @Convert(converter = LocalDateConverter.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    void setDateOfRegistration(LocalDate dateOfRegistration);

    @Convert(converter = LocalDateConverter.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    void setDateStarted(LocalDate dateStarted);

    void setSendMessage(Boolean sendMessage);

    void setExtra(JsonNode extra);

    void setUuid(String uuid);

    void setArchived(Integer archived);

    @PrePersist
    default void prePersist() {
        setArchived (1);
        setUuid (UUID.randomUUID ().toString ());
        setArchived (0);
    }
}
