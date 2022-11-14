package org.lamisplus.modules.hiv.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(2)
@Installer(name = "update-hiv_art_clinical",
		description = "add new columns",
		version = 1)
public class UpdateHIVClinicaTablelColums  extends AcrossLiquibaseInstaller {
	public UpdateHIVClinicaTablelColums() {
		super ("classpath:installers/hiv/schema/add-new-columns.xml");
	}
}
