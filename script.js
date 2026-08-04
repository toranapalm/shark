fetch("products.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("商品データを読み込めませんでした。");
    }

    return response.json();
  })
  .then((products) => {
    const area = document.getElementById("products");

    products.forEach((product, index) => {
      const status =
        product.status === "SOLD OUT"
          ? "<p class='sold'>SOLD OUT</p>"
          : `<p class="available">${product.status}</p>`;

      area.innerHTML += `
        <div class="card" data-brand="${product.brand}">
          <img
            src="${product.image}"
            alt="${product.name}"
            onerror="this.alt='画像を表示できません';"
          >

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

    const area = document.getElementById("products");

    area.innerHTML = `
      <p>
        商品を表示できませんでした。products.jsonの内容をご確認ください。
      </p>
    `;
  });

function filterBrand(brand) {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    if (brand === "all" || card.dataset.brand === brand) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
