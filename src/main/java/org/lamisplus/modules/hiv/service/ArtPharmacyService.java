package org.lamisplus.modules.hiv.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.base.controller.apierror.IllegalTypeException;
import org.lamisplus.modules.hiv.domain.dto.RegimenRequestDto;
import org.lamisplus.modules.hiv.domain.dto.RegisterArtPharmacyDto;
import org.lamisplus.modules.hiv.domain.entity.ArtPharmacy;
import org.lamisplus.modules.hiv.domain.entity.Regimen;
import org.lamisplus.modules.hiv.repositories.ArtPharmacyRepository;
import org.lamisplus.modules.hiv.repositories.RegimenRepository;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.domain.entity.Visit;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
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
    private final CurrentUserOrganizationService organizationUtil;

    private final ArtCommenceService artCommenceService;

    public RegisterArtPharmacyDto registerArtPharmacy(RegisterArtPharmacyDto dto) throws IOException {
        Visit visit = artCommenceService.processAndCreateVisit (dto.getPersonId ());
        dto.setVisitId (visit.getId ());
        if (dto.getVisitId () == null)
            throw new IllegalTypeException (Visit.class, "visit date", "kindly create a clinic visit for this patient");
        ArtPharmacy artPharmacy = convertRegisterDtoToEntity (dto);
        artPharmacy.setUuid (UUID.randomUUID ().toString ());
        return convertEntityToRegisterDto (artPharmacyRepository.save (artPharmacy));
    }

    public RegisterArtPharmacyDto updateArtPharmacy(Long id, RegisterArtPharmacyDto dto) throws IOException {
        ArtPharmacy existArtPharmacy = artPharmacyRepository
                .findById (id)
                .orElseThrow (() -> getArtPharmacyEntityNotFoundException (id));
        ArtPharmacy artPharmacy = convertRegisterDtoToEntity (dto);
        artPharmacy.setId (existArtPharmacy.getId ());
        return convertEntityToRegisterDto (artPharmacyRepository.save (artPharmacy));
    }


    private ArtPharmacy convertRegisterDtoToEntity(RegisterArtPharmacyDto dto) throws JsonProcessingException {
        ArtPharmacy artPharmacy = new ArtPharmacy ();
        BeanUtils.copyProperties (dto, artPharmacy);
        log.info (" entity 1st:  {}", artPharmacy);
        Long personId = dto.getPersonId ();
        Set<RegimenRequestDto> regimen = dto.getRegimen ();
        Person person = personRepository.findById (personId).orElseThrow (() -> getPersonEntityNotFoundException (personId));
        List<ArtPharmacy> existDrugRefills = artPharmacyRepository.getArtPharmaciesByVisitIdAndPerson (artPharmacy.getVisitId (), person);
        log.info ("existDrugRefills:  {}", existDrugRefills+" "+dto.getId ());
        if(!existDrugRefills.isEmpty () && dto.getId () == null){
                throw new IllegalTypeException (ArtPharmacy.class, "visitId", "Regimen is already dispense for this visit "+ dto.getVisitId ());
        }
        Set<Regimen> regimenList = regimen.stream ()
                .map (regimenId -> regimenRepository.findById (regimenId.getId ()).orElse (null))
                .collect (Collectors.toSet ());
        artPharmacy.setPerson (person);
        artPharmacy.setRegimens (regimenList);
        processAndSetDispenseRegimenInExtra (dto, artPharmacy);
        artPharmacy.setFacilityId (organizationUtil.getCurrentUserOrganization ());
        log.info (" entity 2nd:  {}", artPharmacy);
        return artPharmacy;
    }

    private RegisterArtPharmacyDto convertEntityToRegisterDto(ArtPharmacy  entity) throws IOException {
        RegisterArtPharmacyDto dto = new RegisterArtPharmacyDto ();
        BeanUtils.copyProperties (entity, dto);
        log.info (" dto 1st:  {}", dto);
        JsonNode extra = entity.getExtra ();
        String name = "regimens";
        if(extra.hasNonNull (name)){
            JsonNode regimens = extra.get (name);
            ObjectMapper mapper = new ObjectMapper ();
            ObjectReader reader = mapper.readerFor(new TypeReference<Set<RegimenRequestDto>> () {});
            Set<RegimenRequestDto>  result = reader.readValue (regimens);
            dto.setRegimen (result);
        }
        log.info (" dto 1st:  {}", dto);
        dto.setPersonId (entity.getPerson ().getId ());
        return dto;
    }


    private void processAndSetDispenseRegimenInExtra(RegisterArtPharmacyDto dto, ArtPharmacy artPharmacy) {
        ObjectMapper objectMapper = new ObjectMapper ();
        ArrayNode regimens = objectMapper.valueToTree (dto.getRegimen ());
        JsonNode extra = dto.getExtra ();
        ((ObjectNode) extra).set ("regimens", regimens);
        artPharmacy.setExtra (extra);
    }


    @NotNull
    private EntityNotFoundException getArtPharmacyEntityNotFoundException(Long id) {
        return new EntityNotFoundException (Person.class, "id ", "" + id);
    }

    @NotNull
    private EntityNotFoundException getPersonEntityNotFoundException(Long personId) {
        return new EntityNotFoundException (Person.class, "id ", "" + personId);
    }


}
