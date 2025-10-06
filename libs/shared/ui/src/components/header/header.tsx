"use client";

import React from "react";
import { cn } from "@taaply/utils";
import { Button } from "@taaply/ui";
import Link from "next/link";
import SolidLineIcon from "@taaply/assets/icons/solid-line-01-stroke-rounded";
import Image from "next/image";
import taaplyLogo from "@taaply/assets/images/taaply-logo.png";

const menuItems = [
	{ name: "Features", href: "#features" },
	{ name: "Solution", href: "#solution" },
	{ name: "Pricing", href: "#pricing" },
	{ name: "About", href: "#about" },
];

export const HeroHeader = () => {
	const [menuState, setMenuState] = React.useState(false);
	const [isScrolled, setIsScrolled] = React.useState(false);

	React.useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Close mobile menu on desktop resize
	React.useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setMenuState(false);
			}
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<header>
			<nav
				className="fixed z-20 w-full px-2"
				data-state={menuState && "active"}
			>
				<div
					className={cn(
						"mx-auto mt-2 max-w-7xl px-6 transition-all duration-300 lg:px-0",
						isScrolled &&
							"max-w-5xl rounded-2xl border bg-background/50 backdrop-blur-lg lg:px-5",
					)}
				>
					<div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
						{/* Logo */}
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

						{/* Desktop Navigation */}
						<nav className="hidden lg:flex lg:items-center lg:space-x-8">
							<ul className="flex items-center space-x-8">
								{menuItems.map((item) => (
									<li key={item.name}>
										<Link
											className={cn(
												"relative font-medium text-sm transition-colors",
												"text-muted-foreground hover:text-foreground",
												"after:-bottom-1 after:absolute after:left-0 after:h-0.5",
												"after:w-0 after:bg-primary after:transition-all",
												"hover:after:w-full",
											)}
											href={item.href}
										>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</nav>

						{/* Right side actions */}
						<div className="flex items-center space-x-2">
							{/* Desktop actions */}
							<div className="hidden lg:flex lg:items-center lg:space-x-4">
								{/*<ThemeToggle />*/}
								{/*<LanguageSwitcher />*/}
								<div className="flex items-center space-x-3">
									<Button variant="contained" size="sm" href="/book-demo">
										Book demo
									</Button>
									<Button variant="outline" size="sm" href="/get-started">
										Get started
									</Button>
								</div>
							</div>

							{/* Mobile actions */}
							<div className="flex items-center space-x-2 lg:hidden">
								{/*<ThemeToggle />*/}
								{/*<LanguageSwitcher />*/}
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
							</div>
						</div>
					</div>
				</div>

				{/* Mobile menu */}
				<div
					className={cn(
						"lg:hidden",
						"absolute top-full right-0 left-0",
						"transform transition-all duration-300 ease-in-out",
						menuState
							? "translate-y-0 opacity-100"
							: "-translate-iconsy-4 pointer-events-none opacity-0",
					)}
				>
					<div className="mx-4 mt-2 rounded-2xl border bg-background/95 shadow-lg backdrop-blur-xl">
						<div className="space-y-1 px-4 pt-2 pb-3">
							{menuItems.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className="block rounded-lg px-3 py-2 font-medium text-base text-muted-foreground hover:bg-accent hover:text-accent-foreground"
									onClick={() => setMenuState(false)}
								>
									{item.name}
								</Link>
							))}
						</div>
						<div className="border-t px-4 py-3">
							<div className="flex flex-col space-y-2">
								<div className="flex items-center space-x-2">
									<Button variant="contained" href="/book-demo">
										Book demo
									</Button>
									<Button variant="outline" href="/get-started">
										Get started
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};
