import "./CategoryTabs.css";

const categories = ["Все", "Салаты", "Напитки", "Блюда", "Десерты"];

function CategoryTabs({ activeCategory, onCategoryChange, t }) {
  return (
    <nav className="category-tabs" aria-label={t.categoriesAria}>
      {categories.map((category) => (
        <button
          key={category}
          className={`category-tabs__button ${activeCategory === category ? "category-tabs__button--active" : ""}`}
          type="button"
          aria-pressed={activeCategory === category}
          onClick={() => onCategoryChange(category)}
        >
          {t.categories[category]}
        </button>
      ))}
    </nav>
  );
}

export default CategoryTabs;
