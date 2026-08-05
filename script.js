const area=document.getElementById("products");
const empty=document.getElementById("empty-message");
const filters=document.getElementById("brand-filters");
const search=document.getElementById("search-input");
const sort=document.getElementById("sort-select");
const menu=document.querySelector(".menu-button");
const nav=document.getElementById("site-nav");
const lightbox=document.getElementById("lightbox");
const lightboxImage=document.getElementById("lightbox-image");
const lightboxClose=document.getElementById("lightbox-close");
let products=[];let selected="すべて";
const esc=v=>String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
const price=v=>Number(String(v??"").replace(/[^0-9]/g,""))||0;
function renderFilters(){const brands=["すべて",...new Set(products.map(p=>p.brand))];filters.innerHTML=brands.map(b=>`<button class="filter-button ${b===selected?"is-active":""}" data-brand="${esc(b)}">${esc(b)}</button>`).join("");filters.querySelectorAll("button").forEach(btn=>btn.onclick=()=>{selected=btn.dataset.brand;renderFilters();renderProducts()})}
function filtered(){const q=search.value.trim().toLowerCase();let list=products.filter(p=>(selected==="すべて"||p.brand===selected)&&[p.name,p.brand,p.year,p.description].join(" ").toLowerCase().includes(q));return [...list].sort((a,b)=>sort.value==="price-asc"?price(a.price)-price(b.price):sort.value==="price-desc"?price(b.price)-price(a.price):sort.value==="name"?a.name.localeCompare(b.name,"ja"):String(b.sortDate||"").localeCompare(String(a.sortDate||"")))}
function renderProducts(){const list=filtered();empty.hidden=list.length>0;area.innerHTML=list.map(p=>{const i=products.indexOf(p);return `<article class="card"><span class="status-badge ${p.status==="SOLD OUT"?"sold":""}">${esc(p.status)}</span><div class="card-image-link" data-src="${esc(p.image)}" data-alt="${esc(p.name)}"><img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy"></div><div class="card-body"><p class="card-brand">${esc(p.brand)}</p><h3>${esc(p.name)}</h3><p class="card-meta">${esc(p.year)}・${esc(p.condition)}</p><p class="price">${esc(p.price)}</p><a class="detail-link" href="product.html?id=${i}">詳細を見る</a></div></article>`}).join("");area.querySelectorAll(".card-image-link").forEach(el=>el.onclick=()=>{lightboxImage.src=el.dataset.src;lightboxImage.alt=el.dataset.alt;lightbox.hidden=false;document.body.style.overflow="hidden"})}
fetch("products.json").then(r=>{if(!r.ok)throw new Error();return r.json()}).then(data=>{products=data;renderFilters();renderProducts()}).catch(()=>area.innerHTML="<p>商品データを表示できませんでした。</p>");
search.addEventListener("input",renderProducts);sort.addEventListener("change",renderProducts);
menu?.addEventListener("click",()=>{const open=nav.classList.toggle("is-open");menu.setAttribute("aria-expanded",String(open))});
lightboxClose.onclick=()=>{lightbox.hidden=true;document.body.style.overflow=""};lightbox.onclick=e=>{if(e.target===lightbox)lightboxClose.onclick()};
document.getElementById("year").textContent=new Date().getFullYear();
