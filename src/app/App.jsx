import { useState } from "react";
import Header from "../components/Header/Header";
import CategoryTabs from "../components/CategoryTabs/CategoryTabs";
import MenuGrid from "../components/MenuGrid/MenuGrid";
import AppearanceSettings from "../components/AppearanceSettings/AppearanceSettings";
import translations from "../data/translations";

const defaultTheme = {
  page: "#f5f2ec",
  accent: "#a34e34",
  text: "#292a22",
  muted: "#77766d",
  surface: "#ffffff",
  border: "#e8e1d7",
  borderWidth: 1,
  headerStyle: "soft",
  font: '"Inter", "Segoe UI", Arial, sans-serif',
  radius: 20,
  imageHeight: 190,
  fontSize: 16,
  venueType: "restaurant",
};

function App() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState(defaultTheme);
  const t = translations;

  const themeStyle = {
    "--color-page": theme.page,
    "--color-accent": theme.accent,
    "--color-text": theme.text,
    "--color-muted": theme.muted,
    "--color-surface": theme.surface,
    "--color-surface-raised": theme.surface,
    "--color-border": theme.border,
    "--card-border-width": `${theme.borderWidth}px`,
    "--color-accent-dark": `color-mix(in srgb, ${theme.accent} 78%, #241812)`,
    "--font-family": theme.font,
    "--radius-card": `${theme.radius}px`,
    "--radius-control": `${Math.round(theme.radius * 0.7)}px`,
    "--card-image-height": `${theme.imageHeight}px`,
    "--menu-font-scale": theme.fontSize / 16,
  };

  return (
    <main className="app" style={themeStyle} data-header-style={theme.headerStyle}>
      <Header venueType={theme.venueType} t={t} />

      <div className="menu-controls">
        <input
          className="menu-search"
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder={t.searchPlaceholder}
          aria-label={t.searchAria}
        />
      </div>

      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        t={t}
      />

      <MenuGrid
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        t={t}
      />

      <AppearanceSettings
        theme={theme}
        onThemeChange={setTheme}
        onReset={() => setTheme(defaultTheme)}
        t={t}
      />
    </main>
  );
}

export default App;
