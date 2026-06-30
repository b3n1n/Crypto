import React, { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import "./LanguageSwitcher.css";

const languages = [
  {
    code: "en",
    name: "English",
    flag: "🇬🇧",
  },
  {
    code: "ru",
    name: "Русский",
    flag: "🇷🇺",
  },
  {
    code: "ua",
    name: "Українська",
    flag: "🇺🇦",
  },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);

  const current =
    languages.find((l) => l.code === i18n.language) || languages[0];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);

    localStorage.setItem("language", lang);

    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="language-dropdown" ref={wrapperRef}>
      <button className="language-button" onClick={() => setOpen(!open)}>
        <span className="language-flag">{current.flag}</span>

        <span className="language-name">{current.name}</span>

        <span className={`language-arrow ${open ? "open" : ""}`}>▼</span>
      </button>

      {open && (
        <div className="language-menu">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`language-item ${
                current.code === language.code ? "active" : ""
              }`}
              onClick={() => changeLanguage(language.code)}
            >
              <span>{language.flag}</span>

              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
