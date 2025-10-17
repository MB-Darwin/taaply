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
import { useState } from "react";

const categories = [
	"Explore",
	"Business",
	"Networking",
	".Gov",
	"Education",
	"Health Care",
	"Identity",
	"Fintech",
];

const services = [
	{
		title: "Taaply MS - Merchant Services",
		description:
			"Taaply MS helps businesses go digital with their unique website. From restaurants to local shops, Taaply MS empowers merchants to showcase products, engage customers, and grow their business online.",
		image: "/professional-businessman-in-suit-smiling.jpg",
		link: "#",
		views: "1,234",
		usages: "567",
	},
	{
		title: "Taaply SALSM - Education Platform",
		description:
			"A digital platform designed to help schools modernize learning, streamline administration, and connect students, teachers, and parents in one simple system.",
		image: "/smiling-woman-student-holding-books.jpg",
		link: "#",
		views: "2,891",
		usages: "1,023",
	},
];

export function ServicesSection() {
	const [activeCategory, setActiveCategory] = useState("Explore");

	return (
		<section className="mb-16 w-full px-4 md:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				{/* Header */}
				<div className="mb-8 flex items-center justify-between">
					<h1 className="font-bold text-3xl text-foreground">Services</h1>
				</div>

				{/* Navigation */}
				<div className="mb-8 flex items-center justify-between gap-4">
					{/* Mobile Dropdown */}
					<div className="md:hidden">
						<Select value={activeCategory} onValueChange={setActiveCategory}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Popular" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Popular">Popular</SelectItem>
								{categories.map((category) => (
									<SelectItem key={category} value={category}>
										{category}
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
							Popular
							<ChevronDown className="h-4 w-4" />
						</Button>
						{categories.map((category) => (
							<Button
								key={category}
								variant={"text"}
								appearance="ghost"
								color={"inherit"}
								onClick={() => setActiveCategory(category)}
								className={
									activeCategory === category
										? "text-foreground"
										: "text-muted-foreground hover:text-foreground"
								}
							>
								{category}
							</Button>
						))}
					</div>

					{/* View All Link */}
					<Button appearance="ghost" color={"inherit"}>
						View All
					</Button>
				</div>

				{/* Service Cards */}
				<div className="grid gap-6 md:grid-cols-2">
					{services.map((service, index) => (
						<Card
							key={index}
							className="group relative overflow-hidden p-6 shadow-lg transition-all hover:shadow-xl"
						>
							<div className="flex gap-6">
								{/* Left side - Image thumbnail */}
								<div className="flex-shrink-0">
									<Avatar>
										<AvatarImage
											src={service.image || "/placeholder.svg"}
											alt="Taaply"
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
												<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
												<circle cx="12" cy="12" r="3" />
											</svg>
											<span>{service.views} views</span>
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
												<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
												<polyline points="7 10 12 15 17 10" />
												<line x1="12" x2="12" y1="15" y2="3" />
											</svg>
											<span>{service.usages} usages</span>
										</div>
									</div>
								</div>

								{/* Right side - Preview image */}
								<div className="hidden flex-shrink-0 lg:block">
									<div className="h-32 w-48 overflow-hidden rounded-lg border border-border/50 bg-muted">
										<img
											src={service.image || "/placeholder.svg"}
											alt={`${service.title} preview`}
											className="h-full w-full object-cover transition-transform group-hover:scale-105"
										/>
									</div>
								</div>
							</div>

							{/* Learn more link overlay */}
							<a
								href={service.link}
								className="absolute inset-0 z-10"
								aria-label={`Learn more about ${service.title}`}
							>
								<span className="sr-only">Learn more</span>
							</a>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
