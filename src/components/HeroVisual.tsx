import createGlobe from "cobe";
import React, { useEffect, useRef } from "react";

// City coordinates [lat, long]
const LOCATIONS = [
    { location: [37.7595, -122.4367], size: 0.08 }, // SF
    { location: [40.7128, -74.006], size: 0.08 }, // NY
    { location: [51.5074, -0.1278], size: 0.08 }, // London
    { location: [1.3521, 103.8198], size: 0.08 }, // Singapore
    { location: [35.6762, 139.6503], size: 0.08 }, // Tokyo
    { location: [-33.8688, 151.2093], size: 0.08 }, // Sydney
    { location: [19.0760, 72.8777], size: 0.08 }, // Mumbai
    { location: [25.2048, 55.2708], size: 0.08 }, // Dubai
    { location: [52.5200, 13.4050], size: 0.08 }, // Berlin
    { location: [55.7558, 37.6173], size: 0.08 }, // Moscow
    { location: [-23.5505, -46.6333], size: 0.08 }, // Sao Paulo
];

interface HeroVisualProps {
    className?: string;
}

const HeroVisual: React.FC<HeroVisualProps> = ({ className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef<number>(0);
    const phiRef = useRef<number>(0);
    const widthRef = useRef<number>(0);

    useEffect(() => {
        let phi = 0;
        if (!canvasRef.current) return;

        // Initial width capture
        widthRef.current = canvasRef.current.offsetWidth;
        const onResize = () => {
            if (canvasRef.current) {
                widthRef.current = canvasRef.current.offsetWidth;
            }
        };
        window.addEventListener('resize', onResize);

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: widthRef.current * 2,
            height: widthRef.current * 2,
            phi: 0.3,
            theta: 0.3,
            dark: 0,
            diffuse: 0.04,
            mapSamples: 16000,
            mapBrightness: 6,
            // Matches page-light-alt token #F2F5F8 (242/255, 245/255, 248/255)
            baseColor: [0.949, 0.961, 0.973],
            // Marker Color (User adjusted)
            markerColor: [25 / 255, 108 / 255, 143 / 255],
            // Set glowColor to background color to "remove" it visually (required property)
            glowColor: [0.949, 0.961, 0.973],
            markers: [],
            onRender: (state: any) => {
                // Auto-rotation - increased speed ~1.3x (0.003 -> 0.004)
                if (!pointerInteracting.current) {
                    phi += 0.004;
                }
                state.phi = phi + phiRef.current;
                state.width = widthRef.current * 2;
                state.height = widthRef.current * 2;
                state.markers = LOCATIONS;
            },
        });

        return () => {
            globe.destroy();
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <div className={`relative flex items-center justify-center w-full max-w-[600px] aspect-square group ${className || ''}`}>
            <canvas
                ref={canvasRef}
                className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-110 cursor-grab active:cursor-grabbing"
                style={{ width: '100%', height: '100%', contain: 'layout paint size' }}
                onPointerDown={(e) => {
                    pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
                }}
                onPointerUp={() => {
                    pointerInteracting.current = null;
                }}
                onPointerOut={() => {
                    pointerInteracting.current = null;
                }}
                onMouseMove={(e) => {
                    if (pointerInteracting.current !== null) {
                        const delta = e.clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta;
                        phiRef.current = delta / 200;
                    }
                }}
                onTouchMove={(e) => {
                    if (pointerInteracting.current !== null && e.touches[0]) {
                        const delta = e.touches[0].clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta;
                        phiRef.current = delta / 100;
                    }
                }}
            />
        </div>
    );
}

export default HeroVisual;
