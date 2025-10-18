import accessLogo from "@taaply/assets/images/access-logo.png";
import chivasLogo from "@taaply/assets/images/chivas-Logo.png";
import doualaLogo from "@taaply/assets/images/douala-logo.png";
import forvisLogo from "@taaply/assets/images/forvis-logo.png";
import mtnLogo from "@taaply/assets/images/mtn-logo.png";
import uodLogo from "@taaply/assets/images/uod-logo.png";
import walmartLogo from "@taaply/assets/images/walmart-logo.png";
import { LogoCarousel } from "@taaply/ui";
import Image from "next/image";
import * as m from "@/marketing/paraglide/messages";

export function LogoSection() {
	// ✅ Using translations for alt text
	const logos = [
		{ src: forvisLogo, alt: m.logo_section_brand_forvis() },
		{ src: accessLogo, alt: m.logo_section_brand_access() },
		{ src: mtnLogo, alt: m.logo_section_brand_mtn() },
		{ src: walmartLogo, alt: m.logo_section_brand_walmart() },
		{ src: doualaLogo, alt: m.logo_section_brand_douala() },
		{ src: uodLogo, alt: m.logo_section_brand_uod() },
		{ src: chivasLogo, alt: m.logo_section_brand_chivas() },
	];

	return (
		<LogoCarousel speed={40} speedOnHover={20} gap={112}>
			<LogoCarousel.Container>
				<LogoCarousel.Title showBorder>
					{m.logo_section_trusted_by({ count: "300" })}
				</LogoCarousel.Title>

				<LogoCarousel.Slider enableBlur blurIntensity={1}>
					{logos.map((logo) => (
						<LogoCarousel.Item key={logo.alt} darkInvert>
							<Image
								src={logo.src}
								alt={logo.alt}
								width={90}
								height={45}
								className="mx-auto"
							/>
						</LogoCarousel.Item>
					))}
				</LogoCarousel.Slider>
			</LogoCarousel.Container>
		</LogoCarousel>
	);
}
