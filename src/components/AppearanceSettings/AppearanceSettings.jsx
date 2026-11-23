import { useEffect, useState } from "react";
import "./AppearanceSettings.css";

const styles = ["premium", "luxury", "classic", "minimal", "cozy", "creative"];
const accentByStyle = { premium: "#a8874d", luxury: "#c5a66b", classic: "#79583b", minimal: "#646b67", cozy: "#a34e34", creative: "#a33b66" };
const palettes = {
  white: { page: "#f7f5f0", surface: "#ffffff", text: "#292822", muted: "#77746c", border: "#e7e3da" },
  black: { page: "#171715", surface: "#242320", text: "#f5f1e8", muted: "#b4afa3", border: "#45423b" },
};
const whiteStyleTones = {
  premium: { page: "#f3f1e9", surface: "#fcfbf7", border: "#e4dece" },
  luxury: { page: "#f0eee9", surface: "#faf9f5", border: "#ded8ca" },
  classic: { page: "#f3eee6", surface: "#fdfbf7", border: "#dfd4c5" },
  minimal: { page: "#f7f7f5", surface: "#ffffff", border: "#e5e7e5" },
  cozy: { page: "#f5eee5", surface: "#fffaf3", border: "#e8d9c8" },
  creative: { page: "#f5f0f5", surface: "#ffffff", border: "#e7dce7" },
};
const radiusByStyle = { premium: 13, luxury: 10, classic: 15, minimal: 9, cozy: 22, creative: 18 };
const fontByStyle = { premium: '"Inter", "Segoe UI", Arial, sans-serif', luxury: 'Georgia, "Times New Roman", serif', classic: 'Georgia, "Times New Roman", serif', minimal: '"Inter", "Segoe UI", Arial, sans-serif', cozy: '"Trebuchet MS", Arial, sans-serif', creative: '"Inter", "Segoe UI", Arial, sans-serif' };

function AppearanceSettings({ theme, onThemeChange, t }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState(theme);

  useEffect(() => {
    if (!isOpen) return undefined;
    function closeOnEscape(event) { if (event.key === "Escape") setIsOpen(false); }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  function openSettings() { setDraft(theme); setStep(1); setIsOpen(true); }
  function finish() {
    const colors = { ...palettes[draft.colorTheme], ...(draft.colorTheme === "white" ? whiteStyleTones[draft.menuStyle] : {}) };
    onThemeChange({ ...draft, ...colors, accent: accentByStyle[draft.menuStyle], headerStyle: draft.menuStyle === "luxury" ? "bold" : draft.venueType === "cafe" ? "soft" : "classic", radius: radiusByStyle[draft.menuStyle], font: fontByStyle[draft.menuStyle] });
    setIsOpen(false);
  }
  function choose(key, value) {
    setDraft((current) => ({ ...current, [key]: value, ...(key === "venueType" ? { menuStyle: value === "cafe" ? "cozy" : "creative" } : {}) }));
  }
  const venueOptions = [
    { id: "restaurant", label: t.restaurant, note: t.restaurantDescription },
    { id: "cafe", label: t.cafe, note: t.cafeDescription },
  ];
  const themeOptions = [
    { id: "black", label: t.blackTheme, note: t.blackThemeDescription },
    { id: "white", label: t.whiteTheme, note: t.whiteThemeDescription },
  ];

  return <>
    <button className="appearance-settings__trigger" type="button" aria-haspopup="dialog" aria-expanded={isOpen} onClick={openSettings}>
      <span className="appearance-settings__icon" aria-hidden="true">✦</span>{t.settingsButton}
    </button>
    {isOpen && <div className="appearance-settings__overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}>
      <section className="appearance-settings__dialog" role="dialog" aria-modal="true" aria-labelledby="appearance-title" data-step={step}>
        <header className="appearance-settings__heading">
          <div><p className="appearance-settings__eyebrow">{t.settingsEyebrow} · {step}/3</p><h2 id="appearance-title">{t.settingsTitle}</h2><p className="appearance-settings__subtitle">{step === 1 ? t.chooseVenue : step === 2 ? t.chooseColorTheme : t.chooseMenuStyle}</p></div>
          <button className="appearance-settings__close" type="button" aria-label={t.closeSettings} onClick={() => setIsOpen(false)}>×</button>
        </header>
        <div className="appearance-settings__progress" aria-hidden="true"><span style={{ width: `${step * 33.333}%` }} /></div>
        <div className="appearance-settings__body">
          {step === 1 && <fieldset className="appearance-settings__presets">
            <legend>{t.venueType}</legend>
            <div className="appearance-settings__preset-list">
              {venueOptions.map((option) => <button className={`appearance-settings__preset ${draft.venueType === option.id ? "is-selected" : ""}`} key={option.id} type="button" aria-pressed={draft.venueType === option.id} onClick={() => choose("venueType", option.id)}>
                <span className={`appearance-settings__venue-icon appearance-settings__venue-icon--${option.id}`} aria-hidden="true">{option.id === "restaurant" ? "✳" : "☕"}</span><span className="appearance-settings__preset-copy"><strong>{option.label}</strong><small>{option.note}</small></span><span className="appearance-settings__check" aria-hidden="true">✓</span>
              </button>)}
            </div>
          </fieldset>}
          {step === 2 && <fieldset className="appearance-settings__presets">
            <legend>{t.colorTheme}</legend>
            <div className="appearance-settings__preset-list">
              {themeOptions.map((option) => <button className={`appearance-settings__preset appearance-settings__theme-card ${draft.colorTheme === option.id ? "is-selected" : ""}`} key={option.id} type="button" aria-pressed={draft.colorTheme === option.id} onClick={() => choose("colorTheme", option.id)}>
                <span className={`appearance-settings__theme-preview appearance-settings__theme-preview--${option.id}`}><i /><i /><i /></span><span className="appearance-settings__preset-copy"><strong>{option.label}</strong><small>{option.note}</small></span><span className="appearance-settings__check" aria-hidden="true">✓</span>
              </button>)}
            </div>
          </fieldset>}
          {step === 3 && <fieldset className="appearance-settings__presets">
            <legend>{t.menuStyle}</legend>
            <div className="appearance-settings__preset-list appearance-settings__style-list">
              {styles.map((id) => <button className={`appearance-settings__preset ${draft.menuStyle === id ? "is-selected" : ""}`} key={id} type="button" aria-pressed={draft.menuStyle === id} onClick={() => choose("menuStyle", id)}>
                <span className="appearance-settings__swatch" style={{ background: accentByStyle[id] }} aria-hidden="true"/><span className="appearance-settings__preset-copy"><strong>{t[`style_${id}`]}</strong><small>{t[`style_${id}_description`]}</small></span><span className="appearance-settings__check" aria-hidden="true">✓</span>
              </button>)}
            </div>
          </fieldset>}
        </div>
        <footer className="appearance-settings__footer">
          {step > 1 ? <button className="appearance-settings__reset" type="button" onClick={() => setStep(step - 1)}>{t.back}</button> : <button className="appearance-settings__reset" type="button" onClick={() => setIsOpen(false)}>{t.cancel}</button>}
          {step < 3 ? <button className="appearance-settings__done" type="button" onClick={() => setStep(step + 1)}>{t.next}</button> : <button className="appearance-settings__done" type="button" onClick={finish}>{t.done}</button>}
        </footer>
      </section>
    </div>}
  </>;
}

export default AppearanceSettings;
