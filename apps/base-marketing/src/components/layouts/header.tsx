import taaplyLogo from "@taaply/assets/images/taaply-logo.png";
import { Button, Header, LanguageSwitcher } from "@taaply/ui";
import Image from "next/image";
import * as m from "@/marketing/paraglide/messages"; // ✅ Add this import
import {
	getLocale,
	locales,
	localizeHref,
	setLocale,
} from "@/marketing/paraglide/runtime";

// ✅ Moved inside component to access translations
export function HeroHeader() {
	const navigation = [
		{ name: m.header_nav_service(), href: "/service" },
		{ name: m.header_nav_smart_shop(), href: "/shop" },
		{ name: m.header_nav_locations(), href: "/locations" },
		{ name: m.header_nav_contact(), href: "/contact" },
	];

	return (
		<Header scrollThreshold={0.05}>
			<Header.Container>
				{/* Logo Section */}
				<div className="flex w-full items-center justify-between gap-12 lg:w-auto">
					<Header.Logo href={localizeHref("/")}>
						<Image
							src={taaplyLogo}
							alt={m.common_brand_taaply_alt()}
							width={100}
							height={25}
							priority
						/>
					</Header.Logo>

					<Header.MobileToggle />

					{/* Desktop Navigation */}
					<Header.Nav desktopOnly>
						{navigation.map((item) => (
							<Header.NavItem key={item.href} href={localizeHref(item.href)}>
								{item.name}
							</Header.NavItem>
						))}
					</Header.Nav>
				</div>

				{/* Actions Area */}
				<Header.Actions>
					{/* Mobile Navigation */}
					<Header.Nav mobileOnly>
						{navigation.map((item) => (
							<Header.NavItem key={item.href} href={localizeHref(item.href)}>
								{item.name}
							</Header.NavItem>
						))}
					</Header.Nav>

					{/* Action Buttons */}
					<div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
						<LanguageSwitcher
							defaultLocale={getLocale}
							setLocale={setLocale}
							locales={locales}
						/>
						<Button variant="outline" color="inherit" href="/login">
							{m.common_button_login()}
						</Button>
						<Button color="inherit" href="/signup">
							{m.common_button_get_started()}
						</Button>
					</div>
				</Header.Actions>
			</Header.Container>
		</Header>
	);
}
