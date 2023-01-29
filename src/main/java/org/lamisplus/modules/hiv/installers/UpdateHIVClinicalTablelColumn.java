package org.lamisplus.modules.hiv.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import com.foreach.across.core.installers.InstallerRunCondition;
import org.springframework.core.annotation.Order;

@Order(2)
@Installer(name = "update-hiv_art_clinical",
		description = "add new columns",
		runCondition = InstallerRunCondition.AlwaysRun)
public class UpdateHIVClinicalTablelColumn extends AcrossLiquibaseInstaller {
	public UpdateHIVClinicalTablelColumn() {
		super ("classpath:installers/hiv/schema/add-new-columns.xml");
	}
}
