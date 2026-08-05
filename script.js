const area = document.getElementById("products");
const empty = document.getElementById("empty-message");
const filters = document.getElementById("brand-filters");
const search = document.getElementById("search-input");
const sort = document.getElementById("sort-select");
const menu = document.querySelector(".menu-button");
const nav = document.getElementById("site-nav");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

const products = Array.isArray(window.SHARK_PRODUCTS)
  ? window.SHARK_PRODUCTS
  : [];

let selected = "すべて";

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function priceNumber(value) {
  return Number(String(value ?? "").replace(/[^0-9]/g, "")) || 0;
}

function renderFilters() {
  const brands = ["すべて", ...new Set(products.map((p) => p.brand).filter(Boolean))];

  filters.innerHTML = brands.map((brand) => `
    <button
      type="button"
      class="filter-button ${brand === selected ? "is-active" : ""}"
      data-brand="${esc(brand)}"
    >${esc(brand)}</button>
  `).join("");

  filters.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      selected = button.dataset.brand;
      renderFilters();
      renderProducts();
    });
  });
}

function getProducts() {
  const keyword = search.value.trim().toLowerCase();

  const list = products.filter((product) => {
    const matchesBrand = selected === "すべて" || product.brand === selected;
    const text = [
      product.name,
      product.brand,
      product.year,
      product.description
    ].join(" ").toLowerCase();

    return matchesBrand && text.includes(keyword);
  });

  return [...list].sort((a, b) => {
    switch (sort.value) {
      case "price-asc":
        return priceNumber(a.price) - priceNumber(b.price);
      case "price-desc":
        return priceNumber(b.price) - priceNumber(a.price);
      case "name":
        return String(a.name).localeCompare(String(b.name), "ja");
      default:
        return String(b.sortDate || "").localeCompare(String(a.sortDate || ""));
    }
  });
}

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

function renderProducts() {
  const list = getProducts();
  empty.hidden = list.length !== 0;

  area.innerHTML = list.map((product) => {
    const index = products.indexOf(product);
    const soldClass = product.status === "SOLD OUT" ? "sold" : "";

    return `
      <article class="card">
        <span class="status-badge ${soldClass}">${esc(product.status || "販売中")}</span>

        <button
          type="button"
          class="card-image-link"
          data-src="${esc(product.image)}"
          data-alt="${esc(product.name)}"
          aria-label="${esc(product.name)}の画像を拡大"
        >
          <img
            src="${esc(product.image)}"
            alt="${esc(product.name)}"
            loading="lazy"
            onerror="this.onerror=null;this.src='images/shark-logo.png';"
          >
        </button>

        <div class="card-body">
          <p class="card-brand">${esc(product.brand)}</p>
          <h3>${esc(product.name)}</h3>
          <p class="card-meta">${esc(product.year)}・${esc(product.condition)}</p>
          <p class="price">${esc(product.price)}</p>
          <a class="detail-link" href="product.html?id=${index}">詳細を見る</a>
        </div>
      </article>
    `;
  }).join("");

  area.querySelectorAll(".card-image-link").forEach((button) => {
    button.addEventListener("click", () => {
      openLightbox(button.dataset.src, button.dataset.alt);
    });
  });
}

if (!products.length) {
  area.innerHTML = "<p>商品データが読み込まれていません。products.jsをご確認ください。</p>";
} else {
  renderFilters();
  renderProducts();
}

search.addEventListener("input", renderProducts);
sort.addEventListener("change", renderProducts);

if (menu && nav) {
  menu.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menu.setAttribute("aria-expanded", String(isOpen));
  });
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
