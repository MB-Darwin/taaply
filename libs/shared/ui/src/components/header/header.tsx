"use client";

import SolidLineIcon from "@taaply/assets/icons/solid-line-01-stroke-rounded";
import taaplyLogo from "@taaply/assets/images/taaply-logo.png";
import { cn } from "@taaply/utils";
import { useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../button";
import { LanguageSwitcher } from "../lang-switcher/lang-switcher";

const menuItems = [
	{ name: "Service", href: "#link" },
	{ name: "Smart shop", href: "#link" },
	{ name: "Locations", href: "#link" },
	{ name: "Contact us", href: "#link" },
];

export const HeroHeader = () => {
	const [menuState, setMenuState] = React.useState(false);
	const [scrolled, setScrolled] = React.useState(false);

	const { scrollYProgress } = useScroll();

	React.useEffect(() => {
		const unsubscribe = scrollYProgress.on("change", (latest) => {
			setScrolled(latest > 0.05);
		});
		return () => unsubscribe();
	}, [scrollYProgress]);

	return (
		<header>
			<nav
				className="fixed z-20 w-full px-2"
				data-state={menuState && "active"}
			>
				<div
					className={cn(
						"mx-auto mt-2 max-w-7xl px-6 transition-all duration-300 lg:px-0",
						scrolled &&
							"max-w-5xl rounded-2xl border bg-background/50 backdrop-blur-lg lg:px-5",
					)}
				>
					<div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
						<div className="flex w-full items-center justify-between gap-12 lg:w-auto">
							<div className="flex items-center">
								<Link
									aria-label="home"
									className="flex items-center space-x-2 transition-transform hover:scale-105"
									href="/"
								>
									{/*<Logo />*/}
									<Image src={taaplyLogo} alt="logo" width={100} height={25} />
								</Link>
							</div>

							<button
								type="button"
								aria-label={menuState ? "Close Menu" : "Open Menu"}
								className="-m-2.5 -mr-4 relative z-20 block cursor-pointer p-2.5 lg:hidden"
								onClick={() => setMenuState(!menuState)}
							>
								<SolidLineIcon
									className="menu-line m-auto"
									style={{
										transform: menuState
											? "translateY(4px) rotate(45deg)"
											: "none",
									}}
								/>
								<SolidLineIcon
									className="menu-line -mt-4 m-auto"
									style={{
										transform: menuState
											? "translateY(-4px) rotate(-45deg)"
											: "none",
									}}
								/>
							</button>

							<div className="hidden lg:block">
								<ul className="flex gap-8 text-sm">
									{menuItems.map((item, index) => (
										<li key={`menu-item-${index}`}>
											<Link
												href={item.href}
												className="block text-muted-foreground duration-150 hover:text-accent-foreground"
											>
												<span>{item.name}</span>
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="mb-6 in-data-[state=active]:block hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border bg-background p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:in-data-[state=active]:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
							<div className="lg:hidden">
								<ul className="space-y-6 text-base">
									{menuItems.map((item, index) => (
										<li key={index}>
											<Link
												href={item.href}
												className="block text-muted-foreground duration-150 hover:text-accent-foreground"
											>
												<span>{item.name}</span>
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
								<LanguageSwitcher />
								<Button variant="outline" color="inherit" href="#">
									Log in
								</Button>
								<Button color="inherit" href="#">
									Get started
								</Button>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};
