package org.lamisplus.modules.hiv.service.activity;

import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.hiv.domain.dto.PatientActivity;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.lamisplus.modules.hiv.repositories.HivEnrollmentRepository;
import org.lamisplus.modules.hiv.service.PatientActivityProvider;
import org.lamisplus.modules.patient.domain.entity.Person;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HivEnrollmentActivityProvider implements PatientActivityProvider {
    /**
     * @param person
     * @return
     */
    private final HivEnrollmentRepository hivEnrollmentRepository;

    @Override
    public List<PatientActivity> getActivitiesFor(Person person) {
        Optional<HivEnrollment> hivEnrollmentOptional = hivEnrollmentRepository.getHivEnrollmentByPersonAndArchived (person, 0);
        List<PatientActivity> patientActivities = new ArrayList<> ();
        String name = "HIV Enrollment";
        PatientActivity patientActivity = hivEnrollmentOptional
                .map (hivEnrollment -> new PatientActivity (hivEnrollment.getId (), name, hivEnrollment.getDateOfRegistration (), null, "hiv-enrollment"))
                .orElse (null);
        patientActivities.add (patientActivity);
        return patientActivities;

    }

}
