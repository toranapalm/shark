const grid=document.getElementById('productGrid');
grid.innerHTML=window.PRODUCTS.map(p=>`<article class="product-card">
<div class="photo"><img src="${p.image}" alt="${p.brand} ${p.name}"></div>
<div class="product-info"><div class="brand-row"><span class="brand">${p.brand}</span></div>
<h3>${p.name}</h3><p class="condition">新品</p><p class="desc">${p.description}</p>
<p class="regular">メーカー希望小売価格 ¥${p.msrp.toLocaleString()}（税込・JPY）</p>
<p class="shark-label">SHARK価格</p><p class="sale">¥${p.price.toLocaleString()} <small>（税込・JPY）</small></p>
<p class="source-note">商品照合：${p.source}</p>
<a class="cart inquiry-order" href="contact.html">在庫・ご購入について問い合わせる</a></div></article>`).join('');
const btn=document.querySelector('.menu'),nav=document.querySelector('nav');if(btn)btn.onclick=()=>nav.classList.toggle('open');