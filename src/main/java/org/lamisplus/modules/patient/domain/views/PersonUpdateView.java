package org.lamisplus.modules.patient.domain.views;

import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.UpdatableEntityView;
import org.lamisplus.modules.patient.domain.entity.Person;

@EntityView(Person.class)
@UpdatableEntityView
public interface PersonUpdateView extends PersonCreateView {
        void setId(Long id);

}
