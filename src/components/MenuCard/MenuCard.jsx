import "./MenuCard.css";

function MenuCard({ item, telegram, currency, t }) {
  const formattedPrice = item.price.toLocaleString("uz-UZ");
  const draftMessage = `Assalomu alaykum! ${item.nameUz} — ${formattedPrice} ${currency}. Buyurtma bermoqchiman.`;
  const telegramUrl = telegram
    ? `https://t.me/${telegram.replace(/^@/, "")}?text=${encodeURIComponent(draftMessage)}`
    : null;

  function showImageFallback(event) {
    const media = event.currentTarget.parentElement;
    event.currentTarget.remove();
    media?.classList.add("menu-card__media--fallback");
  }

  return (
    <article className="menu-card">
      <div className="menu-card__media" data-fallback="Taom rasmi">
        <img
          className="menu-card__image"
          src={item.image}
          alt={item.nameUz}
          loading="lazy"
          onError={showImageFallback}
        />
        <span className="menu-card__category">{item.categoryUz}</span>
        {!item.available && <span className="menu-card__unavailable">{t.unavailable}</span>}
      </div>

      <div className="menu-card__content">
        <h2 className="menu-card__name">{item.nameUz}</h2>
        <p className="menu-card__description">{item.descriptionUz}</p>

        <div className="menu-card__footer">
          <p className="menu-card__price">
            <span className="menu-card__price-value">{formattedPrice}</span>
            <span className="menu-card__currency">{currency}</span>
          </p>

          {item.available && telegramUrl ? (
            <a
              className="menu-card__order"
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.orderAria.replace("{name}", item.nameUz)}
            >
              {t.order} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="menu-card__sold-out">{t.soon}</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default MenuCard;
