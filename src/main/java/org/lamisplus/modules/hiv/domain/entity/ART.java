package org.lamisplus.modules.hiv.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.lamisplus.modules.base.domain.entity.AbstractAuditingEntity;

import javax.persistence.*;
import java.sql.Date;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "art")
@Setter
@Getter
@NoArgsConstructor
public class ART extends AbstractAuditingEntity {
    @Column(name = "art_start_date")
    private Date artDate;

    @Column(name = "viral_load")
    private Long viralLoad;

    @Column(name = "height")
    private Double height;

    @Column(name = "blood_pressure")
    private String bloodPressure;

    @Column(name = "body_weight")
    private Double bodyWeight;

    @Column(name = "who_staging_id")
    private Long whoStagingId;

    @Column(name = "cd_4")
    private String cd4;

    @Column(name = "cd_4_percentage")
    private Long cd4Percentage;

    @Column(name = "is_commencement")
    private Boolean isCommencement;

    @Column(name = "functional_status_id")
    private Long functionalStatusId;

    @Column(name = "clinical_note")
    private String clinicalNote;

    @Column(name = "uuid", nullable = false, unique = true)
    private String uuid;

    @ElementCollection
    @Column(name = "regimen")
    @CollectionTable(name = "art_regimen_ids", joinColumns = @JoinColumn(name = "art_id"))
    private Set<Long> regimenIds = new LinkedHashSet<> ();
    @ManyToOne(optional = false)
    @JoinColumn(name = "hiv_enrollment_id", nullable = false)
    private HivEnrollment hivEnrollment;

}
