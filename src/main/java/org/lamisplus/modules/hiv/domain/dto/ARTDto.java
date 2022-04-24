package org.lamisplus.modules.hiv.domain.dto;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
public class ARTDto {
    private Long id;
    private Date artDate;
    private Long viralLoad;
    private Double height;
    private String bloodPressure;
    private Double bodyWeight;
    private Long whoStagingId;
    private String cd4;
    private Long cd4Percentage;
    private Boolean isCommencement;
    private Long functionalStatusId;
    private String clinicalNote;
    private String uuid;
    private Long enrollmentId;
    private JsonNode regimen;
}
