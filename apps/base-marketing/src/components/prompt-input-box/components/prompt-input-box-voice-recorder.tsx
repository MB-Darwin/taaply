"use client";

import { cn } from "@taaply/utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePromptInputBox } from "../hooks/use-prompt-input-box";

export function PromptInputBoxVoiceRecorder({
	visualizerBars = 32,
}: {
	visualizerBars?: number;
}) {
	const { isRecording, onStartRecording, onStopRecording } =
		usePromptInputBox();
	const [time, setTime] = useState(0);
	const intervalRef = useRef<number | null>(null);
	const prevRef = useRef(isRecording);
	const lastTimeRef = useRef(0);

	useEffect(() => {
		lastTimeRef.current = time;
	}, [time]);

	useEffect(() => {
		const started = isRecording && !prevRef.current;
		const stopped = !isRecording && prevRef.current;

		if (started) {
			onStartRecording();
			intervalRef.current = window.setInterval(
				() => setTime((t) => t + 1),
				1000,
			);
		}
		if (stopped) {
			if (intervalRef.current) {
				window.clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
			onStopRecording(lastTimeRef.current);
			setTime(0);
		}
		prevRef.current = isRecording;

		return () => {
			if (intervalRef.current) {
				window.clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [isRecording, onStartRecording, onStopRecording]);

	const bars = useMemo(
		() =>
			Array.from({ length: visualizerBars }).map((_, i) => ({
				height: Math.max(15, Math.random() * 100),
				delay: i * 0.05,
				duration: 0.5 + Math.random() * 0.5,
			})),
		[visualizerBars],
	);

	const fmt = (s: number) => {
		const m = Math.floor(s / 60);
		const sec = s % 60;
		return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
	};

	return (
		<div
			className={cn(
				"flex w-full flex-col items-center justify-center py-4 transition-all duration-300",
				isRecording ? "opacity-100" : "h-0 opacity-0",
			)}
			aria-live="polite"
			aria-atomic="true"
		>
			<div className="mb-3 flex items-center gap-2">
				<div className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
				<span className="font-mono text-muted-foreground text-sm">
					{fmt(time)}
				</span>
			</div>
			<div className="flex h-12 w-full items-center justify-center gap-0.5 px-4">
				{bars.map((b, idx) => (
					<div
						key={`${b.height}-${b.duration}-${idx}`}
						className="h-full w-0.5 animate-pulse rounded-full bg-foreground/50"
						style={{
							height: `${b.height}%`,
							animationDelay: `${b.delay}s`,
							animationDuration: `${b.duration}s`,
						}}
					/>
				))}
			</div>
		</div>
	);
}
