"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 *
 * @returns: En Cursor-komponent ...
 * @example: <Cursor />
 * @alias: Cursor
 * @summary: Denne komponent bruges til at ...
 * @version: 1.0.0
 * @property: [...]
 * @author: Kasper Buchholtz
 *
 **/


export default function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const mouse = { x: pos.x, y: pos.y };

        const updatePosition = () => {
            pos.x += (mouse.x - pos.x) * 0.15;
            pos.y += (mouse.y - pos.y) * 0.15;

            gsap.set(cursor, {
                x: pos.x,
                y: pos.y,
            });

            requestAnimationFrame(updatePosition);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, [role='button']")) {
                gsap.to(cursor, { scale: 1.69, duration: 0.2 });
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, [role='button']")) {
                gsap.to(cursor, { scale: 1, duration: 0.2 });
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);
        requestAnimationFrame(updatePosition);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-8 h-8 border-2 ease-power2-in bg-lights-0 rounded-full pointer-events-none z-[9999] mix-blend-difference translate-x-[-50%] translate-y-[-50%]"
        />
    );
}
