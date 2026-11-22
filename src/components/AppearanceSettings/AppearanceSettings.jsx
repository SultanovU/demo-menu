import { useEffect, useState } from "react";
import "./AppearanceSettings.css";

const presets = [
  {
    nameKey: "presetCafe",
    descriptionKey: "presetCafeDescription",
    values: {
      page: "#f6f0e6", accent: "#a34e34", text: "#302820", muted: "#777064", surface: "#fffdf9",
      border: "#e8dacb", borderWidth: 1, headerStyle: "soft", venueType: "cafe",
      font: '"Inter", "Segoe UI", Arial, sans-serif', radius: 22, imageHeight: 190, fontSize: 16,
    },
  },
  {
    nameKey: "presetFamily",
    descriptionKey: "presetFamilyDescription",
    values: {
      page: "#f3f2e9", accent: "#648052", text: "#2d3329", muted: "#73786a", surface: "#fffefa",
      border: "#dfe3d4", borderWidth: 1, headerStyle: "classic", venueType: "restaurant",
      font: '"Trebuchet MS", Arial, sans-serif', radius: 20, imageHeight: 190, fontSize: 16,
    },
  },
  {
    nameKey: "presetClassicRestaurant",
    descriptionKey: "presetClassicRestaurantDescription",
    values: {
      page: "#f3efe6", accent: "#76553a", text: "#302920", muted: "#776c5e", surface: "#fffdf8",
      border: "#dfd4c5", borderWidth: 1, headerStyle: "classic", venueType: "restaurant",
      font: 'Georgia, "Times New Roman", serif', radius: 14, imageHeight: 200, fontSize: 16,
    },
  },
  {
    nameKey: "presetPremium",
    descriptionKey: "presetPremiumDescription",
    values: {
      page: "#eeece5", accent: "#8b7444", text: "#252722", muted: "#76736a", surface: "#fbfaf6",
      border: "#d8d2c4", borderWidth: 1, headerStyle: "classic", venueType: "restaurant",
      font: '"Inter", "Segoe UI", Arial, sans-serif', radius: 12, imageHeight: 210, fontSize: 17,
    },
  },
  {
    nameKey: "presetLuxury",
    descriptionKey: "presetLuxuryDescription",
    values: {
      page: "#211f1b", accent: "#c4a66a", text: "#f4eee2", muted: "#b9b1a3", surface: "#302d27",
      border: "#51483a", borderWidth: 1, headerStyle: "bold", venueType: "restaurant",
      font: 'Georgia, "Times New Roman", serif', radius: 10, imageHeight: 220, fontSize: 17,
    },
  },
  {
    nameKey: "presetKhorezm",
    descriptionKey: "presetKhorezmDescription",
    values: {
      page: "#f4eee1", accent: "#873f2c", text: "#30271e", muted: "#776650", surface: "#fffaf0",
      border: "#e4d4bd", borderWidth: 2, headerStyle: "soft", venueType: "restaurant",
      font: 'Georgia, "Times New Roman", serif', radius: 24, imageHeight: 200, fontSize: 16,
    },
  },
];

