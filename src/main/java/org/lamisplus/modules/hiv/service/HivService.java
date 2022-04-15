package org.lamisplus.modules.hiv.service;


import com.blazebit.persistence.view.EntityViewManager;
import lombok.RequiredArgsConstructor;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;
import org.lamisplus.modules.hiv.domain.repository.HivEnrollmentRepository;
import org.lamisplus.modules.hiv.domain.views.HivEnrollmentCreatView;
import org.lamisplus.modules.hiv.domain.views.HivEnrollmentUpdateView;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class HivService {

    private final HivEnrollmentRepository hivEnrollmentRepository;

    @Qualifier("HivEntityViewManager")
    private final EntityViewManager hivEvm;
    @Qualifier("HivEntityManager")
    private final EntityManager hivEntityManager;


    @Transactional
    public HivEnrollmentUpdateView createHivEnrollment(HivEnrollmentCreatView creatView) {
        hivEvm.save (hivEntityManager, creatView);
        return hivEvm.convert (creatView, HivEnrollmentUpdateView.class);

    }

    @Transactional
    public HivEnrollmentUpdateView updateHivEnrollment(Long id, HivEnrollmentUpdateView updatableEntityView) {
        checkAndReturnEnrollmentById (id);
        hivEvm.save (hivEntityManager, updatableEntityView);
        return updatableEntityView;
    }

    public List<HivEnrollmentUpdateView> getAll() {
        return new ArrayList<> (hivEnrollmentRepository.getAllByArchived (0))
                .stream ()
                .map (hivEnrollment -> hivEvm.convert (hivEnrollment, HivEnrollmentUpdateView.class))
                .collect (Collectors.toList ());

    }

    public HivEnrollmentUpdateView getHivEnrollmentById(Long id) {
        HivEnrollment hivEnrollment = checkAndReturnEnrollmentById (id);
        return hivEvm.convert (hivEnrollment, HivEnrollmentUpdateView.class);

    }

    @Transactional
    public Integer deleteHivEnrollment(Long id) {
        HivEnrollment hivEnrollment = checkAndReturnEnrollmentById (id);
        hivEnrollment.setArchived (1);
        HivEnrollmentUpdateView updateView = hivEvm.convert (hivEnrollment, HivEnrollmentUpdateView.class);
        hivEvm.save (hivEntityManager, updateView);
        return 1;
    }

    private HivEnrollment checkAndReturnEnrollmentById(Long id) {
        return hivEnrollmentRepository.findById (id)
                .orElseThrow (() -> new RuntimeException ("No Hiv entry for this id ->: " + id));
    }
}


