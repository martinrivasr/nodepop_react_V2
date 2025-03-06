
const LanguageSelector = () => {
  const languages = [
    { code: "es", name: "Español", icon: "/es.svg" },
    { code: "en", name: "Inglés", icon: "/en.svg" },
    { code: "fr", name: "Français", icon: "/fr.svg" },
  ];

  return (
 <div className="dropdown me-3 ">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Idioma
      </button>
      <ul className="dropdown-menu">
        {languages.map((lang) => (
          <li key={lang.code}>
            <button className="dropdown-item">
              <img
                src={lang.icon}
                alt={lang.name}
                style={{ width: "20px", marginRight: "10px" }}
              />
              {lang.name}
            </button>
          </li>
        ))}
      </ul>
    </div>

   
  );
};

export default LanguageSelector;
