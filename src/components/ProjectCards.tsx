import "../styles/projectCards.css"
import useInView from "../hooks/useInView";

const projects = [
    {
        name: "Kasa",
        description: "Plateforme de réservation de logements en ligne.",
        url: "https://github.com/MatLecDev/Kasa-Locale",
        imagePath: "/projects/kasa.jpg",
        alt: "Écran d'accueil du site Kasa"
    },
    {
        name: "Abricot",
        description: "SaaS de gestion de tâches boostées à l'IA.",
        url: "https://github.com/MatLecDev/Abricot",
        imagePath: "/projects/abricot.jpg",
        alt: "Écran d'accueil du site Abricot"
    }
]

export default function ProjectCards() {
    const [sectionRef, isInView] = useInView<HTMLDivElement>(0.2);

    return(
        <section ref={sectionRef} className={`projectSection ${isInView ? 'projectSection--visible' : ''}`} id="projets">
            {projects.map((project) => (
                <a href={project.url} key={project.name}>
                    <article className="projectItem">
                        <img className="projectImage" src={project.imagePath} alt={project.alt} />
                        <div className="projectInfos">
                            <h2>{project.name}</h2>
                            <p>{project.description}</p>
                        </div>
                    </article>
                </a>
            ))}
        </section>
    )
}