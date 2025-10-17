import type React from "react";

const MenuTwoLineIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		color={"#000000"}
		fill={"none"}
		height={24}
		viewBox="0 0 24 24"
		width={24}
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M4 9L20 9"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
		></path>
		<path
			d="M4 15L14 15"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
		></path>
	</svg>
);

export default MenuTwoLineIcon;
