package org.lamisplus.modules.hiv.service;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.base.controller.apierror.EntityNotFoundException;
import org.lamisplus.modules.hiv.domain.dto.HIVEacDto;
import org.lamisplus.modules.hiv.domain.dto.HIVEacResponseDto;
import org.lamisplus.modules.hiv.domain.entity.HIVEac;
import org.lamisplus.modules.hiv.repositories.HIVEacRepository;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.domain.entity.Visit;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.springframework.stereotype.Service;
import reactor.util.UUIDUtils;

import java.util.List;
import java.util.Optional;
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


    public HIVEacResponseDto handleEac(HIVEacDto dto) {
        Person person = getPerson (dto.getPersonId ());
        if (dto.getStatus ().contains ("First")) {
            return convertHivEacToDto (createFirstEac (dto));
        }

        if (dto.getStatus ().contains ("Second")) {
            Optional<HIVEac> second = hivEacRepository.getByPersonAndDateOfEac2IsNullAndDateOfEac3IsNull (person);
            if (second.isPresent ()) {
                HIVEac hivEac = second.get ();
                hivEac.setDateOfEac2 (dto.getDateOfEac ());
                hivEac.setStatus (dto.getStatus ());
                hivEac.setNote (dto.getNote ());
                return convertHivEacToDto (hivEacRepository.save (hivEac));
            }

        }
        Optional<HIVEac> third = hivEacRepository.getByPersonAndDateOfEac1IsNotNullAndDateOfEac2IsNotNullAndDateOfEac3IsNull (person);
        if (third.isPresent ()) {
            HIVEac hivEac = third.get ();
            hivEac.setDateOfEac3 (dto.getDateOfEac ());
            hivEac.setStatus ("Completed");
            hivEac.setNote (dto.getNote ());
            return convertHivEacToDto (hivEacRepository.save (hivEac));
        }
        return new HIVEacResponseDto ();
    }

    private HIVEac convertDtoToEntity(HIVEacDto dto) {
        HIVEac hivEac = new HIVEac ();
        hivEac.setDateOfEac1 (dto.getDateOfEac ());
        hivEac.setDateOfLastViralLoad (dto.getDateOfLastViralLoad ());
        hivEac.setLastViralLoad (dto.getLastViralLoad ());
        return hivEac;
    }


    public List<HIVEacResponseDto> getEacByPersonId(Long personId) {
        Person person = getPerson (personId);
        List<HIVEac> hivEacList = hivEacRepository.getAllByPersonAndArchived (person, 0);
        return hivEacList.stream ().map (this::convertHivEacToDto).collect (Collectors.toList ());

    }

    private HIVEacResponseDto convertHivEacToDto(HIVEac hivEac) {
        return HIVEacResponseDto.builder ()
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
