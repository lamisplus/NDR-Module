//package org.lamisplus.modules.patient.service;
//
//import lombok.RequiredArgsConstructor;
//import org.lamisplus.modules.patient.domain.dto.PatientDTO;
//import org.lamisplus.modules.patient.domain.dto.PatientResponseDTO;
//import org.lamisplus.modules.patient.domain.entity.PatientEnhance;
//import org.lamisplus.modules.patient.domain.repository.PatientEnhanceDAO;
//import org.springframework.dao.EmptyResultDataAccessException;
//import org.springframework.stereotype.Service;
//
//import javax.persistence.EntityNotFoundException;
//import java.sql.SQLException;
//import java.util.List;
//import java.util.Optional;
//import java.util.UUID;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//public class PatientEnhanceServiceImp implements PatientEnhanceService {
//
//    private final PatientEnhanceDAO repository;
//
//
//    @Override
//    public PatientResponseDTO save(PatientDTO request) throws SQLException {
//        String uuid = UUID.randomUUID().toString();
//        request.setUuid(uuid);
//        PatientEnhance patient = repository.save(toPatient(request));
////        OrganisationUnit organizationUnit = service.getOrganizationUnit(request.getOrganisationUnitId());
////        if(organizationUnit == null) {
////            throw new Exception("OrganisationUnit with  id " + request.getOrganisationUnitId() + " is not found");
////        }
//        System.out.println("patientDB: => " + patient);
//        PatientResponseDTO patientResponseDTO = toPatientResponseDTO(patient);
//        Long id = repository.getPatientIdBYUUID(uuid);
//        patientResponseDTO.setPatientId(id);
//        System.out.println("patientDTO: => " + patientResponseDTO);
//        return patientResponseDTO;
//    }
//
//    @Override
//    public PatientResponseDTO update(Long id, PatientDTO request) throws EmptyResultDataAccessException {
//        Optional<PatientEnhance> patient = repository.getPatientById(id);
//        if (!patient.isPresent()) throw new EntityNotFoundException("patient with id " + id + " is not found");
//        PatientEnhance patientUpdate = repository.upate(toPatient(request));
//        return toPatientResponseDTO(patientUpdate);
//    }
//
//    @Override
//    public PatientResponseDTO findById(Long id)  throws EmptyResultDataAccessException {
//        Optional<PatientEnhance> patient = repository.getPatientById(id);
//        if(!patient.isPresent()) throw  new  EntityNotFoundException("patient with id "+id+ " is not found");
//        return  toPatientResponseDTO(patient.get());
//    }
//
//    @Override
//    public int deleteById(Long id) {
//        return repository.deletePatientById(id);
//    }
//
//
//    @Override
//    public List<PatientResponseDTO> getAllPatients() {
//        return repository.getAllPatients()
//                .stream()
//                .map(patientEnhance -> toPatientResponseDTO(patientEnhance)).collect(Collectors.toList());
//    }
//
//
//
//    private PatientResponseDTO toPatientResponseDTO(PatientEnhance patient) {
//        return PatientResponseDTO.builder()
//                .patientId(patient.getId())
//                .hospitalNumber(patient.getHospitalNumber())
//                .details(patient.getDetails().toString())
//                .artStartDate(patient.getArtStartDate())
//                .breastfeeding(patient.getBreastfeeding())
//                .dateConfirmedHiv(patient.getDateConfirmedHiv())
//                .entryPoint(patient.getEntryPoint())
//                .caseManagerId(patient.getCaseManagerId())
//                .pregnant(patient.getPregnant())
//                .dateEnrolledPmtct(patient.getDateEnrolledPmtct())
//                .dateRegistration(patient.getDateRegistration())
//                .dateLastCd4(patient.getDateLastCd4())
//                .enrollmentSetting(patient.getEnrollmentSetting())
//                .targetGroup(patient.getTargetGroup())
//                .htsId(patient.getHtsId())
//                .htsNewId(patient.getHtsNewId())
//                .organisationUnitId(patient.getOrganisationUnitId())
//                .sendMessage(patient.getSendMessage())
//                .sourceReferral(patient.getSourceReferral())
//                .statusAtRegistration(patient.getStatusAtRegistration())
//                .tbStatus(patient.getTbStatus())
//                .timeHivDiagnosis(patient.getTimeHivDiagnosis())
//                .uniqueId(patient.getUniqueId())
//                .uuid(patient.getUuid())
//                .build();
//    }
//
//    private PatientEnhance toPatient(PatientDTO patientDTO) {
//        PatientEnhance patient = new PatientEnhance();
//        if (patientDTO.getPatientId() != null) {
//            patient.setId(patientDTO.getPatientId());
//        }
//        patient.setHospitalNumber(patientDTO.getHospitalNumber());
//        patient.setDetails(patientDTO.getDetails());
//        patient.setArtStartDate(patientDTO.getArtStartDate());
//        patient.setBreastfeeding(patientDTO.getBreastfeeding());
//        patient.setDateConfirmedHiv(patientDTO.getDateConfirmedHiv());
//        patient.setEntryPoint(patientDTO.getEntryPoint());
//        patient.setCaseManagerId(patientDTO.getCaseManagerId());
//        patient.setPregnant(patientDTO.getPregnant());
//        patient.setDateEnrolledPmtct(patientDTO.getDateEnrolledPmtct());
//        patient.setDateRegistration(patientDTO.getDateRegistration());
//        patient.setDateLastCd4(patientDTO.getDateLastCd4());
//        patient.setEnrollmentSetting(patientDTO.getEnrollmentSetting());
//        patient.setTargetGroup(patientDTO.getTargetGroup());
//        patient.setHtsId(patientDTO.getHtsId());
//        patient.setHtsNewId(patientDTO.getHtsNewId());
//        patient.setOrganisationUnitId(patientDTO.getOrganisationUnitId());
//        patient.setSendMessage(patientDTO.getSendMessage());
//        patient.setSourceReferral(patientDTO.getSourceReferral());
//        patient.setStatusAtRegistration(patientDTO.getStatusAtRegistration());
//        patient.setTbStatus(patientDTO.getTbStatus());
//        patient.setTimeHivDiagnosis(patientDTO.getTimeHivDiagnosis());
//        patient.setUniqueId(patientDTO.getUniqueId());
//        patient.setUuid(patientDTO.getUuid());
//        return patient;
//    }
//}