function AppearanceSettings({ theme, onThemeChange, onReset, t }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    function closeOnEscape(event) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  function updateTheme(key, value) {
    onThemeChange((currentTheme) => ({ ...currentTheme, [key]: value }));
  }

  function applyPreset(values) {
    onThemeChange((currentTheme) => ({ ...currentTheme, ...values }));
  }

  return (
    <>
      <button
        className="appearance-settings__trigger"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <span className="appearance-settings__icon" aria-hidden="true">✦</span>
        {t.settingsButton}
      </button>

      {isOpen && (
        <div
          className="appearance-settings__overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <section
            className="appearance-settings__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="appearance-title"
          >
            <header className="appearance-settings__heading">
              <div>
                <p className="appearance-settings__eyebrow">{t.settingsEyebrow}</p>
                <h2 id="appearance-title">{t.settingsTitle}</h2>
                <p className="appearance-settings__subtitle">
                  {t.settingsSubtitle}
                </p>
              </div>
              <button
                className="appearance-settings__close"
                type="button"
                aria-label={t.closeSettings}
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </header>

            <div className="appearance-settings__body">
              <fieldset className="appearance-settings__presets">
                <legend>{t.quickThemes}</legend>
                <div className="appearance-settings__preset-list">
                  {presets.map((preset) => (
                    <button
                      className="appearance-settings__preset"
                      key={preset.nameKey}
                      type="button"
                      onClick={() => applyPreset(preset.values)}
                    >
                      <span
                        className="appearance-settings__swatch"
                        style={{ background: preset.values.accent }}
                        aria-hidden="true"
                      />
                      <span className="appearance-settings__preset-copy">
                        <strong>{t[preset.nameKey]}</strong>
                        <small>{t[preset.descriptionKey]}</small>
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="appearance-settings__grid">
                <label className="appearance-settings__field appearance-settings__color-field">
                  <span>{t.pageBackground}</span>
                  <input type="color" value={theme.page} onChange={(event) => updateTheme("page", event.target.value)} />
                </label>

                <label className="appearance-settings__field appearance-settings__color-field">
                  <span>{t.accentColor}</span>
                  <input type="color" value={theme.accent} onChange={(event) => updateTheme("accent", event.target.value)} />
                </label>

                <label className="appearance-settings__field appearance-settings__color-field">
                  <span>{t.textColor}</span>
                  <input type="color" value={theme.text} onChange={(event) => updateTheme("text", event.target.value)} />
                </label>

                <label className="appearance-settings__field appearance-settings__color-field">
                  <span>{t.cardBackground}</span>
                  <input type="color" value={theme.surface} onChange={(event) => updateTheme("surface", event.target.value)} />
                </label>

                <label className="appearance-settings__field appearance-settings__color-field">
                  <span>{t.borderColor}</span>
                  <input type="color" value={theme.border} onChange={(event) => updateTheme("border", event.target.value)} />
                </label>
              </div>

              <div className="appearance-settings__selects">
                <label className="appearance-settings__field">
                  <span>{t.venueType}</span>
                  <select value={theme.venueType} onChange={(event) => updateTheme("venueType", event.target.value)}>
                    <option value="restaurant">{t.restaurant}</option>
                    <option value="cafe">{t.cafe}</option>
                  </select>
                </label>
                <label className="appearance-settings__field">
                  <span>{t.headerStyle}</span>
                  <select value={theme.headerStyle} onChange={(event) => updateTheme("headerStyle", event.target.value)}>
                    <option value="soft">{t.headerSoft}</option>
                    <option value="classic">{t.headerClassic}</option>
                    <option value="bold">{t.headerBold}</option>
                  </select>
                </label>

                <label className="appearance-settings__field">
                  <span>{t.font}</span>
                  <select value={theme.font} onChange={(event) => updateTheme("font", event.target.value)}>
                    <option value='"Inter", "Segoe UI", Arial, sans-serif'>{t.fontModern}</option>
                    <option value='Georgia, "Times New Roman", serif'>{t.fontClassic}</option>
                    <option value='"Trebuchet MS", Arial, sans-serif'>{t.fontSoft}</option>
                    <option value='Arial, sans-serif'>{t.fontNeutral}</option>
                  </select>
                </label>
              </div>

              <div className="appearance-settings__ranges">
                <label className="appearance-settings__range-field">
                  <span>{t.borderWidth} <b>{theme.borderWidth}px</b></span>
                  <input type="range" min="0" max="3" step="1" value={theme.borderWidth} onChange={(event) => updateTheme("borderWidth", Number(event.target.value))} />
                </label>

                <label className="appearance-settings__range-field">
                  <span>{t.cardRadius} <b>{theme.radius}px</b></span>
                  <input type="range" min="8" max="30" step="2" value={theme.radius} onChange={(event) => updateTheme("radius", Number(event.target.value))} />
                </label>

                <label className="appearance-settings__range-field">
                  <span>{t.photoHeight} <b>{theme.imageHeight}px</b></span>
                  <input type="range" min="130" max="280" step="10" value={theme.imageHeight} onChange={(event) => updateTheme("imageHeight", Number(event.target.value))} />
                </label>

                <label className="appearance-settings__range-field">
                  <span>{t.textSize} <b>{theme.fontSize}px</b></span>
                  <input type="range" min="14" max="20" step="1" value={theme.fontSize} onChange={(event) => updateTheme("fontSize", Number(event.target.value))} />
                </label>
              </div>
            </div>

            <footer className="appearance-settings__footer">
              <p>{t.settingsNote}</p>
              <div>
                <button className="appearance-settings__reset" type="button" onClick={onReset}>
                  {t.reset}
                </button>
                <button className="appearance-settings__done" type="button" onClick={() => setIsOpen(false)}>
                  {t.done}
                </button>
              </div>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}

export default AppearanceSettings;






