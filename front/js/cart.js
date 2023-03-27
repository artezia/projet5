const myUrl = new URL('http://localhost:3000/api/products/');

function getBasket(){ //// récupération du Local Storage ////
  const basket = localStorage.getItem("selectedProduct");
  if(basket==undefined || basket==null){
    return [];
  }else{
    // console.log(basket)
    return JSON.parse(basket)
  }
}
function showProducts(){  //// affichage des données du Local Storage dans le html ////
  let baskets = getBasket();
  // console.log(baskets);
  if(baskets.length>0){
    for (let selectedProduct of baskets){ 
      const objetLs ={
        id : selectedProduct.id,
        color: selectedProduct.color,
        quantity: selectedProduct.quantity
      }
      fetch(myUrl + objetLs.id) 
      .then(function(response){ 
        return response.json(); 
      })
      .then(function(selectedProduct){ 
      const quantityClass = `itemQuantity_${selectedProduct._id}_${objetLs.color}`
      const deleteItemClass = `itemDelete_${selectedProduct._id}_${objetLs.color}`
      const article = document.getElementById("cart__items").innerHTML +=
        ` <article class="cart__item" data-id="{product-id}" data-color="{product-color}">
        <div class="cart__item__img">
          <img src="${selectedProduct.imageUrl}" alt="${selectedProduct.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${selectedProduct.name}</h2>
            <p>${objetLs.color}</p>
            <p>${selectedProduct.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" onchange="changeQuantity(this.value,'${selectedProduct._id}','${objetLs.color}')" id="quantityLs" class="${quantityClass}" name="itemQuantity" min="1" max="100" value="${objetLs.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p id="deleteItem" onclick="deleteProduct('${selectedProduct._id}','${objetLs.color}')";" class="${deleteItemClass}" name="itemDelete";>Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
      })
    }
  }
  else {
    document.getElementById("limitedWidthBlock").innerHTML = 
    `<p align="center">Oups,</p>
    <p align="center">votre panier est vide !</p>`
  }
}
showProducts()
function getNumberOfArticles(){ //// Afficher nombre d'article dans le panier ////
  let basket = getBasket();
  if(basket){ 
    let showProducts = document.querySelector("#totalQuantity"); // ID pour afficher dans la page
    let totalItems = 0; //nombre d'article initial
      for (let selectedProduct of basket){ //pour chaque produit du contenu du local storage
      totalItems += Number(selectedProduct.quantity); //ajout en nombre de la quantité présente pour tous les éléments du local storage
    }
  showProducts.textContent = totalItems; //et affichage sur la page
  }}
getNumberOfArticles()
function getTotalPrice(){ //// Afficher le montant du panier ////
  let basket = getBasket()
  if(basket){
    let totalPrice = basket;
    let totalItemsPrice = 0; // prix initial
    for (let selectedProduct of totalPrice){
      let objetLs ={
        id : selectedProduct.id, 
        color: selectedProduct.color, 
        quantity: selectedProduct.quantity 
      }
      fetch(myUrl + objetLs.id) 
      .then(function(response){ 
        return response.json(); 
      })
      .then(function(selectedProduct) { 
        let showPrice = document.querySelector("#totalPrice"); // ID pour afficher dans la page
        totalItemsPrice += Number(objetLs.quantity * selectedProduct.price)
        showPrice.innerText = totalItemsPrice; //affichage du prix à payer après calcul
    })
  };  
}}
getTotalPrice()
function changeQuantity(quantity, id, color){ //// Modifier la quantité du produit ////
  let basket = getBasket()
  let product = basket.find((selectedProduct) => selectedProduct.id == id) && basket.find((selectedProduct) => selectedProduct.color == color); // retour la valeur de l'élement
  product.quantity = Number(quantity);
  if(quantity >100){ 
    alert("La quantité ne peut excéder 100 produits.") 
    } else if (quantity <=0){ 
    alert("La quantité doit être comprise entre 1 et 100.") 
    } else{
    localStorage.setItem("selectedProduct", JSON.stringify(basket)); 
    alert("Quantité mise à jour.");
  }
    document.location.reload();
}
function deleteProduct(id, color){ //// Supprimer article du panier ////
  let btnCancel = "Souhaitez vous supprimer cet article ?";
  if (confirm(btnCancel) == true) {
    text = "Votre produit a bien été supprimé";
  } 
  else {
    return;
  }
  let basket = getBasket()
  let productToDelete = basket.filter((selectedProduct) => selectedProduct.id != id) && basket.filter((selectedProduct) => selectedProduct.color != color); // retourne un nouveau tableau
  localStorage.setItem("selectedProduct", JSON.stringify(productToDelete));
  alert("L'article a bien été supprimé du panier.");
  document.location.reload();
}
/////////// renseigner le formulaire ///////////
const regexEmail = new RegExp ("^[a-z0-9._-]+[@]{1}[a-z0-9._-]+[.]{1}[a-z]{2,15}$");  //regex email : minimum 1 caractère (chiffres, lettres) @, suivi de minimum un point, suivi de 2 lettres au minimum
const regexAddress = new RegExp ("^[0-9a-z A-Z,.'-çñâàäéèêëïîìôöòüùû ]{8,100}$"); //regex adresse : minimum 5 caractères (lettres, chiffres, accents)
const regexText = new RegExp ("^[A-Za-zÀ-ÖØ-öø-ÿ-' ]{2,}$"); //regex texte (prenom, nom) : minimum 2 caractères (lettres, accents, tirets, apostrophes et espaces)
const regexText2 = new RegExp ("^[A-Za-zÀ-ÖØ-öø-ÿ-' ]{1,}$"); //regex texte (ville) : minimum 1 caractère (lettres, accents, tirets, apostrophes et espaces)

// Variables pour cibler les éléments html des labels
let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName"); 
let address = document.querySelector("#address"); 
let city = document.querySelector("#city"); 
let email = document.querySelector("#email"); 

// Variables pour afficher les messages d'erreurs avec l'ID du p
const firstNameStatus = document.querySelector("#firstNameErrorMsg");
const firstNameStatus2 = document.querySelector("#firstName");  
const lastNameStatus = document.querySelector("#lastNameErrorMsg"); 
const lastNameStatus2 = document.querySelector("#lastName");
const addressStatus = document.querySelector("#addressErrorMsg");
const addressStatus2 = document.querySelector("#address");
const cityStatus = document.querySelector("#cityErrorMsg");
const cityStatus2 = document.querySelector("#city");
const emailStatus = document.querySelector("#emailErrorMsg");
const emailStatus2 = document.querySelector("#email"); 

// Validation du champ prénom
firstName.addEventListener("change", function(){ // écoute du champ de saisie
  let labelValue = this.value; 
  firstNameValidation(labelValue); 
});
let firstNameValidation = function(labelFirstName){ 
  let firstNameRegex = regexText.test(labelFirstName.trim()); // methode test() pour vérifier les correspondances
  if(firstNameRegex){ 
    firstNameStatus.innerText = "Prénom validé"; 
    firstNameStatus.setAttribute("style", "color:yellow");
    firstNameStatus2.setAttribute("style", "background-color: #a9eda9"); 
    return true; 
  } else { 
    firstNameStatus.innerText = "Veuillez renseigner un Prénom. (2 caractères minimum, chiffres et symboles spéciaux non autorisés)";
    firstNameStatus.setAttribute("style", "color:navy"); 
    firstNameStatus2.setAttribute("style", "border:2px solid red");
    return false; 
  }
};

// Validation du champ Nom
lastName.addEventListener("change", function(){ 
  let labelValue = this.value; 
  lastNameValidation(labelValue);
})
let lastNameValidation = function(labelFirstName){
  let lastNameRegex = regexText.test(labelFirstName.trim()); 
  if(lastNameRegex){ 
    lastNameStatus.innerText = "Nom validé";
    lastNameStatus.setAttribute("style", "color:yellow"); 
    lastNameStatus2.setAttribute("style", "background-color: #a9eda9"); 
    return true;
  } else { 
    lastNameStatus.innerText = "Veuillez renseigner un Nom. (2 caractères minimum, chiffres et symboles spéciaux non autorisés)"; 
    lastNameStatus.setAttribute("style", "color:navy"); 
    lastNameStatus2.setAttribute("style", "border:2px solid red");
    return false;
  }
};

// Validation du champ adresse
address.addEventListener("change", function(){
  let labelValue = this.value;
  addressValidation(labelValue); 
})
let addressValidation = function(labelAddress){ 
  let addressRegex = regexAddress.test(labelAddress.trim());
  if (addressRegex){
    addressStatus.innerText = "Adresse validée."; 
    addressStatus.setAttribute("style", "color:yellow"); 
    addressStatus2.setAttribute("style", "background-color: #a9eda9");;
    return true;
  } else{ 
    addressStatus.innerText = "Veuillez renseigner une Adresse. (8 caractères minimum, symboles spéciaux non autorisés)"
    addressStatus.setAttribute("style", "color:navy"); 
    addressStatus2.setAttribute("style", "border:2px solid red"); 
    return false;
  }
};

// Validation du champ ville
city.addEventListener("change", function(){ 
  let labelValue = this.value; 
  cityValidation(labelValue);
})
let cityValidation = function(labelCity){ 
  let cityRegex = regexText2.test(labelCity.trim()); 
  if(cityRegex){
    cityStatus.innerText = "Ville validée."; 
    cityStatus.setAttribute("style", "color:yellow");
    cityStatus2.setAttribute("style", "background-color: #a9eda9"); 
    return true; 
  } else {
    cityStatus.innerText = "Veuillez saisir une Ville. (1 caractère minimum, chiffres et symboles spéciaux non autorisés)"; 
    cityStatus.setAttribute("style", "color:navy"); 
    cityStatus2.setAttribute("style", "border:2px solid red"); 
    return false; 
  }
};

// Validation du champ email
email.addEventListener("change", function(){ 
  let labelValue = this.value; 
  emailValidation(labelValue); 
})
let emailValidation = function(labelEmail){ 
  let emailRegex = regexEmail.test(labelEmail.trim()); 
  if (emailRegex){ 
    emailStatus.innerText = "E-mail validé."; 
    emailStatus.setAttribute("style", "color:yellow"); 
    emailStatus2.setAttribute("style", "background-color: #a9eda9"); 
    return true; 
  } else {
    emailStatus.innerText = "Veuillez renseigner un E-mail (exemple : ****@***.fr)"; 
    emailStatus.setAttribute("style", "color:navy");
    emailStatus2.setAttribute("style", "border:2px solid red");  
    return false; 
  }
};
function postForm () {  //// envoi du formulaire ////
  let orderButton = document.querySelector("#order"); 
  orderButton.addEventListener('click', (event) =>{ 
    event.preventDefault(); 
    let firstName = document.querySelector("#firstName").value; 
    let lastName = document.querySelector("#lastName").value; 
    let address = document.querySelector("#address").value; 
    let city = document.querySelector("#city").value;
    let email = document.querySelector("#email").value; 
    // console.log(firstNameValidation(firstName), lastNameValidation(lastName), addressValidation (address), cityValidation (city), emailValidation(email));
    // alert(email)
    if (firstName ==="" || lastName ==="" || address ==="" ||city ==="" ||email ===""){ 
      alert("Veuillez remplir le formulaire afin de valider la commande.");
    } else if ((firstNameValidation(firstName) == false) || (lastNameValidation(lastName) == false) || (addressValidation(address) == false) || (cityValidation(city) == false) || (emailValidation(email) === false)){ 
      alert ("Tous les champs de formulaire doivent être renseignés correctement pour valider la commande."); 
    } else { 
      let cart = []; //création du tableau panier
      let baskets = getBasket();
      for (let product of baskets){
        cart.push(product.id)
      };
      let myOrder ={ 
        contact : {
          firstName : firstName,
          lastName : lastName,
          address : address,
          city : city,
          email : email
        },
        products : cart
      };
      fetch(myUrl + '/order', { 
        method: 'POST', 
        headers: { 
        'Content-Type' : 'application/json'
        },
        body: JSON.stringify(myOrder)
      })
      .then((response) => response.json()) 
      .then((data)=>{ 
        console.log(data);
        document.location.href = "confirmation.html?orderId=" + data.orderId; 
      })       
      .catch ((e) => alert("Un problème est survenu lors de la commande. Veuillez nous contacter au 01 23 45 67 89 ou par email : support@name.com"));
    };   
  });
}
postForm ()