const grid=document.getElementById('productGrid');
grid.innerHTML=window.PRODUCTS.map(p=>`<article class="product-card">
<div class="photo verified-photo">${p.image?`<img src="${p.image}" alt="${p.brand} ${p.name} 新品">`:`<div class="image-pending"><b>${p.brand}</b><span>${p.name}</span><small>正規商品画像 準備中</small></div>`}</div>
<div class="product-info"><div class="brand-row"><span class="brand">${p.brand}</span></div>
<h3>${p.name}</h3><p class="condition">新品</p><p class="desc">${p.description}</p>
<p class="regular">メーカー希望小売価格 ¥${p.msrp.toLocaleString()}（税込・JPY）</p>
<p class="shark-label">SHARK価格</p><p class="sale">¥${p.price.toLocaleString()} <small>（税込・JPY）</small></p>
<p class="source-note">商品確認：${p.source}</p><button class="cart disabled" disabled>販売準備中</button></div></article>`).join('');
const btn=document.querySelector('.menu'),nav=document.querySelector('nav');if(btn)btn.onclick=()=>nav.classList.toggle('open');