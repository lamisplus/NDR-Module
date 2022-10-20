package org.lamisplus.modules.hiv.domain.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegimenRequestDto {
    private Long regimenId;
    private Integer dispense;
    private String regimenName;
    private String prescribed;
    private Integer duration;
    private Integer dosage;
    private String frequency;
}
