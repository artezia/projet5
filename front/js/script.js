function getApi(){ // Fonction pour récupérer les données depuis l'API
  return fetch("http://localhost:3000/api/products") 
    .then(function(response){ 
      return response.json(); 
    })
    .then(function(data){
      // console.log(data)
      return data; 
    })
    .catch(function(err){ 
      alert("problème de connexion a l'Api"); 
    })
}
function showProduct(dataProduct){ // insertion des variables dans le html de la section avec l'id items
  // concaténation des éléments à afficher +=
  document.getElementById("items").innerHTML += 
  `<a href="./product.html?id=${dataProduct._id}">
    <article>
      <img src="${dataProduct.imageUrl}" alt="${dataProduct.altTxt}">
      <h3 class="productName">${dataProduct.name}</h3>
      <p class="productDescription">${dataProduct.description}</p>
    </article>
  </a>`;
}
async function getProducts(){  // liaison entre la récupération des données et leur affichage avec une boucle
  const products = await getApi(); 
  for(product of products){
    showProduct(product); 
  }
}
getProducts();