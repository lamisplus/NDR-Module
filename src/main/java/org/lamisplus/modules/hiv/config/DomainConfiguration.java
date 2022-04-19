package org.lamisplus.modules.hiv.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = {"org.lamisplus.modules.hiv.repository"})
public class DomainConfiguration {
}
