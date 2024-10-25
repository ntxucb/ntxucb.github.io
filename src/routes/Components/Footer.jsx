import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faYoutube,
  faInstagram,
  faTiktok,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
import logo from "./Logos/LogoUIE.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={logo} alt="Logo" className="footer-logo" />
        <div className="footer-links">
          <a
            className="link-facebook"
            href="https://www.facebook.com/ntxucb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} /> Facebook
          </a>
          <a
            className="link-twitter"
            href="https://twitter.com/ntxucb?lang=es"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} /> Twitter
          </a>
          <a
            className="link-linkedin"
            href="https://bo.linkedin.com/company/neurotechucb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
          </a>
          <a
            className="link-instagram"
            href="https://www.instagram.com/neurotechucb/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} /> Instagram
          </a>
          <a
            className="link-youtube"
            href="https://www.youtube.com/channel/UCCg2IzkjD42ztbj930w8_kQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faYoutube} /> Youtube
          </a>
          <a
            className="link-tiktok"
            href="https://www.tiktok.com/@ntxucb?is_from_webapp=1&sender_device=pc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTiktok} /> TikTok
          </a>
          <a
            className="link-github"
            href="https://github.com/ntxucb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} /> Github
          </a>
        </div>
      </div>
      <p>
        &copy; UIE - Unidad de Investigación Experimental. We are a research
        center located at the Catholic Bolivian University (UCB). Copyright
        2021. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
