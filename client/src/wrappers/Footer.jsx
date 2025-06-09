import React from "react";
import "../styles/Footer.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showDeveloper, setShowDeveloper] = useState(false);
  const [showFollowUs, setShowFollowUs] = useState(false);

  const handleAbout = () => {
    if (showAbout) setShowAbout(false);
    else setShowAbout(true);
  };

  const handleDeveloer = () => {
    if (showDeveloper) setShowDeveloper(false);
    else setShowDeveloper(true);
  };

  const handleFollowUs = () => {
    if (showFollowUs) setShowFollowUs(false);
    else setShowFollowUs(true);
  };

  return (
    <footer className="footer custom-footer py-4 ">
      <div className="container p-4 text-center mt-2 ">
        <div className="row ">
          <div className="col-md-2 col-sm-6">
            <div type="button" className="about-btn" onClick={handleAbout}>
              <h6>About Us</h6>
            </div>

            {showAbout && (
              <p>
                A community for humanity, dedicated to reuniting missing people
                with their families.
              </p>
            )}
          </div>
          <div className="col-md-2 col-sm-6 quicklinks-btn">
            <h6>Quick Links</h6>
          </div>
          <div className="col-md-2 col-sm-6 contact-btn">
            <h6>Contact Us</h6>
          </div>
          <div className="col-md-2 col-sm-6">
            <div type="button" className="follow-btn" onClick={handleFollowUs}>
              <h6>Follow us</h6>
            </div>
            {showFollowUs && (
              <div className="list-unstyled">
                <li>
                  <FontAwesomeIcon icon={faLinkedin} />{" "}
                  <a
                    href="https://www.linkedin.com/in/jeeva-madhaiyan-090860107"
                    target="_blank"
                    className="link-underline link-underline-opacity-0 link-dark text-light"
                  >
                    LinkedIn
                  </a>
                </li>
              </div>
            )}
          </div>
          <div className="col-md-2 col-sm-6">
            <div type="button" className="dev-btn" onClick={handleDeveloer}>
              <h6>Developers </h6>
            </div>

            {showDeveloper && (
              <ul class="list-unstyled">
                <li>
                  <FontAwesomeIcon icon={faGithub} />{" "}
                  <a
                    href="https://github.com/jeelion22"
                    target="_blank"
                    className="link-underline link-underline-opacity-0 link-dark text-light"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            )}
          </div>
          <div className="col-md-2 policy-btn ">
            <h6>Policies</h6>
          </div>
        </div>
        <div className="row mt-4"></div>
        <div className="col-md-12 text-center">
          <p class="mb-0">
            &copy; {new Date().getUTCFullYear().toString()} ReUniteME. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
