import taaplyLogo from "@taaply/assets/images/taaply-icon.png";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import Image from "next/image";

const footerLinks = [
	{
		group: "Company",
		items: [
			{ title: "About us", href: "#" },
			{ title: "Press & media", href: "#" },
			{ title: "Careers", href: "#" },
			{ title: "Locations", href: "#" },
			{ title: "Partnerships", href: "#" },
			{ title: "Contact us", href: "#" },
		],
	},
	{
		group: "Quick Access",
		items: [
			{ title: "Corporate login", href: "#" },
			{ title: "Customer login", href: "#" },
			{ title: "Merchant login", href: "#" },
			{ title: "Smart shop", href: "#" },
			{ title: "FAQ", href: "#" },
			{ title: "Download apps", href: "#" },
		],
	},
	{
		group: "Resources",
		items: [
			{ title: "Learn", href: "#" },
			{ title: "How-to guides", href: "#" },
			{ title: "Videos", href: "#" },
			{ title: "Blog", href: "#" },
			{ title: "Launched", href: "#" },
			{ title: "Support", href: "#" },
		],
	},
	{
		group: "Legal",
		items: [
			{ title: "Privacy policy", href: "#" },
			{ title: "Cookie settings", href: "#" },
			{ title: "Terms of Service", href: "#" },
			{ title: "Platform rules", href: "#" },
			{ title: "Report abuse", href: "#" },
		],
	},
	{
		group: "Community",
		items: [
			{ title: "Become a partner", href: "#" },
			{ title: "Affiliates", href: "#" },
			{ title: "Facebook", href: "#" },
			{ title: "Instagram", href: "#" },
			{ title: "X / Twitter", href: "#" },
			{ title: "TikTok", href: "#" },
			{ title: "LinkedIn", href: "#" },
		],
	},
];

export function FooterSection() {
	return (
		<footer className="lg:m-4 bg-accent rounded-2xl">
			<div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
				<div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
					{/* Logo Column */}

					<div className="col-span-2 sm:col-span-1">
						<Image src={taaplyLogo} alt="taaply" height={40} width={40} />
					</div>

					{/* Link Columns */}
					{footerLinks.map((section) => (
						<div key={section.group} className="space-y-3">
							<h3 className="text-sm font-medium text-foreground">
								{section.group}
							</h3>
							<ul className="space-y-2">
								{section.items.map((item) => (
									<li key={item.title}>
										<Link
											href={item.href}
											className="text-sm text-muted-foreground hover:text-foreground transition-colors"
										>
											{item.title}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</footer>
	);
}
