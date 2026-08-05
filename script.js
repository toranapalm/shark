const productArea = document.getElementById("products");
const emptyMessage = document.getElementById("empty-message");
const filterArea = document.getElementById("brand-filters");
const searchInput = document.getElementById("search-input");
const menuButton = document.querySelector(".menu-button");
const siteNav = document.getElementById("site-nav");

let allProducts = [];
let selectedBrand = "すべて";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderFilters(products) {
  const brands = ["すべて", ...new Set(products.map((product) => product.brand).filter(Boolean))];

  filterArea.innerHTML = brands.map((brand) => `
    <button
      class="filter-button ${brand === selectedBrand ? "is-active" : ""}"
      type="button"
      data-brand="${escapeHtml(brand)}"
    >
      ${escapeHtml(brand)}
    </button>
  `).join("");

  filterArea.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedBrand = button.dataset.brand;
      renderFilters(allProducts);
      renderProducts();
    });
  });
}

function getFilteredProducts() {
  const keyword = searchInput.value.trim().toLowerCase();

  return allProducts.filter((product) => {
    const matchesBrand =
      selectedBrand === "すべて" || product.brand === selectedBrand;

    const haystack = [
      product.name,
      product.brand,
      product.category,
      product.year,
      product.description
    ].join(" ").toLowerCase();

    return matchesBrand && haystack.includes(keyword);
  });
}

function renderProducts() {
  const products = getFilteredProducts();

  emptyMessage.hidden = products.length > 0;
  productArea.innerHTML = products.map((product) => {
    const originalIndex = allProducts.indexOf(product);
    const image = product.image || product.images?.[0] || "";
    const sold = product.status === "SOLD OUT";

    return `
      <article class="card">
        <span class="status-badge ${sold ? "sold" : ""}">
          ${escapeHtml(product.status || "販売中")}
        </span>

        <a class="card-image-link" href="product.html?id=${originalIndex}">
          <img
            src="${escapeHtml(image)}"
            alt="${escapeHtml(product.name)}"
            loading="lazy"
          >
        </a>

        <div class="card-body">
          <p class="card-brand">${escapeHtml(product.brand)}</p>
          <h3>${escapeHtml(product.name)}</h3>
          <p class="card-meta">
            ${escapeHtml(product.year || "")}
            ${product.condition ? `・${escapeHtml(product.condition)}` : ""}
          </p>
          <p class="price">${escapeHtml(product.price)}</p>
          <a class="detail-link" href="product.html?id=${originalIndex}">詳細を見る</a>
        </div>
      </article>
    `;
  }).join("");
}

fetch("products.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("商品データを読み込めませんでした。");
    }
    return response.json();
  })
  .then((products) => {
    allProducts = products;
    renderFilters(products);
    renderProducts();
  })
  .catch((error) => {
    console.error(error);
    productArea.innerHTML = "<p>商品を表示できませんでした。products.jsonをご確認ください。</p>";
  });

searchInput.addEventListener("input", renderProducts);

menuButton.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
