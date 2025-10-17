import accessLogo from "@taaply/assets/images/access-logo.png";
import chivasLogo from "@taaply/assets/images/chivas-Logo.png";
import doualaLogo from "@taaply/assets/images/douala-logo.png";
import forvisLogo from "@taaply/assets/images/forvis-logo.png";
import mtnLogo from "@taaply/assets/images/mtn-logo.png";
import uodLogo from "@taaply/assets/images/uod-logo.png";
import walmartLogo from "@taaply/assets/images/walmart-logo.png";
import Image from "next/image";
import { InfiniteSlider } from "../infinite-slider/infinite-slider";
import { ProgressiveBlur } from "../progressive-blur/progressive-blur";

const logos = [
	{ src: forvisLogo, alt: "forvis_logo" },
	{ src: accessLogo, alt: "accessLogo" },
	{ src: mtnLogo, alt: "mtn_logo" },
	{ src: walmartLogo, alt: "walmart_logo" },
	{ src: doualaLogo, alt: "douala_logo" },
	{ src: uodLogo, alt: "uod_logo" },
	{ src: chivasLogo, alt: "chivas_logo" },
];

export function CustomerLogos() {
	return (
		<section className="w-full overflow-hidden px-4 py-16 md:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="flex flex-col items-center md:flex-row">
					<div className="md:max-w-44 md:border-r md:pr-6">
						<h6 className="text-sm">Trusted by 300+ companies</h6>
					</div>
					<div className="relative py-6 md:w-[calc(100%-11rem)]">
						<InfiniteSlider gap={112} speed={40} speedOnHover={20}>
							{logos.map((logo) => (
								<div className="flex" key={logo.alt}>
									<Image
										alt={logo.alt}
										className="mx-auto dark:invert"
										height={20}
										src={logo.src}
										width={100}
									/>
								</div>
							))}
						</InfiniteSlider>

						<div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-background"></div>
						<div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-background"></div>
						<ProgressiveBlur
							blurIntensity={1}
							className="pointer-events-none absolute top-0 left-0 h-full w-20"
							direction="left"
						/>
						<ProgressiveBlur
							blurIntensity={1}
							className="pointer-events-none absolute top-0 right-0 h-full w-20"
							direction="right"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
