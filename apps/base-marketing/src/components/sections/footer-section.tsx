import taaplyLogo from "@taaply/assets/images/taaply-icon.png";
import { Footer } from "@taaply/ui";
import Image from "next/image";
import { m } from "@/marketing/paraglide/messages"; // ✅ Add this import

export function FooterSection() {
	// ✅ Footer links using translations
	const footerLinks = [
		{
			group: m.footer_group_company(),
			items: [
				{ title: m.footer_company_about_us(), href: "#" },
				{ title: m.footer_company_press_media(), href: "#" },
				{ title: m.footer_company_careers(), href: "#" },
				{ title: m.footer_company_locations(), href: "#" },
				{ title: m.footer_company_partnerships(), href: "#" },
				{ title: m.footer_company_contact_us(), href: "#" },
			],
		},
		{
			group: m.footer_group_quick_access(),
			items: [
				{ title: m.footer_quick_access_corporate_login(), href: "#" },
				{ title: m.footer_quick_access_customer_login(), href: "#" },
				{ title: m.footer_quick_access_merchant_login(), href: "#" },
				{ title: m.footer_quick_access_smart_shop(), href: "#" },
				{ title: m.footer_quick_access_faq(), href: "#" },
				{ title: m.footer_quick_access_download_apps(), href: "#" },
			],
		},
		{
			group: m.footer_group_resources(),
			items: [
				{ title: m.footer_resources_learn(), href: "#" },
				{ title: m.footer_resources_how_to_guides(), href: "#" },
				{ title: m.footer_resources_videos(), href: "#" },
				{ title: m.footer_resources_blog(), href: "#" },
				{ title: m.footer_resources_launched(), href: "#" },
				{ title: m.footer_resources_support(), href: "#" },
			],
		},
		{
			group: m.footer_group_legal(),
			items: [
				{ title: m.footer_legal_privacy_policy(), href: "#" },
				{ title: m.footer_legal_cookie_settings(), href: "#" },
				{ title: m.footer_legal_terms_of_service(), href: "#" },
				{ title: m.footer_legal_platform_rules(), href: "#" },
				{ title: m.footer_legal_report_abuse(), href: "#" },
			],
		},
		{
			group: m.footer_group_community(),
			items: [
				{ title: m.footer_community_become_partner(), href: "#" },
				{ title: m.footer_community_affiliates(), href: "#" },
				{ title: m.common_social_facebook(), href: "#" },
				{ title: m.common_social_instagram(), href: "#" },
				{ title: m.common_social_x_twitter(), href: "#" },
				{ title: m.common_social_tiktok(), href: "#" },
				{ title: m.common_social_linkedin(), href: "#" },
			],
		},
	];

	return (
		<Footer>
			<Footer.Container>
				<Footer.Grid columns={6}>
					{/* Logo Column */}
					<Footer.Column spanMobile={2} spanDesktop={1}>
						<Footer.Logo href="/">
							<Image
								src={taaplyLogo}
								alt={m.common_brand_taaply_alt()}
								height={40}
								width={40}
							/>
						</Footer.Logo>
					</Footer.Column>

					{/* Link Columns */}
					{footerLinks.map((section) => (
						<Footer.Column key={section.group}>
							<Footer.ColumnTitle>{section.group}</Footer.ColumnTitle>

							<ul className="space-y-2">
								{section.items.map((item) => (
									<Footer.Link key={item.title} href={item.href}>
										{item.title}
									</Footer.Link>
								))}
							</ul>
						</Footer.Column>
					))}
				</Footer.Grid>

				<Footer.Bottom>
					<p>
						{m.footer_bottom_copyright({
							year: new Date().getFullYear().toString(),
						})}
					</p>
					<div className="flex gap-4">
						<a href="/privacy">{m.common_link_privacy()}</a>
						<a href="/terms">{m.common_link_terms()}</a>
					</div>
				</Footer.Bottom>
			</Footer.Container>
		</Footer>
	);
}
