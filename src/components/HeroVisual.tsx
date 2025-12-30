import createGlobe from "cobe";
import React, { useEffect, useRef } from "react";

// City coordinates [lat, long]
const LOCATIONS = [
    { location: [37.7595, -122.4367], size: 0.06 }, // SF
    { location: [40.7128, -74.006], size: 0.05 }, // NY
    { location: [51.5074, -0.1278], size: 0.05 }, // London
    { location: [1.3521, 103.8198], size: 0.05 }, // Singapore
    { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
    { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
    { location: [19.0760, 72.8777], size: 0.07 }, // Mumbai
    { location: [25.2048, 55.2708], size: 0.05 }, // Dubai
    { location: [52.5200, 13.4050], size: 0.05 }, // Berlin
    { location: [55.7558, 37.6173], size: 0.05 }, // Moscow
    { location: [-23.5505, -46.6333], size: 0.05 }, // Sao Paulo
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

        // Animation state for flying lines
        const bullets = [
            { start: 0, end: 2, t: 0 }, // SF -> London
            { start: 1, end: 7, t: 0.5 }, // NY -> Dubai
            { start: 4, end: 0, t: 0.2 }, // Tokyo -> SF
            { start: 6, end: 3, t: 0.7 }, // Mumbai -> Singapore
            { start: 3, end: 5, t: 0.1 }, // Singapore -> Sydney
        ];

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: widthRef.current * 2,
            height: widthRef.current * 2,
            phi: 0.3,
            theta: 0.3,
            dark: 0,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            // Matches #FAFAFA (250/255 = 0.98)
            baseColor: [0.98, 0.98, 0.98],
            // Orange-500 for markers
            markerColor: [249 / 255, 115 / 255, 22 / 255],
            // Matches background to remove outer circle line
            glowColor: [0.98, 0.98, 0.98],
            markers: [],
            onRender: (state: any) => {
                // Auto-rotation - increased speed ~1.3x (0.003 -> 0.004)
                if (!pointerInteracting.current) {
                    phi += 0.004;
                }
                state.phi = phi + phiRef.current;
                state.width = widthRef.current * 2;
                state.height = widthRef.current * 2;

                const currentMarkers: any[] = [...LOCATIONS];

                bullets.forEach(bullet => {
                    // Increased speed
                    bullet.t += 0.02;

                    if (bullet.t > 1) {
                        bullet.t = 0;
                        // Randomize route on complete
                        bullet.start = Math.floor(Math.random() * LOCATIONS.length);
                        bullet.end = Math.floor(Math.random() * LOCATIONS.length);
                        while (bullet.end === bullet.start) bullet.end = Math.floor(Math.random() * LOCATIONS.length);
                    }

                    const startLoc = LOCATIONS[bullet.start].location;
                    const endLoc = LOCATIONS[bullet.end].location;

                    // Interpolate
                    let startLat = startLoc[0];
                    let startLng = startLoc[1];
                    let endLat = endLoc[0];
                    let endLng = endLoc[1];

                    // Handle date line crossing for shortest path
                    if (endLng - startLng > 180) startLng += 360;
                    if (endLng - startLng < -180) startLng -= 360;

                    // Generate a dense line (stream of particles) to look like a solid line
                    const numParticles = 60; // Higher density
                    const trailLength = 0.15; // Length of the streak relative to total path

                    for (let i = 0; i < numParticles; i++) {
                        const progress = bullet.t - (i / numParticles) * trailLength;

                        // Only render if part of the path
                        if (progress >= 0 && progress <= 1) {
                            const lat = startLat + (endLat - startLat) * progress;
                            const lng = startLng + (endLng - startLng) * progress;

                            // Constant small size for thin line
                            currentMarkers.push({ location: [lat, lng], size: 0.015 });
                        }
                    }
                });

                state.markers = currentMarkers;
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