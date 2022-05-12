package org.lamisplus.modules.hiv.domain.entity;

import lombok.*;
import org.lamisplus.modules.patient.domain.entity.Person;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "hiv_status_tracker")
@Builder(toBuilder = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(of = "id")
public class HIVStatusTracker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "hiv_status_id", nullable = false)
    private Long hivStatusId;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @ManyToOne(optional = false)
    @JoinColumn(name = "person_id")
    private Person person;

    @Column(name = "tracking_outcome")
    private String trackingOutcome;

    @Column(name = "track_date")
    private LocalDate trackDate;

}
