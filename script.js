fetch("products.json")
  .then((response) => response.json())
  .then((products) => {
    const area = document.getElementById("products");

    products.forEach((product, index) => {
      const status =
        product.status === "SOLD OUT"
          ? "<p class='sold'>SOLD OUT</p>"
          : `<p class="available">${product.status}</p>`;

      area.innerHTML += `
        <div class="card" data-brand="${product.brand}">
          <img src="${product.image}" alt="${product.name}">

          <h3>${product.name}</h3>

          <p>
            ${product.brand}<br>
            ${product.year}
          </p>

          <p class="price">${product.price}</p>

          ${status}

          <a href="product.html?id=${index}">
            詳細を見る
          </a>
        </div>
      `;
    });
  })
  .catch((error) => {
    console.error(error);

    document.getElementById("products").innerHTML =
      "<p>商品を表示できませんでした。</p>";
  });

function filterBrand(brand) {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.style.display =
      brand === "all" || card.dataset.brand === brand
        ? "block"
        : "none";
  });
}
