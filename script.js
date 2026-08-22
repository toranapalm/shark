const grid=document.getElementById('productGrid');
grid.innerHTML=window.PRODUCTS.map(p=>`<article class="product-card">
<div class="photo"><img src="${p.image}" alt="${p.brand} ${p.name}"></div>
<div class="product-info"><div class="brand-row"><span class="brand">${p.brand}</span>${p.price>=300000?'<span class="high-badge">HIGH END</span>':''}</div><h3>${p.name}</h3>
<p class="regular">通常価格　¥${p.msrp.toLocaleString()} <small>（税込）</small></p>
<p class="shark-label">SHARK価格</p><p class="sale">¥${p.price.toLocaleString()} <small>（税込）</small></p>
<button class="cart" type="button" onclick="alert('Stripe接続後に購入機能を有効化します。')">🛒 カートに入れる</button></div></article>`).join('');
const btn=document.querySelector('.menu'),nav=document.querySelector('nav');btn.onclick=()=>nav.classList.toggle('open');