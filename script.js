const grid=document.getElementById('productGrid');
grid.innerHTML=window.PRODUCTS.map(p=>`<article class="product-card">
<div class="photo"><img src="${p.image}" alt="${p.brand} ${p.name} 新品"></div>
<div class="product-info">
<div class="brand-row"><span class="brand">${p.brand}</span>${p.price>=300000?'<span class="high-badge">HIGH END</span>':''}</div>
<h3>${p.name}</h3>
<p class="condition">新品</p>
<p class="desc">${p.description}</p>
<p class="regular">メーカー希望小売価格 ¥${p.msrp.toLocaleString()}（税込・JPY）</p>
<p class="shark-label">SHARK価格</p>
<p class="sale">¥${p.price.toLocaleString()} <small>（税込・JPY）</small></p>
<p class="stock">${p.stock}</p>
${p.stripe_url
 ? `<a class="cart" href="${p.stripe_url}">Stripeで購入する</a>`
 : `<button class="cart disabled" type="button" disabled>決済準備中</button>`}
</div></article>`).join('');
const btn=document.querySelector('.menu'),nav=document.querySelector('nav');
if(btn) btn.onclick=()=>nav.classList.toggle('open');