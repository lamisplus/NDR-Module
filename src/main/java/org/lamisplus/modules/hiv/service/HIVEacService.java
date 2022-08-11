package org.lamisplus.modules.hiv.service;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.hiv.domain.dto.HIVEacDto;
import org.lamisplus.modules.hiv.domain.entity.HIVEac;
import org.lamisplus.modules.hiv.repositories.HIVEacRepository;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.domain.entity.Visit;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.springframework.stereotype.Service;
import reactor.util.UUIDUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HIVEacService {

    private final HIVEacRepository hivEacRepository;
    private final PersonRepository personRepository;

    private final ArtCommenceService artCommenceService;

    private final CurrentUserOrganizationService currentUserOrganizationService;


    public HIVEac createFirstEac(HIVEacDto dto) {
        Long personId = dto.getPersonId ();
        HIVEac hivEac = convertDtoToEntity (dto);
        hivEac.setUuid (UUIDUtils.random ().toString ());
        Person person = getPerson (personId);
        hivEac.setPerson (person);
        Visit visit = artCommenceService.processAndCreateVisit (personId);
        hivEac.setVisit (visit);
        hivEac.setFacilityId (currentUserOrganizationService.getCurrentUserOrganization ());
        dto.setStatus ("First");
        hivEac.setStatus (dto.getStatus ());
        return hivEacRepository.save (hivEac);
    }
    public HIVEacDto updateEac(Long id,HIVEacDto dto) {
        HIVEac hivEac = getHivEac (id);
        hivEac.setDateOfEac1 (dto.getDateOfEac1 ());
        hivEac.setDateOfEac2 (dto.getDateOfEac2 ());
        hivEac.setDateOfEac3 (dto.getDateOfEac3 ());
       hivEac.setNote (dto.getNote ());
       hivEac.setLastViralLoad (dto.getLastViralLoad ());
       hivEac.setDateOfLastViralLoad (dto.getDateOfLastViralLoad ());
       return convertHivEacToDto (hivEacRepository.save (hivEac));
    }

    public HIVEacDto getEacById(Long id){
        return convertHivEacToDto (getHivEac (id));
    }

    public String deleteEACById(Long id){
        HIVEac hivEac = getHivEac (id);
        hivEac.setArchived (1);
        hivEacRepository.save (hivEac);
        return "successful";
    }
    private HIVEac getHivEac(Long id) {
        return hivEacRepository.findById (id).orElseThrow (() -> new EntityNotFoundException (HIVEac.class, "id", Long.toString (id)));
    }

    public HIVEacDto handleEac(HIVEacDto dto) {
        Long id = dto.getId ();
        if (id != null) {
            HIVEac hivEac = hivEacRepository.findById (id).orElse (null);
            if (hivEac != null && hivEac.getDateOfEac2 () == null) {
                hivEac.setDateOfEac2 (dto.getDateOfEac2 ());
                hivEac.setStatus ("Second");
                return convertHivEacToDto (hivEacRepository.save (hivEac));
            }
            if (hivEac != null && hivEac.getDateOfEac3 () == null) {
                hivEac.setDateOfEac3 (dto.getDateOfEac3 ());
                hivEac.setStatus ("Completed");
                return convertHivEacToDto (hivEacRepository.save (hivEac));
            }
        }
        return convertHivEacToDto (createFirstEac (dto));
    }

    private HIVEac convertDtoToEntity(HIVEacDto dto) {
        HIVEac hivEac = new HIVEac ();
        hivEac.setDateOfEac1 (dto.getDateOfEac1 ());
        hivEac.setDateOfLastViralLoad (dto.getDateOfLastViralLoad ());
        hivEac.setLastViralLoad (dto.getLastViralLoad ());
        return hivEac;
    }


    public HIVEacDto getOpenEacByPersonId(Long personId) {
        Person person = getPerson (personId);
        HIVEac hivEac = hivEacRepository.getByPersonAndDateOfEac3IsNull (person).orElse (null);
        if (hivEac != null) {
            return convertHivEacToDto (hivEac);
        }
        return null;
    }

    public List<HIVEacDto> getEacByPersonId(Long personId) {
        Person person = getPerson (personId);
        List<HIVEac> hivEacList = hivEacRepository.getAllByPersonAndArchived (person, 0);
        return hivEacList.stream ().map (this::convertHivEacToDto).collect (Collectors.toList ());

    }

    private HIVEacDto convertHivEacToDto(HIVEac hivEac) {
        return HIVEacDto.builder ()
                .dateOfEac1 (hivEac.getDateOfEac1 ())
                .dateOfEac2 (hivEac.getDateOfEac2 ())
                .dateOfEac3 (hivEac.getDateOfEac3 ())
                .id (hivEac.getId ())
                .personId (hivEac.getPerson ().getId ())
                .visitId (hivEac.getVisit ().getId ())
                .dateOfLastViralLoad (hivEac.getDateOfLastViralLoad ())
                .lastViralLoad (hivEac.getLastViralLoad ())
                .status (hivEac.getStatus ())
                .note (hivEac.getNote ())
                .build ();
    }

    private Person getPerson(Long personId) {
        return personRepository.findById (personId).orElseThrow (() -> new EntityNotFoundException (Person.class, "id", String.valueOf (personId)));
    }


}
