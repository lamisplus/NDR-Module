package org.lamisplus.modules.hiv.service;


import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.lamisplus.modules.hiv.repository.HivEnrollmentRepository;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;


@Service
@RequiredArgsConstructor
public class HivService {

    private final HivEnrollmentRepository hivEnrollmentRepository;


    @Transactional
    public HivEnrollment createHivEnrollment(HivEnrollment hivEnrollment) {
        return hivEnrollmentRepository.save(hivEnrollment);

    }

    @Transactional
    public HivEnrollment updateHivEnrollment(Long id, HivEnrollment hivEnrollment) {
        HivEnrollment hivEnrollment1 = hivEnrollmentRepository.findById(id).orElseThrow(()-> new RuntimeException("mme"));

        return hivEnrollmentRepository.save(hivEnrollment);
    }

    public List<HivEnrollment> getAll() {
        return hivEnrollmentRepository.findAll();

    }

    public HivEnrollment getHivEnrollmentById(Long id) {
        return hivEnrollmentRepository.findById(id).orElseThrow(()-> new RuntimeException("mme"));

    }

    @Transactional
    public Integer deleteHivEnrollment(Long id) {
        hivEnrollmentRepository.findById(id).orElseThrow(()-> new RuntimeException("mme"));
        return hivEnrollmentRepository.deleteById(id);
    }

}


