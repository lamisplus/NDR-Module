package org.lamisplus.modules.hiv.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HIVEacResponseDto  implements Serializable {
    private Long id;
    private Long visitId;
    private Long personId;
    private LocalDate dateOfEac1;
    private LocalDate dateOfEac2;
    private LocalDate dateOfEac3;
    private Double lastViralLoad;
    private LocalDate dateOfLastViralLoad;
    private String note;
    private String status;
}
