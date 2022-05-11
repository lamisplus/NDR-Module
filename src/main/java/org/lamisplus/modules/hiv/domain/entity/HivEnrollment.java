package org.lamisplus.modules.hiv.domain.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.lamisplus.modules.hiv.utility.LocalDateConverter;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.ZonedDateTime;

@Entity
@Table(name = "hiv_enrollment")
@Builder(toBuilder = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(of = "id")
public class HivEnrollment extends  HivAuditEntity  implements Persistable<Long> {
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
    @Convert(converter = LocalDateConverter.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateConfirmedHiv;
    @Column(name = "date_enrolled_pmtct")
    @Convert(converter = LocalDateConverter.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateEnrolledPMTCT;
    @Column(name = "source_of_referrer_id")
    private Long sourceOfReferrerId;
    @Column(name = "time_hiv_diagnosis")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    private ZonedDateTime timeHivDiagnosis;
    @Column(name = "pregnant")
    private Boolean pregnant;
    @Column(name = "breastfeeding")
    private Boolean breastfeeding;
    @Column(name = "date_of_registration")
    @Convert(converter = LocalDateConverter.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateOfRegistration;
    @NonNull
    @Column(name = "status_at_registration_id")
    private Long statusAtRegistrationId;
    @Column(name = "enrollment_setting_id")
    @NonNull
    private Long enrollmentSettingId;
    @Column(name = "date_started")
    @Convert(converter = LocalDateConverter.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateStarted;
    @Column(name = "send_message")
    private Boolean sendMessage;
    @NonNull
    private Long personId;

    private String uuid;
    @Basic
    @Column(name = "archived")
    private int archived;

    @Basic
    @Column(name = "facility_name")
    private String facilityName;

    @Basic
    @Column(name = "ovc_number")
    private String ovcNumber;
    @Basic
    @Column(name = "date_of_lpm")
    @Convert(converter = LocalDateConverter.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateOfLpm;
    @Basic
    @Column(name = "pregnancy_status_id")
    private Long pregnancyStatusId;

    @Basic
    @Column(name = "tb_status_id")
    private Long tbStatusId;




    @Override
    public boolean isNew() {
        return id == null;
    }

    /**
     * @return a cloned or detached version of this entity
     */

}
