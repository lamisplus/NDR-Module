package org.lamisplus.modules.patient.domain.views;

import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import org.lamisplus.modules.patient.domain.entity.Person;

@EntityView(Person.class)
public interface PersonIdView {
        @IdMapping
        Long getId();
}
