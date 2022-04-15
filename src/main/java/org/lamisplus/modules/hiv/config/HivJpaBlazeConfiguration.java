package org.lamisplus.modules.hiv.config;


import com.blazebit.persistence.spring.data.impl.repository.BlazePersistenceRepositoryFactoryBean;
import org.lamisplus.modules.hiv.domain.HIVDomain;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories(
        basePackageClasses = {HIVDomain.class},
        repositoryFactoryBeanClass = BlazePersistenceRepositoryFactoryBean.class
)
@EnableTransactionManagement
public class HivJpaBlazeConfiguration {


}
