package org.lamisplus.modules.hiv.domain.entity;

import lombok.*;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Date;

@Entity
@Table(name = "art")
@Builder(toBuilder = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(of = "id")
public class ART extends HivAuditEntity implements Serializable, Persistable<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "art_start_date")
    private Date artDate;

    @Column(name = "cd_4")
    private String cd4;

    @Column(name = "cd_4_percentage")
    private Long cd4Percentage;

    @Column(name = "is_commencement")
    private Boolean isCommencement;

    @Column(name = "functional_status_id")
    private Long functionalStatusId;

    @NotNull
    private Long clinicalStageId;

    @Column(name = "clinical_note")
    private String clinicalNote;

    @Column(name = "uuid", nullable = false, unique = true)
    private String uuid;
    @JoinColumn(name = "hiv_enrollment_id", nullable = false)
    private Long hivEnrollmentId;

    private long  regimenId;

    private long  regimenTypeId;

    @Column(name = "art_status", nullable = false)
    private Long artStatus;

    @Column(name = "archived")
    private Integer archived;

    @NotNull
    @Column(name = "vital_sign_id")
    private Long vitalSignId;

    @Column(name = "who_staging_id")
    private Long whoStagingId;

    private Long facilityId;

    @Override
    public boolean isNew() {
        return id == null;
    }


}
