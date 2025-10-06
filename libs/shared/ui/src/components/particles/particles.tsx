"use client";

import type React from "react";
import { useEffect, useRef } from "react";

/* Particles component */
type Direction = 1 | -1;

type ParticlesProps = {
	directionRef: React.MutableRefObject<Direction>;
	count?: number;
	colors?: string | string[];
	glow?: boolean;
	blendMode?: GlobalCompositeOperation;
};

export function Particles({
	directionRef,
	count,
	colors = "#6366F1",
	glow = true,
	blendMode = "lighter",
}: ParticlesProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const rafRef = useRef<number | null>(null);
	const resizeRef = useRef<ResizeObserver | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current!;
		const parent = canvas.parentElement!;
		const ctx = canvas.getContext("2d", { alpha: true })!;
		let width = 0;
		let height = 0;
		let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

		const palette = Array.isArray(colors)
			? colors.length
				? colors
				: ["#6366F1"]
			: [colors];

		type P = {
			x: number;
			y: number;
			vx: number;
			vy: number;
			r: number;
			a: number;
			c: string;
		};
		let particles: P[] = [];

		const autoCountForArea = (w: number, h: number) => {
			const area = w * h;
			return Math.max(30, Math.min(140, Math.floor(area / 9000)));
		};

		const seed = (target: number) => {
			particles = new Array(target).fill(0).map(() => {
				const speed = 0.15 + Math.random() * 0.35;
				const theta = Math.random() * Math.PI * 2;
				return {
					x: Math.random() * width,
					y: Math.random() * height,
					vx: Math.cos(theta) * speed,
					vy: Math.sin(theta) * speed,
					r: 1 + Math.random() * 2.2,
					a: 0.2 + Math.random() * 0.5,
					c: palette[Math.floor(Math.random() * palette.length)],
				};
			});
		};

		const resize = () => {
			const { clientWidth, clientHeight } = parent;
			width = clientWidth;
			height = clientHeight;
			dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
			canvas.width = Math.max(1, Math.floor(width * dpr));
			canvas.height = Math.max(1, Math.floor(height * dpr));
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			const targetCount =
				typeof count === "number" && count >= 0
					? count
					: autoCountForArea(width, height);
			seed(targetCount);
		};

		resize();
		resizeRef.current = new ResizeObserver(resize);
		resizeRef.current.observe(parent);

		const step = () => {
			rafRef.current = requestAnimationFrame(step);
			ctx.clearRect(0, 0, width, height);

			const bias = directionRef.current === 1 ? -0.03 : 0.03;

			ctx.save();
			ctx.globalCompositeOperation = blendMode;

			for (let i = 0; i < particles.length; i++) {
				const p = particles[i];

				p.x += p.vx + bias;
				p.y += p.vy;

				if (p.x < -5) p.x = width + 5;
				else if (p.x > width + 5) p.x = -5;
				if (p.y < -5) p.y = height + 5;
				else if (p.y > height + 5) p.y = -5;

				ctx.beginPath();
				ctx.globalAlpha = p.a;
				ctx.fillStyle = p.c;
				if (glow) {
					ctx.shadowColor = p.c;
					ctx.shadowBlur = 8;
				} else {
					ctx.shadowBlur = 0;
				}
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fill();
			}

			ctx.restore();
		};

		step();

		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			if (resizeRef.current) resizeRef.current.disconnect();
		};
	}, [directionRef, count, colors, glow, blendMode]);

	return (
		<canvas
			ref={canvasRef}
			className="-z-10 pointer-events-none absolute inset-0"
		/>
	);
}
