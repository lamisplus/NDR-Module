package org.lamisplus.modules.hiv.service;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.hiv.domain.entity.*;
import org.lamisplus.modules.hiv.repositories.HIVDrugRepository;
import org.lamisplus.modules.hiv.repositories.RegimenRepository;
import org.lamisplus.modules.hiv.repositories.RegimenTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RegimenService {
	
	private final RegimenRepository regimenRepository;
	private final RegimenTypeRepository regimenTypeRepository;
	
	private final HIVDrugRepository hivDrugRepository;
	
	
	public List<Regimen> getRegimenByTypeId(Long typeId) {
		RegimenType regimenType = regimenTypeRepository
				.findById(typeId)
				.orElseThrow(() -> new EntityNotFoundException(RegimenType.class, "id ", String.valueOf(typeId)));
		return regimenRepository.getAllByRegimenType(regimenType);
	}
	
	public Regimen getRegimenById(Long id) {
		return regimenRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(Regimen.class, "id", Long.toString(id)));
	}
	
	public List<HIVDrug> getRegimenDrugsById(Long id) {
		Regimen regimen = regimenRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(Regimen.class, "id", Long.toString(id)));
		List<RegimenDrug> regimenDrugs = regimen.getRegimenDrugs();
		return regimenDrugs.stream()
				.map(regimen1 -> {
					HIVDrug drug = regimen1.getDrug();
					Long drugId = 0L;
					if (drug != null) {
						drugId = drug.getId();
					}
					return hivDrugRepository.findById(drugId).orElse(null);
				})
				.collect(Collectors.toList());
	}
}
