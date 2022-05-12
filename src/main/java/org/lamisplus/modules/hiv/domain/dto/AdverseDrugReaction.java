package org.lamisplus.modules.hiv.domain.dto;

import lombok.Data;

import java.util.Set;

@Data
public class AdverseDrugReaction {
    Set<AdverseDrugReactionDto> adverseDrugReactions;
}
