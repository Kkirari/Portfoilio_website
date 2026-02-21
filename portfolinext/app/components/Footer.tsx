export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container container grid">
                <ul className="footer__links">
                    <li>
                        <a href="#about" className="footer__link">About</a>
                    </li>
                    <li>
                        <a href="#projects" className="footer__link">Projects</a>
                    </li>
                    <li>
                        <a href="#certificate" className="footer__link">Certificate</a>
                    </li>
                </ul>

                <span className="footer__copy">
                    &#169; All Rights Reserved By{' '}
                    <a href="#">Kissanapong Yaset</a>
                </span>
            </div>
        </footer>
    )
}
