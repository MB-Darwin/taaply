import type React from "react";

const MultiplicationSignIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
			d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
		></path>
	</svg>
);

export default MultiplicationSignIcon;
