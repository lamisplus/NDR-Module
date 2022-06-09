package org.lamisplus.modules.hiv.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.hiv.domain.dto.RegisterArtPharmacyDto;
import org.lamisplus.modules.hiv.domain.entity.ArtPharmacy;
import org.lamisplus.modules.hiv.domain.entity.Regimen;
import org.lamisplus.modules.hiv.repositories.ArtPharmacyRepository;
import org.lamisplus.modules.hiv.repositories.HivEnrollmentRepository;
import org.lamisplus.modules.hiv.repositories.RegimenRepository;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ArtPharmacyService {
    private final ArtPharmacyRepository artPharmacyRepository;
    private final PersonRepository personRepository;
    private final RegimenRepository regimenRepository;

    private final HivEnrollmentRepository enrollmentRepository;

    private final CurrentUserOrganizationService organizationUtil;
    public ArtPharmacy registerArtPharmacy(RegisterArtPharmacyDto dto) {
        //we can check for duplicate by using visit id
        ArtPharmacy artPharmacy = convertRegisterDtoToEntity (dto);
        artPharmacy.setUuid (UUID.randomUUID ().toString ());
        return artPharmacyRepository.save (artPharmacy);
    }

    public ArtPharmacy updateArtPharmacy(Long id, RegisterArtPharmacyDto dto) {
        ArtPharmacy existArtPharmacy = artPharmacyRepository
                .findById (id)
                .orElseThrow (() -> getArtPharmacyEntityNotFoundException (id));
        ArtPharmacy artPharmacy = convertRegisterDtoToEntity (dto);
        artPharmacy.setId (existArtPharmacy.getId ());
        return artPharmacyRepository.save (artPharmacy);
    }


    private ArtPharmacy convertRegisterDtoToEntity(RegisterArtPharmacyDto dto) {
        ArtPharmacy artPharmacy = new ArtPharmacy ();
        BeanUtils.copyProperties (dto, artPharmacy);
        log.info (" entity 1st:  {}", artPharmacy);
        Long personId = dto.getPersonId ();
        Set<Long> regimenIds = dto.getRegimenId ();
        Person person = personRepository
                .findById (personId)
                .orElseThrow (() -> getPersonEntityNotFoundException (personId));
        Set<Regimen> regimenList = regimenIds.stream ()
                .map (regimenId -> regimenRepository.findById (regimenId).orElse (null))
                .collect (Collectors.toSet ());
        artPharmacy.setPerson (person);
        artPharmacy.setRegimens (regimenList);
        artPharmacy.setFacilityId (organizationUtil.getCurrentUserOrganization ());
        log.info (" entity 2nd:  {}", artPharmacy);
        return artPharmacy;
    }


    @NotNull
    private EntityNotFoundException getArtPharmacyEntityNotFoundException(Long id) {
        return new EntityNotFoundException (ArtPharmacyService.class, "No pharmacy information found with given Id " + id);
    }

    @NotNull
    private EntityNotFoundException getPersonEntityNotFoundException(Long personId) {
        return new EntityNotFoundException (ArtPharmacyService.class, "Patient Not found with id  " + personId);
    }

}
