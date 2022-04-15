package org.lamisplus.modules.hiv.config;

import com.blazebit.persistence.Criteria;
import com.blazebit.persistence.CriteriaBuilderFactory;
import com.blazebit.persistence.integration.jackson.EntityViewAwareObjectMapper;
import com.blazebit.persistence.integration.jackson.EntityViewIdValueAccessor;
import com.blazebit.persistence.integration.view.spring.EnableEntityViews;
import com.blazebit.persistence.spi.CriteriaBuilderConfiguration;
import com.blazebit.persistence.view.EntityViewManager;
import com.blazebit.persistence.view.spi.EntityViewConfiguration;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import java.util.List;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@Configuration
@EnableEntityViews("org.lamisplus.modules.hiv.domain.views")
public class BlazePersistenceConfiguration {

    @PersistenceUnit
    private EntityManagerFactory entityManagerFactory;

    @Bean(name = "HivCriteriaBuilderFactory")
    @Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
    @Lazy(false)
    public CriteriaBuilderFactory createCriteriaBuilderFactory() {
        CriteriaBuilderConfiguration config = Criteria.getDefault ();

        return config.createCriteriaBuilderFactory (entityManagerFactory);
    }

    @Bean(name = "HivEntityViewManager")
    @Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
    @Lazy(false)
    public EntityViewManager entityViewManager(
            CriteriaBuilderFactory cbf,
            EntityViewConfiguration entityViewConfiguration
    ) {
        entityViewConfiguration.setProperty ("com.blazebit.persistence.view.static_metamodel_scanning_disabled", "true");
        entityViewConfiguration.setProperty ("com.blazebit.persistence.view.static_builder_scanning_disabled", "true");
        entityViewConfiguration
                .setProperty ("com.blazebit.persistence.view.static_implementation_scanning_disabled", "true");

        return entityViewConfiguration.createEntityViewManager (cbf);
    }

    @Bean(name = "HivEntityManager")
    @Primary
    public EntityManager entityManager(List<EntityManager> entityManagers) {
        return entityManagers.get (0);
    }


    @Bean
    public EntityViewIdValueAccessor getEntityViewIdValueAccessor() {
        return new EntityViewIdValueAccessor () {
            @Override
            public <T> T getValue(JsonParser jsonParser, Class<T> idType) {
                return (T) id;
            }
        };
    }

    @Bean
    public EntityViewAwareObjectMapper getEntityViewAwareObjectMapper(
            EntityViewManager evm,
            ObjectMapper objectMapper,
            EntityViewIdValueAccessor entityViewIdValueAccessor) {
        return new EntityViewAwareObjectMapper (evm, objectMapper, entityViewIdValueAccessor);

    }

}
