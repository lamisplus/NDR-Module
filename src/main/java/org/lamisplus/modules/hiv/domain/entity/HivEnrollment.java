package org.lamisplus.modules.hiv.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;
import org.lamisplus.modules.hiv.utility.SecurityUtils;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Table(name = "hiv_enrollment")
@Data
@TypeDefs({
        @TypeDef(name = "string-array", typeClass = StringArrayType.class),
        @TypeDef(name = "int-array", typeClass = IntArrayType.class),
        @TypeDef(name = "json", typeClass = JsonStringType.class),
        @TypeDef(name = "jsonb", typeClass = JsonBinaryType.class),
        @TypeDef(name = "jsonb-node", typeClass = JsonNodeBinaryType.class),
        @TypeDef(name = "json-node", typeClass = JsonNodeStringType.class),
})
@AllArgsConstructor
public class HivEnrollment{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "unique_id")
    @NonNull
    private String uniqueId;
    @Column(name = "entry_point_id")
    private Long entryPointId;
    @Column(name = "target_group_id")
    private Long targetGroupId;
    @Column(name = "date_confirmed_hiv")
    private LocalDate dateConfirmedHiv;
    @Column(name = "date_enrolled_pmtct")
    private LocalDate dateEnrolledPMTCT;
    @Column(name = "source_of_referrer")
    private String sourceOfReferrer;
    @Column(name = "time_hiv_diagnosis")
    private LocalDateTime timeHivDiagnosis;
    private Long tbStatusId;
    @Column(name = "pregnant")
    private Boolean pregnant;
    @Column(name = "breastfeeding")
    private Boolean breastfeeding;
    @Column(name = "date_of_registration")
    private LocalDate dateOfRegistration;
    @NonNull
    @Column(name = "status_at_registration_id")
    private Long statusAtRegistrationId;
    @Column(name = "enrollment_setting_id")
    @NonNull
    private Long enrollmentSettingId;
    @Column(name = "date_started")
    private LocalDate dateStarted;
    @Column(name = "send_message")
    private Boolean sendMessage;
    @NonNull
    @Column(name = "person_id")
    private Long personId;

//    @Type(type = "jsonb")
//    @Basic(fetch = FetchType.LAZY)
//    @Column(name = "extra",
//            nullable = false,
//            columnDefinition = "jsonb")
//    private JsonNode extra;
    private String uuid;
    @Basic
    @Column(name = "archived")
    private int archived;
    @Basic
    @Column(name = "date_created", nullable = true)
    private LocalDateTime dateCreated = LocalDateTime.now ();
    @Column(name = "created_by", updatable = false)
    @JsonIgnore
    private String createdBy = SecurityUtils.getCurrentUserLogin ().orElse ("");
    @Basic
    @Column(name = "date_modified")
    private LocalDateTime dateModified = LocalDateTime.now ();
    @Basic
    @Column(name = "modified_by", updatable = false)
    @JsonIgnore
    private String modifiedBy = SecurityUtils.getCurrentUserLogin ().orElse ("");

}
