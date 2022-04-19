package org.lamisplus.modules.hiv.domain.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.JsonNode;
import com.vladmihalcea.hibernate.type.array.IntArrayType;
import com.vladmihalcea.hibernate.type.array.StringArrayType;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import com.vladmihalcea.hibernate.type.json.JsonNodeBinaryType;
import com.vladmihalcea.hibernate.type.json.JsonNodeStringType;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;
import org.lamisplus.modules.hiv.utility.SecurityUtils;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Data
public class HivEnrollmentDTO {

    private Long id;

    private String uniqueId;

    private Long entryPointId;

    private Long targetGroupId;

    private LocalDate dateConfirmedHiv;

    private LocalDate dateEnrolledPMTCT;

    private String sourceOfReferrer;

    private LocalDateTime timeHivDiagnosis;

    private Long tbStatusId;

    private Boolean pregnant;

    private Boolean breastfeeding;

    private LocalDate dateOfRegistration;

    private Long statusAtRegistrationId;

    private Long enrollmentSettingId;

    private LocalDate dateStarted;

    private Boolean sendMessage;

    private Long personId;

    private Object extra;
    private String uuid;

    private int archived;
}
