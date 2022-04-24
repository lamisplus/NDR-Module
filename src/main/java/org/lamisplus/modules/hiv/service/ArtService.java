package org.lamisplus.modules.hiv.service;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.lamisplus.modules.hiv.domain.dto.ARTDto;
import org.lamisplus.modules.hiv.domain.dto.HivEnrollmentDto;
import org.lamisplus.modules.hiv.domain.entity.ART;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.lamisplus.modules.hiv.repository.ArtRepository;
import org.lamisplus.modules.hiv.repository.HivEnrollmentRepository;
import org.lamisplus.modules.hiv.utility.SecurityUtils;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ArtService {

    private final ArtRepository artRepository;
    private final HivEnrollmentRepository hivEnrollmentRepository;

    public ARTDto createArt(ARTDto artDto) {
        Optional<HivEnrollmentDto> hivEnrollmentDTO = hivEnrollmentRepository.findById (artDto.getEnrollmentId ());
        if (! hivEnrollmentDTO.isPresent ())
            throw new RuntimeException ("No HIV enrollment found for this id " + artDto.getEnrollmentId ());
        ART art = convertArtDtoToArt (artDto);
        return artRepository.save (art);
    }


    @NotNull
    private ART convertArtDtoToArt(ARTDto artDto) {
        ART art = new ART ();
        HivEnrollment hivEnrollment = new HivEnrollment ();
        hivEnrollment.setId (artDto.getEnrollmentId ());
        art.setHivEnrollment (hivEnrollment);
        art.setArt_status (52L);
        art.setArtDate (artDto.getArtDate ());
        art.setBloodPressure (artDto.getBloodPressure ());
        art.setBodyWeight (artDto.getBodyWeight ());
        art.setUuid (UUID.randomUUID ().toString ());
        art.setCd4 (artDto.getCd4 ());
        art.setCd4Percentage (artDto.getCd4Percentage ());
        art.setClinicalNote (artDto.getClinicalNote ());
        art.setHeight (artDto.getHeight ());
        art.setRegimen (artDto.getRegimen ());
        art.setViralLoad (artDto.getViralLoad ());
        art.setIsCommencement (artDto.getIsCommencement ());
        art.setWhoStagingId (artDto.getWhoStagingId ());
        art.setFunctionalStatusId (artDto.getFunctionalStatusId ());
        Optional<String> currentUserLogin = SecurityUtils.getCurrentUserLogin ();
        String createdBy = (currentUserLogin.isPresent ()) ? currentUserLogin.get () : "";
        art.setCreatedBy (createdBy);
        return art;
    }
}
