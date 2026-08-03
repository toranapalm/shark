fetch("products.json")

.then(r=>r.json())

.then(products=>{


const area =
document.getElementById("products");


products.forEach((p,index)=>{


area.innerHTML += `

<div class="card">


<img src="${p.image}">


<h3>${p.name}</h3>


<p>
${p.brand}<br>
${p.year}
</p>


<p class="price">
${p.price}
</p>


${p.sold?
"<p class='sold'>SOLD OUT</p>"
:""}


<a href="product.html?id=${index}">
詳細を見る
</a>


</div>

function filterBrand(brand){

const cards =
document.querySelectorAll(".card");


cards.forEach(card=>{


if(
brand=="all" ||
card.dataset.brand==brand
){

card.style.display="block";

}else{

card.style.display="none";

}


});


}
