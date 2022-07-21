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
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HIVEacService {

    private final HIVEacRepository hivEacRepository;
    private final PersonRepository personRepository;

    private  final  ArtCommenceService artCommenceService;



    public HIVEacDto createFirstEac(HIVEacDto dto) {
        Long personId = dto.getPersonId ();
        HIVEac hivEac = convertDtoToEntity (dto);
        hivEac.setUuid (UUIDUtils.random ().toString ());
        Person person = getPerson (personId);
        hivEac.setPerson (person);
        Visit visit = artCommenceService.processAndCreateVisit (personId);
        hivEac.setVisit (visit);
        HIVEac hivEacSave = hivEacRepository.save (hivEac);
        dto.setId (hivEacSave.getId ());
        return dto;
    }


    public HIVEacDto handleEac(HIVEacDto dto) {
        Person person = getPerson (dto.getPersonId ());
        List<HIVEac> hivEacList = hivEacRepository.getAllByPersonAndArchived (person, 0);
        if (hivEacList.isEmpty ()) {
            return createFirstEac (dto);
        }
        Optional<HIVEac> secondEac = hivEacList.stream ()
                .filter (hivEac -> hivEac.getDateOfEac2 () == null && hivEac.getDateOfEac1 () != null)
                .findFirst ();
        secondEac.ifPresent (hivEac -> {
            hivEac.setDateOfEac2 (dto.getDateOfEac2 ());
            hivEac.setNote (dto.getNote ());
            hivEac.setStatus ("In progress");
            hivEacRepository.save (hivEac);
        });
        Optional<HIVEac> thirdEac = hivEacList.stream ()
                .filter (hivEac -> hivEac.getDateOfEac3 () == null && hivEac.getDateOfEac2 () != null)
                .findFirst ();
        thirdEac.ifPresent (hivEac -> {
            hivEac.setDateOfEac2 (dto.getDateOfEac2 ());
            hivEac.setNote (dto.getNote ());
            hivEac.setStatus ("Completed");
            hivEacRepository.save (hivEac);
        });
        return dto;
    }

    private HIVEac convertDtoToEntity(HIVEacDto dto) {
        HIVEac hivEac = new HIVEac ();
        hivEac.setDateOfEac1 (dto.getDateOfEac1 ());
        hivEac.setDateOfEac2 (dto.getDateOfEac2 ());
        hivEac.setDateOfEac3 (dto.getDateOfEac3 ());
        hivEac.setDateOfLastViralLoad (dto.getDateOfLastViralLoad ());
        hivEac.setLastViralLoad (dto.getLastViralLoad ());
        hivEac.setStatus ("Started");
        return hivEac;
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
                .note (hivEac.getNote ())
                .build ();
    }

    private Person getPerson(Long personId) {
        return personRepository.findById (personId).orElseThrow (() -> new EntityNotFoundException (Person.class, "id", String.valueOf (personId)));
    }


}
