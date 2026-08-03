fetch("products.json")

.then(response => response.json())

.then(products => {


const area =
document.getElementById("products");


products.forEach(product=>{


let sold =
product.sold ?
"<p class='sold'>SOLD OUT</p>"
:"";


area.innerHTML += `

<div class="card">

<img src="${product.image}">

<h3>${product.name}</h3>

<p>
${product.brand}<br>
${product.year}
</p>


<p class="price">
${product.price}
</p>

${sold}

</div>

`;

});


});
