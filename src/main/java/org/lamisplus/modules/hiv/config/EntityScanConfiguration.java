package org.lamisplus.modules.hiv.config;

import com.foreach.across.core.annotations.ModuleConfiguration;
import com.foreach.across.modules.hibernate.provider.HibernatePackageConfigurer;
import com.foreach.across.modules.hibernate.provider.HibernatePackageRegistry;
import org.lamisplus.modules.base.domain.BaseDomain;
import org.lamisplus.modules.hiv.domain.HIVDomain;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ModuleConfiguration({"AcrossHibernateJpaModule"})
public class EntityScanConfiguration implements HibernatePackageConfigurer {
    private static final Logger log = LoggerFactory.getLogger(org.lamisplus.modules.hiv.config.EntityScanConfiguration.class);

    public EntityScanConfiguration() {
    }

    public void configureHibernatePackage(HibernatePackageRegistry hibernatePackageRegistry) {
        hibernatePackageRegistry.addPackageToScan(HIVDomain.class, BaseDomain.class);
    }
}
