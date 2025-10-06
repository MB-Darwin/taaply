import type React from "react";

const SolidLineIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		height={24}
		viewBox="0 0 24 24"
		width={24}
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M2.5 12L21.5002 12"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
		></path>
	</svg>
);

export default SolidLineIcon;
