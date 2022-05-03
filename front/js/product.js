
const urlParams = location.search;
const searchParams = new URLSearchParams(urlParams);
const productId = searchParams.get("id");
const addToCartBtn = document.querySelector("#addToCart");
const quantityChoosen = document.querySelector("#quantity");
const colorChoosen = document.querySelector("#colors");

let kanap = "";
console.log(productId);



fetch("http://localhost:3000/api/products/" + productId)
    .then(response => {
        return response.json();
    })
    .then(kanap_result => {
        kanap = kanap_result;
        console.log(kanap);
        document.querySelector("#title").innerHTML = kanap.name;
        document.querySelector(".item__img").innerHTML = `<img src=${kanap.imageUrl} alt=${kanap.altText}>`;
        document.querySelector("#price").innerHTML = kanap.price;
        document.querySelector("#description").innerHTML = kanap.description;

        let colorSelect = document.querySelector("#colors");

        for (let color of kanap.colors) {
            console.table(color);
            let colorOption = document.createElement("option");
            colorSelect.appendChild(colorOption);
            colorOption.value = color;
            colorOption.innerHTML = color;
        }
    })

    .catch((error) => {
        console.log(error);
    });

function addToCart() {

    if (quantityChoosen.value > 0 && quantityChoosen.value <= 100) {
        let choixColor = colorChoosen.value;
        let choixQantity = quantityChoosen.value;
        let optionProduct = {
            productId,
            colorProduct: choixColor,
            quantityProduct: Number(choixQantity),
            nameProduct: kanap.name,
            priceProduct: kanap.price,
            descriptionProduct: kanap.description,
            imgProduct: kanap.imageUrl,
            altImgProduct: kanap.altText
        };
        const popupConfirmation = () => {
            if (window.confirm(`Votre commande de ${choixQantity} ${kanap.name} ${choixColor} est ajoutée au panier
        Cliquez sur OK, pour consulter votre panier`)) {
                window.location.href = "cart.html";
            }
        }

        let localStorageKanapAdamOpcrp5 = localStorage.getItem("produitKanapAdamOpcrp5");
        console.log(localStorageKanapAdamOpcrp5);


        if (localStorageKanapAdamOpcrp5) {
            const basketKanaps = JSON.parse(localStorageKanapAdamOpcrp5);
            const existingProductIndex = basketKanaps.findIndex(
                (el) => el.productId === productId && el.colorProduct === choixColor);

            if (existingProductIndex >-1) {
                let newQuantity =
                    parseInt(optionProduct.quantityProduct) + parseInt(basketKanaps[existingProductIndex].quantityProduct);
                    basketKanaps[existingProductIndex].quantityProduct = newQuantity;
                localStorage.setItem("produitKanapAdamOpcrp5", JSON.stringify(basketKanaps));
                popupConfirmation();
            } else {
                basketKanaps.push(optionProduct);
                localStorage.setItem("produitKanapAdamOpcrp5", JSON.stringify(basketKanaps));
                console.table(basketKanaps);
                popupConfirmation();
            }

        } else {
            localStorageKanapAdamOpcrp5 = [];
            localStorageKanapAdamOpcrp5.push(optionProduct);
            localStorage.setItem("produitKanapAdamOpcrp5", JSON.stringify(localStorageKanapAdamOpcrp5));
            console.table(localStorageKanapAdamOpcrp5);
            popupConfirmation();
        }
    };




}

addToCartBtn.addEventListener("click",() => {
    addToCart();
});




// si le localStorage contient déja quelque chose !0 à la propriété "kanapAdamOpcrp5"
//if on va crée un nouveau tableau vide qui représentera notre panier initial
//if else on va extraite (deziper) le tableau existant qui est stocké en format Json, ajouté au tableau le produit quantity and colors
//if else on rezipe dans le localStorage sous format Json});
