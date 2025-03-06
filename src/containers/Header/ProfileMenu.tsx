import React from "react";

const ProfileMenu = () => {
  return (
    <div className="dropdown me-3">
      <button
        className="btn btn-outline-light dropdown-toggle d-flex align-items-right"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ padding: 0, backgroundColor: "transparent", border: "none" }}
      >
        <img
          src="https://github.com/mdo.png"
          alt="User"
          width="40"
          height="40"
          className="rounded-circle"
        />
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <a className="dropdown-item" href="/my-products">
            My Products...
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/adverts/new">
            New Product
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/profile">
            Profile
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/settings">
            Settings
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <button className="dropdown-item" onClick={() => alert("Signed out")}>
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
