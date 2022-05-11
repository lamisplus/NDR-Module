package org.lamisplus.modules.hiv.domain.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.lamisplus.modules.patient.domain.dto.VitalSignDto;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Date;

@Data
@AllArgsConstructor
@Builder
public class ARTDto implements Serializable {
    private  Long id;
    private  Date artDate;
    private  String cd4;
    private  Long cd4Percentage;
    @JsonIgnore
    private Boolean isCommencement;
    private Long functionalStatusId;
    private  String clinicalNote;
    private  String uuid;
    private  Long hivEnrollmentId;
    private  Long artStatusId;
    private  Long whoStagingId;
    private Long regimenId;
    private Long regimenTypeId;
    @NotNull
    private  VitalSignDto vitalSignDto;
    @NotNull
    private Long facilityId;
    @NotNull
    private Long clinicalStageId;
}
