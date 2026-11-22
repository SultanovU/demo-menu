import cafe from "../../data/cafe";
import "./Header.css";
import logo from "../../images/logo.jpg";

function Header({ venueType, t }) {
  return (
    <header className="cafe-header">
      <img className="cafe-header__logo" src={logo} alt="Velora logotipi" />

      <div className="cafe-header__info">
        <p className="cafe-header__eyebrow">{t.tagline}</p>
        <h1 className="cafe-header__title">{cafe.name}</h1>
        <p className="cafe-header__address">{t.address}</p>
        <a className="cafe-header__phone" href={`tel:${cafe.phone}`}>
          {t.call}: {cafe.phone}
        </a>
      </div>

      <div className="cafe-header__brand-note">
        <span>{t.headerSideEyebrow}</span>
        <strong>{t.headerSideTitle}</strong>
      </div>

      <span className="cafe-header__venue">
        {venueType === "restaurant" ? t.restaurant : t.cafe}
      </span>
    </header>
  );
}

export default Header;

