const ps = window.SHARK_PRODUCTS || [];
const area = document.getElementById("products");

area.innerHTML = ps.map(p => `
  <article class="card">
    <div class="product-image">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
    </div>
    <div class="body">
      <p class="brand">${p.brand}</p>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <p class="msrp">メーカー希望小売価格 ¥${p.msrp.toLocaleString()}</p>
      <p class="price">SHARK価格 ¥${p.sale.toLocaleString()}（税込）</p>
      <span class="prep">販売準備中</span>
    </div>
  </article>
`).join("");
