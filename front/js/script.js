
init();
async function init(){
    const dataSofas = await fetchData();
        //console.log(dataSofas);
        let dataHtml;
        
   const htmlSofas = constructHtmlSofas(dataSofas);
    if(dataSofas =='undefinned'){
        dataHtml ="Aucun produit n'a été trouvé";
    }else{
        dataHtml = htmlSofas;
    }
    
    document.getElementById('items').innerHTML = dataHtml;
}

/*
Récupération des données dans l'API, 
*/
function fetchData(){
    return fetch("http://localhost:3000/api/products") 
    .then(response => response.json()) 
    .catch(e => console.log("il y a une erreur de type : " + e));
}

/*Construction element html dans le dom*/

function constructHtmlSofas(data){
    let html ='';
    data.forEach(element => {
        console.log(element);
        html += '<a href="./product.html?id='+element._id+'" class="items">' +
                    ' <article>'+
                        ' <img src="'+element.imageUrl+'" alt="'+element.altTxt+'">'+
                            ' <h3 class="productName">'+element.name+'</h3>'+
                                '<p class="productDescription">'+element.description+'</p>'+
                    ' </article> '+
                '</a>';
    });

    return html;
};
