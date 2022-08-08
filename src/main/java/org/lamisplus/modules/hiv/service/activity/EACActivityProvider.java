package org.lamisplus.modules.hiv.service.activity;

import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.lamisplus.modules.hiv.domain.dto.PatientActivity;
import org.lamisplus.modules.hiv.domain.entity.HIVEac;
import org.lamisplus.modules.hiv.repositories.HIVEacRepository;
import org.lamisplus.modules.hiv.service.PatientActivityProvider;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class EACActivityProvider implements PatientActivityProvider {


    private  final HIVEacRepository hivEacRepository;
    @Override
    public List<PatientActivity> getActivitiesFor(Person person) {
        List<HIVEac> eacs = hivEacRepository.getAllByPersonAndArchived (person, 0);
        String name = "EAC ";

        return eacs.stream ()
                .map (eac -> getEac (name, eac))
                .collect(Collectors.toList());
    }

    @NotNull
    private PatientActivity getEac(String name, HIVEac eac) {
        LocalDate date = eac.getCreatedDate ().toLocalDate ();

        if(eac.getDateOfEac1 () != null && eac.getDateOfEac2 () == null && eac.getDateOfEac3 () == null){
            date = eac.getDateOfEac1 ();
        }
        if(eac.getDateOfEac1 () != null && eac.getDateOfEac2 () != null && eac.getDateOfEac3 () == null){
            date = eac.getDateOfEac2 ();
        }
        if(eac.getDateOfEac1 () != null && eac.getDateOfEac2 () !=  null && eac.getDateOfEac3 () != null){
            date = eac.getDateOfEac3 ();
        }

        return new PatientActivity (eac.getId (), name + eac.getStatus (), date, "", "eac");
    }
}
