package org.lamisplus.modules.hiv.service;


import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.hiv.domain.dto.HivEnrollmentDTO;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.lamisplus.modules.hiv.repository.HivEnrollmentRepository;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class HivService {

    private final HivEnrollmentRepository hivEnrollmentRepository;


    @Transactional
    public HivEnrollmentDTO createHivEnrollment(HivEnrollment hivEnrollment) {
        hivEnrollment.setUuid(UUID.randomUUID().toString());
        return hivEnrollmentRepository.save(hivEnrollment);

    }

    @Transactional
    public HivEnrollmentDTO updateHivEnrollment(Long id, HivEnrollment hivEnrollment) {
        hivEnrollmentRepository.findById(id).orElseThrow(()-> new RuntimeException("mme"));

        return hivEnrollmentRepository.save(hivEnrollment);
    }

    public List<HivEnrollment> getAll() {
        return hivEnrollmentRepository.findAll();

    }

    public HivEnrollmentDTO getHivEnrollmentById(Long id) {
        return hivEnrollmentRepository.findById(id).orElseThrow(()-> new RuntimeException("mme"));

    }

    @Transactional
    public Integer deleteHivEnrollment(Long id) {
        hivEnrollmentRepository.findById(id).orElseThrow(()-> new RuntimeException("mme"));
        return hivEnrollmentRepository.deleteById(id);
    }

}


