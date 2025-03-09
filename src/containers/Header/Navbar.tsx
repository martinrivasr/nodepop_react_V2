import MenuItems from "./Navlinks";
import LanguageSelector from "./LanguageSelector";
import ProfileMenu from "./ProfileMenu";
import AuthButton from "../../auth/AuthButton"
import { useAppSelector } from "../../store";
import { getIslogged } from "../../store/selectors";


const Navbar = () => {
  const { isLogged } = useAppSelector(getIslogged) 

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark px-3 border-warning border-4">
      <div className="container-fluid d-flex align-items-center justify-content-between border-success border-4">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center " href="/">
          <i className="bi bi-house fs-3 me-2"></i>
          Nodepop
        </a>

        {/* Menú principal */}
        {isLogged && (
          <div className="d-flex align-items-center ms-auto ">
            <MenuItems />
          </div>
        )}

        {/* Selector de idioma */}
        <div className="ms-3">
          <LanguageSelector />
        </div>

        {/* Menú de perfil */}
        {isLogged && (
          <div className="d-flex align-items-center ms-3">
            <ProfileMenu />
          </div>
        )}
        <AuthButton />
      </div>
    </header>
  );
};

export default Navbar;
