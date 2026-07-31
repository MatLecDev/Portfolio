import "../styles/header.css"

export default function Header(){
    return (
        <header>
            <nav>
                <a className="nav-link" href="#projets">Projets</a>
                <a className="nav-link" href="#contact">Contact</a>
            </nav>
        </header>
    );
}