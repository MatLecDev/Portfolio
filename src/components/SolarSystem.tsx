import '../styles/solarSystem.css';
import useInView from "../hooks/useInView";

interface TechItem {
    id: string;
    name: string;
    logo: string;
    ringSize: number;
    duration: number;
    direction: 'normal' | 'reverse';
    startAngle: number;
    ringIndex: "first-ring" | "second-ring" | "third-ring";
}

const technos: TechItem[] = [
    { id: 'react', name: 'React', logo: '/logos/react.png', ringSize: 30, duration: 15, direction: 'normal', startAngle: 0, ringIndex: "first-ring" },
    { id: 'nextjs', name: 'NextJS', logo: '/logos/next.png', ringSize: 30, duration: 15, direction: 'normal', startAngle: 120, ringIndex: "first-ring" },
    { id: 'jest', name: 'Jest', logo: '/logos/jest.jpg', ringSize: 30, duration: 15, direction: 'normal', startAngle: 240, ringIndex: "first-ring" },

    { id: 'html', name: 'HTML5', logo: '/logos/html.png', ringSize: 60, duration: 30, direction: 'reverse', startAngle: 0, ringIndex: "second-ring" },
    { id: 'css', name: 'CSS3', logo: '/logos/css.png', ringSize: 60, duration: 30, direction: 'reverse', startAngle: 72, ringIndex: "second-ring" },
    { id: 'sass', name: 'SASS', logo: '/logos/sass.png', ringSize: 60, duration: 30, direction: 'reverse', startAngle: 144, ringIndex: "second-ring" },
    { id: 'js', name: 'JavaScript', logo: '/logos/js.png', ringSize: 60, duration: 30, direction: 'reverse', startAngle: 216, ringIndex: "second-ring" },
    { id: 'ts', name: 'TypeScript', logo: '/logos/ts.png', ringSize: 60, duration: 30, direction: 'reverse', startAngle: 288, ringIndex: "second-ring" },

    { id: 'vercel', name: 'Vercel', logo: '/logos/vercel.png', ringSize: 90, duration: 45, direction: 'normal', startAngle: 0, ringIndex: "third-ring" },
    { id: 'git', name: 'Git', logo: '/logos/git.png', ringSize: 90, duration: 45, direction: 'normal', startAngle: 72, ringIndex: "third-ring" },
    { id: 'figma', name: 'Figma', logo: '/logos/figma.png', ringSize: 90, duration: 45, direction: 'normal', startAngle: 144, ringIndex: "third-ring" },
    { id: 'vscode', name: 'VSCode', logo: '/logos/vscode.png', ringSize: 90, duration: 45, direction: 'normal', startAngle: 216, ringIndex: "third-ring" },
    { id: 'webstorm', name: 'Webstorm', logo: '/logos/webstorm.png', ringSize: 90, duration: 45, direction: 'normal', startAngle: 288, ringIndex: "third-ring" }
];

export default function SolarSystem() {
    const [sectionRef, isInView] = useInView<HTMLDivElement>(0.2);
    const uniqueRingSizes = Array.from(new Set(technos.map((t) => t.ringSize)));

    return (
        <section ref={sectionRef}
                 className={`solar-system--wrapper ${isInView ? 'solar-system--visible' : ''}`}
        >
            <h2 className="solar-system__title">
                Mes technos :
            </h2>
            <article className="solar-system">
                <div className="solar-system__star" />

                {uniqueRingSizes.map((size) => (
                    <div
                        key={size}
                        className="orbit-ring"
                        style={{ width: `${size}%`, height: `${size}%` }}
                    />
                ))}

                {technos.map((tech) => (
                    <div
                        key={tech.id}
                        className="orbit-wrapper"
                        style={
                            {
                                width: `${tech.ringSize}%`,
                                height: `${tech.ringSize}%`,
                                '--duration': `${tech.duration}s`,
                                '--direction': tech.direction,
                                '--start-angle': `${tech.startAngle}deg`,
                            } as React.CSSProperties
                        }
                    >
                        <div
                            className="orbit-satellite"
                            style={
                                {
                                    '--duration': `${tech.duration}s`,
                                    '--direction': tech.direction,
                                    '--start-angle': `${tech.startAngle}deg`,
                                } as React.CSSProperties
                            }
                        >
                            <img
                                src={tech.logo}
                                alt={tech.name}
                                className={"orbit-logo " + tech.ringIndex}
                            />
                        </div>
                    </div>
                ))}
            </article>
        </section>
    );
};