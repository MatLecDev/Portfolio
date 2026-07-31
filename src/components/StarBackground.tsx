import { useRef, useEffect, FC } from 'react';

interface Star {
    x: number;
    y: number;
    radius: number;
    baseOpacity: number;
    twinkleSpeed: number;
    twinklePhase: number;
}

interface StarBackgroundProps {
    starCount?: number;
}

export default function StarBackground({ starCount = 150 }: StarBackgroundProps){
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let stars: Star[] = [];

        function resize(): void {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createStars(): void {
            if (!canvas) return;
            stars = Array.from({ length: starCount }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                baseOpacity: Math.random() * 0.5 + 0.3,
                twinkleSpeed: Math.random() * 0.01,
                twinklePhase: Math.random() * Math.PI * 2,
            }));
        }

        function draw(time: number): void {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';

            stars.forEach((star) => {
                const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
                const opacity = star.baseOpacity + twinkle * 0.3;

                ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            animationId = requestAnimationFrame(draw);
        }

        const handleResize = (): void => {
            resize();
            createStars();
        };

        resize();
        createStars();
        animationId = requestAnimationFrame(draw);

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, [starCount]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
            }}
        />
    );
};