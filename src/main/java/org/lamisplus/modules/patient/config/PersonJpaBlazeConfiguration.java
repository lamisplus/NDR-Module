package org.lamisplus.modules.patient.config;


import com.blazebit.persistence.spring.data.impl.repository.BlazePersistenceRepositoryFactoryBean;
import org.lamisplus.modules.patient.domain.PatientDomain;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories(
        basePackageClasses = {PatientDomain.class},
        repositoryFactoryBeanClass = BlazePersistenceRepositoryFactoryBean.class
)
@EnableTransactionManagement
public class PersonJpaBlazeConfiguration {


}
