package org.lamisplus.modules.hiv.service;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.base.module.BeanProvider;
import org.lamisplus.modules.hiv.domain.dto.PatientActivity;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.lamisplus.modules.patient.repository.PersonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class PatientActivityService {
    private final BeanProvider beanProvider;
    private final PersonRepository patientRepository;

    public List<PatientActivity> getActivitiesFor(Long patientId) {
        Person person = patientRepository.findById (patientId).orElse (null);
        if(person != null){
            return beanProvider.getBeansOfType(PatientActivityProvider.class)
                    .stream()
                    .flatMap(activityProvider -> activityProvider.getActivitiesFor(person).stream())
                    .collect(toList());
        }
      return null;
    }
}
