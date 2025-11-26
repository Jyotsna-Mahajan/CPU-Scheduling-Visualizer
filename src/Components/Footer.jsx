import "./Footer.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-title">© 2025 Jyotsna Mahajan. All Rights Reserved.</p>

      <div className="footer-links">
         <a href="mailto:jyotsnamahajan30@gmail.com" target="_blank" rel="noopener noreferrer">
          <SiGmail className="footer-icon" /></a>

          <a href="https://www.linkedin.com/in/jyotsnamahajan/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="footer-icon" /></a>

           <a href="https://github.com/Jyotsna-Mahajan" target="_blank" rel="noopener noreferrer">
          <FaGithub className="footer-icon" /></a>

      </div>

    </footer>
  );
}
