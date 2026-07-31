import "../styles/footer.css"

export default function Footer(){
    return(
        <footer className="footer">
            <p>© Mathéo LECLERCQ - Tous droits réservés</p>
            <div className="icons">
                <a href="https://github.com/MatLecDev">
                    <img src="/icons/github.png" alt="GitHub" />
                </a>
                <a
                    href="/CV-dev.pdf"
                    download="Mathéo-LECLERCQ-CV.pdf"
                    aria-label="Télécharger mon CV"
                >
                    <img src="/icons/cv.png" alt="CV"/>
                </a>
            </div>
        </footer>
    )
}