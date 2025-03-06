
import { Link } from "react-router-dom";

const MenuItems = () => {
  const links = [
    { to: "/adverts", label: "Home", icon: "bi-house", color: "text-white" },
    { to: "/dashboard", label: "Dashboard", icon: "bi-speedometer2", color: "text-primary" },
    { to: "/products", label: "Products", icon: "bi-grid", color: "text-success" },
    { to: "/customers", label: "Customers", icon: "bi-person-circle", color: "text-warning" },
    { to: "/adverts/new", label: "New Nuevo anuncio", icon: "bi-table", color: "text-secondary" },
  ];

  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
      {links.map((link) => (
        <li key={link.to} className="nav-item">
          <Link to={link.to} className={`nav-link ${link.color}`}>
            <i className={`bi ${link.icon} d-flex flex-column align-items-center fs-3`}></i> {link.label}
          </Link>
        </li>
      ))}
    </ul>

  );
};

export default MenuItems;
