package org.lamisplus.modules.hiv.domain.views;


import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;

@EntityView (HivEnrollment.class)
public interface HivEnrollmentIdView {
    @IdMapping
    Long getId();
}
