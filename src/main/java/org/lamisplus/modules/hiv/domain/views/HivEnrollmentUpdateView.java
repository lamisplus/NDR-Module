package org.lamisplus.modules.hiv.domain.views;

import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.UpdatableEntityView;
import org.lamisplus.modules.hiv.domain.entity.HivEnrollment;

@EntityView (HivEnrollment.class)
@UpdatableEntityView
public interface HivEnrollmentUpdateView extends HivEnrollmentCreatView{
    void setId(Long id);
}
