package org.lamisplus.modules.hiv.service.activity;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.hiv.domain.dto.PatientActivity;
import org.lamisplus.modules.hiv.domain.entity.HIVEac;
import org.lamisplus.modules.hiv.repositories.HIVEacRepository;
import org.lamisplus.modules.hiv.service.PatientActivityProvider;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EACActivityProvider implements PatientActivityProvider {


    private  final HIVEacRepository hivEacRepository;
    @Override
    public List<PatientActivity> getActivitiesFor(Person person) {
        List<HIVEac> eacs = hivEacRepository.getAllByPersonAndArchived (person, 0);
        String name = "EAC";
        return eacs.stream ()
                .map (eac ->  new PatientActivity (eac.getId (), name, eac.getCreatedDate ().toLocalDate (),  null, "EAC"))
                .collect(Collectors.toList());
    }
}
