import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-borderColor p-4 flex items-center justify-center gap-2">
      <a
        href="https://github.com/chingu-voyages/v45-tier2-team-23"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub size={24} className="text-gray-600 hover:text-gray-900" />
      </a>
      <p className="text-gray-600 text-sm">
        &copy; {new Date().getFullYear()}
        <a
          className="underline p-1"
          href="https://www.chingu.io/"
          target="_blank"
        >
          Chingu
        </a>
        Voyage 45 Team 23
      </p>
    </footer>
  );
};

export default Footer;
