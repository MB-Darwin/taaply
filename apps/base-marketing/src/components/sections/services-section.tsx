"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Card,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@taaply/ui";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import * as m from "@/marketing/paraglide/messages";
import { localizeHref } from "@/marketing/paraglide/runtime";

export function ServicesSection() {
	const categories = [
		{ key: "explore", label: m.services_category_explore() },
		{ key: "business", label: m.services_category_business() },
		{ key: "networking", label: m.services_category_networking() },
		{ key: "gov", label: m.services_category_gov() },
		{ key: "education", label: m.services_category_education() },
		{ key: "health_care", label: m.services_category_health_care() },
		{ key: "identity", label: m.services_category_identity() },
		{ key: "fintech", label: m.services_category_fintech() },
	];

	// ✅ Services using translations
	const services = [
		{
			title: m.services_ms_title(),
			description: m.services_ms_description(),
			image: "https://tailark.com/_next/image?url=%2Fmail2.png&w=3840&q=75",
			link: "#",
			views: "1,234",
			usages: "567",
		},
		{
			title: m.services_salsm_title(),
			description: m.services_salsm_description(),
			image: "https://tailark.com/_next/image?url=%2Fmail2.png&w=3840&q=75",
			link: "#",
			views: "2,891",
			usages: "1,023",
		},
	];

	const [activeCategory, setActiveCategory] = useState("explore");

	return (
		<section className="mb-16 w-full px-4 md:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				{/* Header */}
				<div className="mb-8 flex items-center justify-between">
					<h1 className="font-bold text-3xl text-foreground">
						{m.services_section_title()}
					</h1>
				</div>

				{/* Navigation */}
				<div className="mb-8 flex items-center justify-between gap-4">
					{/* Mobile Dropdown */}
					<div className="md:hidden">
						<Select value={activeCategory} onValueChange={setActiveCategory}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder={m.services_category_popular()} />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="popular">
									{m.services_category_popular()}
								</SelectItem>
								{categories.map((category) => (
									<SelectItem key={category.key} value={category.key}>
										{category.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Desktop Tabs */}
					<div className="hidden items-center gap-2 md:flex">
						<Button
							appearance="ghost"
							color={"inherit"}
							className="gap-2 text-muted-foreground hover:text-foreground"
						>
							{m.services_category_popular()}
							<ChevronDown className="h-4 w-4" />
						</Button>
						{categories.map((category) => (
							<Button
								key={category.key}
								variant={"text"}
								appearance="ghost"
								color={"inherit"}
								onClick={() => setActiveCategory(category.key)}
								className={
									activeCategory === category.key
										? "text-foreground"
										: "text-muted-foreground hover:text-foreground"
								}
							>
								{category.label}
							</Button>
						))}
					</div>

					{/* View All Link */}
					<Button appearance="ghost" color={"inherit"}>
						{m.common_button_view_all()}
					</Button>
				</div>

				{/* Service Cards */}
				<div className="grid gap-6 md:grid-cols-2">
					{services.map((service) => (
						<Card
							key={`${service.title} ${service.link}`}
							className="group relative overflow-hidden p-6 shadow-md transition-all hover:shadow-lg"
						>
							<div className="flex gap-6">
								{/* Left side - Image thumbnail */}
								<div className="flex-shrink-0">
									<Avatar>
										<AvatarImage
											src={service.image || "/placeholder.svg"}
											alt={m.common_brand_taaply_alt()}
										/>
										<AvatarFallback>{service.title.charAt(0)}</AvatarFallback>
									</Avatar>
								</div>

								{/* Middle - Content */}
								<div className="flex flex-1 flex-col justify-between">
									<div className="space-y-2">
										<h2 className="font-semibold text-foreground text-xl">
											{service.title}
										</h2>
										<p className="line-clamp-3 text-muted-foreground text-sm leading-relaxed">
											{service.description}
										</p>
									</div>

									{/* Statistics */}
									<div className="mt-4 flex items-center gap-6 text-muted-foreground text-sm">
										<div className="flex items-center gap-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<title>{m.common_icon_eye_title()}</title>
												<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
												<circle cx="12" cy="12" r="3" />
											</svg>
											<span>
												{m.services_stats_views({ count: service.views })}
											</span>
										</div>
										<div className="flex items-center gap-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<title>{m.common_icon_package_title()}</title>
												<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
												<polyline points="7 10 12 15 17 10" />
												<line x1="12" x2="12" y1="15" y2="3" />
											</svg>
											<span>
												{m.services_stats_usages({ count: service.usages })}
											</span>
										</div>
									</div>
								</div>

								{/* Right side - Preview image */}
								<div className="hidden flex-shrink-0 lg:block">
									<div className="relative h-32 w-48 overflow-hidden rounded-lg border border-border/50 bg-muted">
										<Image
											src={service.image || "/placeholder.svg"}
											alt={m.services_card_image_alt({ title: service.title })}
											fill
											className="object-cover transition-transform group-hover:scale-105"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										/>
									</div>
								</div>
							</div>

							{/* Learn more link overlay */}
							<a
								href={localizeHref(service.link)}
								className="absolute inset-0 z-10"
								aria-label={m.services_card_learn_more_aria({
									title: service.title,
								})}
							>
								<span className="sr-only">{m.common_action_learn_more()}</span>
							</a>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
