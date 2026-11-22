import menu from "../../data/menu";
import cafe from "../../data/cafe";
import MenuCard from "../MenuCard/MenuCard";
import "./MenuGrid.css";

function normalize(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/ё/g, "е")
    .replace(/[’ʻʼ`]/g, "'")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function transliterateCyrillic(value) {
  const map = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo",
    ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m",
    н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u",
    ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "shch",
    ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
    ў: "o", қ: "q", ғ: "g", ҳ: "h",
  };

  return normalize(value).replace(/[а-яёўқғҳъыьэю]/g, (letter) => map[letter] ?? letter);
}

function matchesSearch(item, query) {
  if (!query) return true;

  const searchableText = normalize(
    [
      item.name,
      item.nameUz,
      item.description,
      item.descriptionUz,
      item.category,
      item.categoryUz,
      item.price,
      cafe.currency,
      ...(item.searchTerms ?? []),
    ].join(" ")
  );
  const searchableLatin = transliterateCyrillic(searchableText);
  const queryTokens = normalize(query).split(/\s+/).filter(Boolean);

  return queryTokens.every((token) => {
    const latinToken = transliterateCyrillic(token);
    return searchableText.includes(token) || searchableLatin.includes(latinToken);
  });
}

function MenuGrid({ activeCategory, searchQuery = "", t }) {
  const visibleItems = menu.filter((item) => {
    const matchesCategory =
      activeCategory === "Все" || item.category === activeCategory;

    return matchesCategory && matchesSearch(item, searchQuery);
  });

  return (
    <section className="menu-grid" aria-label={t.menuAria} aria-live="polite">
      {visibleItems.length > 0 ? (
        visibleItems.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            telegram={cafe.telegram}
            currency={cafe.currency}
            t={t}
          />
        ))
      ) : (
        <div className="menu-grid__empty">
          <span className="menu-grid__empty-icon" aria-hidden="true">⌕</span>
          <p>{t.noResults.replace("{query}", searchQuery.trim())}</p>
          <span>{t.noResultsHint}</span>
        </div>
      )}
    </section>
  );
}

export default MenuGrid;




