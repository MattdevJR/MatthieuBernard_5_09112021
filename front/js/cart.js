let cart = JSON.parse(localStorage.getItem("cart"));
//console.log(cart);

function main(){
    
    displayElements (cart);//afficher dans page panier produits ajouté au panier
    //modifQuantityElements (cart)//modifier la quantité
    //deletQuantityElements (cart)//Supprimer quantité
    //totalQuantityElements (cart)//Quantité total
    //totalPriceElements (cart)//prix total
    
    //
    /*let inputsQuantity = document.querySelectorAll('.itemQuantity');
    inputsQuantity.forEach(element=>{
      let productiId = element.getAttribute('')
      element.addEventListener('change',function(){
        modifQuantityElements(cart)
      })
    })*/
    refreshPriceAndQuantity()
 let productArticle = document.querySelectorAll('.cart__item')
    productArticle.forEach(element =>{
        console.log(element);
        let inputQuantity = element.querySelector('.itemQuantity')
        inputQuantity.addEventListener("change", function(){
            let productId = element.getAttribute("data-id")
            let productColor = element.getAttribute("data-color")
            let productQuantity = inputQuantity.value
            console.log(productQuantity);
            console.log(productId);
            console.log(productColor);
           modifQuantityElements(productId , productColor , productQuantity);
        })
    })
    //.addEventListener('click',function(){   
    //})

}

function displayElements (cart){
    for (let data of cart){
    let selectSection = document.getElementById("cart__items");

    selectSection.innerHTML += `
    <article class="cart__item" data-id="${data.productId}" data-color="${data.productColor}">
                <div class="cart__item__img">
                  <img src="${data.productPicture}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${data.productTitle}</h2>
                    <p>Couleur : ${data.productColor}</p>
                    <p><span>${data.productPrice}</span> €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${data.productQuantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
            }
            console.log("Les éléments du panier : ", cart);
}

//modifQuantityElements
function modifQuantityElements(productId , productColor , productQuantity){
    cart.forEach(element => {
        //console.log(element.productId == productCart.productId);
        //console.log(element.productColor == productCart.productColor);
        if(element.productId == productId && element.productColor == productColor){//Si ID & Color identique
          //console.log("oui");
          //Quantité +1
            element.productQuantity = parseInt(productQuantity); 

        }
    })
    
    
    //console.log(localCart)
    localStorage.setItem("cart", JSON.stringify(cart))
    //console.log("produit ajouté au panier : ", cart);

    refreshPriceAndQuantity();
    //totalQuantityElements(cart);
}



//deletQuantityElements -
function refreshPriceAndQuantity(){
    let cartItems = document.querySelectorAll(".cart__item");
    console.log(cartItems)
    let cartQuantity = 0;
    let cartPrice = 0;
    


    cartItems.forEach(element => {
    
      let quantity = element.querySelector(".itemQuantity").value
      let price = element.querySelector(".cart__item__content__description p:last-child span").innerHTML
      console.log(price);

      cartQuantity += parseInt(quantity);
      cartPrice += parseInt(quantity) * parseInt(price);

    });
    document.getElementById('totalQuantity').innerHTML = cartQuantity;
    document.getElementById('totalPrice').innerHTML = cartPrice;
    //numberFormat
}

//totalQuantityElements =
function totalQuantityElements(cart){
    const arrayQuantity = [];
    for (let data of cart){
        arrayQuantity.push(data.productQuantity)
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const totalQuantity = arrayQuantity.reduce(reducer)
        document.getElementById("totalQuantity").innerHTML = totalQuantity;
        
    }
    //console.log(arrayQuantity);

    if(arrayQuantity.length === 0){
        document.querySelector("h1").innerHTML = "Le panier est vide";
        totalQuantity = "";
        document.getElementById("totalQuantity").innerHTML = totalQuantity;
    }
}

//totalPriceElements ++=€
function totalPriceElements(productPrice){
  let totalPriceQuantity = "";//Prix
  let arrayPrice = [];//Tableau de prix à afficher 

  for (let data of productPrice){ 
    totalPriceQuantity = data.priceChoice * data.quantityChoice //Prix X Quantité canap
    //
    document.getElementById("totalPrice").innerHTML = totalPrice
  }

  if(arrayPrice.length === 0){//Si = a 0, afficher totalPriceQuantity 
    totalPriceQuantity = "";
    document.getElementById("totalPrice").innerHTML = totalPriceQuantity;
  }
}






//Validation formulaires, Au clic


main();