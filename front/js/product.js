function getUrlId () {
  let params = (new URL(document.location)).searchParams; // récupérer l'ID de l'URL
  const id = params.get('id');
  console.log(id);
  return id;
  }
async function getProductId(id){ // Fonction pour récupérer les données depuis l'API avec l'ID
  return fetch(`http://localhost:3000/api/products/${id}`)
}
function showProduct(dataProducts){ 
    document.getElementsByClassName("item")[0].innerHTML =
      `<article>
              <div class="item__img">
                <img src='${dataProducts.imageUrl}' alt='${dataProducts.altTxt}'>
              </div>
              <div class="item__content">
  
                <div class="item__content__titlePrice">
                  <h1 id="title">${dataProducts.name}</h1>
                  <p>Prix : <span id="price">${dataProducts.price}</span>€</p>
                </div>
  
                <div class="item__content__description">
                  <p class="item__content__description__title">Description :</p>
                  <p id="description">${dataProducts.description}</p>
                </div>
  
                <div class="item__content__settings">
                  <div class="item__content__settings__color">
                    <label for="color-select">Choisir une couleur :</label>
                    <select name="color-select" id="colors">
                        <option value="">--SVP, choisissez une couleur --</option>
                        ${OptionWithColors(dataProducts.colors)} 
                    </select>
                  </div>
  
                  <div class="item__content__settings__quantity">
                    <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                    <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                  </div>
                </div>
  
                <div class="item__content__addButton">
                  <button id="addToCart">Ajouter au panier</button>
                </div>
  
              </div>
            </article>`
            verifyValues ()
}
function OptionWithColors (colors) {
  let colorOption = "";
  colors.forEach ((color) => { 
    colorOption += `<option value="${color}">${color}</option>`
  });
  return colorOption;
}
async function displayProduct() {
const id = getUrlId ();
const dataProducts = await getProductId(id)
showProduct(await dataProducts.json())
}
displayProduct();
function verifyValues () {
let btn = document.getElementById('addToCart')
if (btn != null) {
  btn.addEventListener('click', (e) => {
    const id = getUrlId ();
    var color = document.querySelector("#colors").value
    var quantity = document.querySelector("#quantity").value
    // console.log(color);
    // console.log(quantity);
      if (color === "" || quantity == null || quantity <= 0 || quantity >= 100 ) {
        alert("Merci de sélectionner une couleur ou une quantité correcte.");
    }
    else {
      let product = {'id':id,'color':color,'quantity':quantity}
      addToCart(product);
    }
  })
}
}
function addToCart(product) { 
  let cart = JSON.parse(localStorage.getItem("selectedProduct"));
    if (cart == null) { 
      cart = []; 
      cart.push(product); 
      localStorage.setItem("selectedProduct", JSON.stringify(cart)); 
      alert("Votre produit a bien été ajouté au panier")
    } else { // si le panier n'est pas vide
    const choseProduct = cart.find((productsInCart) => (product.id == productsInCart.id) && (product.color == productsInCart.color));
    if (choseProduct) { 
      const addSameProductQuantity = Number(product.quantity) + Number(choseProduct.quantity);
    if (addSameProductQuantity <= 100){
      choseProduct.quantity = addSameProductQuantity;
      localStorage.setItem("selectedProduct", JSON.stringify(cart));
      alert("Produit déja présent dans le panier. Quantité mise à jour")
    } else { 
      alert("Quantité maximale disponible dépassée pour ce produit")
    }
    } else { // si le produit n'existe pas encore dans le panier
      cart.push(product); 
      localStorage.setItem("selectedProduct", JSON.stringify(cart)); // transforme l'objet en chaine de caractère
      alert("Votre produit a bien été ajouté au panier")
    }
    // console.log(choseProduct);
    // console.log(cart);
  }
}