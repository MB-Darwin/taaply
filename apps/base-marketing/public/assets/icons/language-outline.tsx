import type { SVGProps } from "react";

export function LanguageOutline(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			height="1em"
			viewBox="0 0 512 512"
			width="1em"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M48 112h288M192 64v48m80 336l96-224l96 224m-162.5-64h133M281.3 112S257 206 199 277S80 384 80 384"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={24}
			></path>
			<path
				d="M256 336s-35-27-72-75s-56-85-56-85"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={24}
			></path>
		</svg>
	);
}
