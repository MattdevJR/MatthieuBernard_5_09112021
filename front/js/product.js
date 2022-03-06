//
//Récuperation ID produit  
//récuperation de la chaine de requete dans l'url
const idUrl = window.location.search.split("?").join("");
//console.log(idUrl);

//extraire l'id
const urlSearchParams = new URLSearchParams(idUrl);
const id = urlSearchParams.get("id");
console.log(id);
//


//
//Function principal


async function main(){
    //
    const dataProduct = await fetchDataProduct();
        console.log(dataProduct);
        let dataHtml;//undefined ???
    //    
   const htmlProduct = constructHtmlProduct(dataProduct);
    if(dataProduct =='undefinned'){
        dataHtml ="Aucun produit n'a été trouvé";
    }else{
        dataHtml = htmlProduct;
    }
    //console.log(htmlProduct);
    document.getElementsByClassName('item__img').innerHTML = dataHtml;
    
    localStorage.getItem("dataHtml");
    

};


//Récupère les données d'un produit, grâce à son ID, 
//dans l'API et return la promesse pour les récupérer dans datasProduct dans main

function fetchDataProduct(){
    return fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .catch(e => console.log("il y a une erreur sur la page produit de type :" + e));
};


//
//Construction page produit dans le dom
//
function constructHtmlProduct(data){
    //Crée lelements
    let img = document.createElement('img');
    img.src =  data.imageUrl;
    img.alt = data.altTxt;
    //Inserer
    document.querySelector('.item__img').appendChild(img);
    document.querySelector('#title').innerHTML = data.name;
    document.querySelector('#price').innerHTML = data.price;
    document.querySelector('#description').innerHTML = data.description;
    document.querySelector('#addToCart').setAttribute('data-product-id',data._id)

    //recuperation du tableau de l'element color avec .forEach
    data.colors.forEach(element => {
        let option = document.createElement('option');
        option.value = element;
        option.innerHTML = element;
        document.querySelector('#colors').appendChild(option)

    });

};



//Add Event Listener sur le boutton AddToCart

document.getElementById('addToCart').addEventListener('click',function(){
    let nbProduct = document.querySelector('#quantity').value
    if(nbProduct < 1){
        alert('Veuillez sélectionner une quantité')
        return;
    }
    if(nbProduct > 100){
        alert('Vous ne pouvez pas ajouter plus de 100 exemplaires de cet article');
        return;
    }

    let option = document.querySelector('#colors').value
    if(option.length < 1 ){
        alert('merci de choisir une couleur');
        return;
    }
   
    
    let dataProductCart = {
        productColor : option,
        productQuantity : parseInt(nbProduct),
        productId : document.getElementById('addToCart').getAttribute('data-product-id'),
        productPicture : document.querySelector('.item__img img').getAttribute('src'),
        productTitle : document.getElementById('title').innerHTML,
        productPrice : parseInt(document.getElementById('price').innerHTML) ,
    }

    let cart = localStorage.getItem("cart");//Voir si dans LS cart est = a une Key
    let productCart = [];//Crée un tableau vide

    if(!cart){//Si differant de cart
        productCart.push(dataProductCart);
        localStorage.setItem("cart", JSON.stringify(productCart));
        console.log("produit ajouté au panier : ", productCart);
    }else{
       addProduct(dataProductCart, cart); 
    }

    //redirection a la page suivante
});

// 
//Instruction si cart est differant
function addProduct (productCart, cart){
    let localCart = JSON.parse(cart);
    //console.log(localCart)
    let isNew = true;
    localCart.forEach(element => {
        //console.log(element.productId == productCart.productId);
        //console.log(element.productColor == productCart.productColor);
        if(element.productId == productCart.productId && element.productColor == productCart.productColor){//Si ID & Color identique
          //console.log("oui");
          isNew = false;
          //Quantité +1
            element.productQuantity += productCart.productQuantity;

        }
    })
    if(isNew){
        localCart.push(productCart);
    }
    
    //console.log(localCart)
    localStorage.setItem("cart", JSON.stringify(localCart))
    console.log("produit ajouté au panier : ", localCart);
}

main();
