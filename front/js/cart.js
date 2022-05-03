
const stordData = localStorage.getItem("produitKanapAdamOpcrp5");

let productsFromBasket;

let nameRegex = /^[a-zA-Z]{2,}$/;
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let adressRegex = /^[a-zA-Z0-9\s,'-]*$/;

if (stordData) {
    productsFromBasket = JSON.parse(stordData);
}


let kanap = "";
function displayEmptyBasket(){
    const titleCart = document.querySelector("h1");
        const sectionCart = document.querySelector(".cart");

        titleCart.innerHTML = "Votre panier est vide !";
        sectionCart.style.display = "none";
        
        //let productTotalQuantity = document.getElementById('totalQuantity');
        //productTotalQuantity.innerHTML = 0;
    
        //let productTotalPrice = document.getElementById('totalPrice');
        //productTotalPrice.innerHTML = 0;

}
function displayBasketCreation() {
    if (!productsFromBasket) {

        displayEmptyBasket()
        return;
    }
    const cartItemsCtnr = document.querySelector("#cart__items");
    cartItemsCtnr.innerHTML = "";

    for (let i = 0; i < productsFromBasket.length; i++) {

        let productArticle = document.createElement("article");
        cartItemsCtnr.appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute("data-id", productsFromBasket[i].productId + productsFromBasket[i].colorProduct);


        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";

        let productImg = document.createElement("img");
        productDivImg.appendChild(productImg);
        productImg.src = productsFromBasket[i].imgProduct;

        let productItemContent = document.createElement("div");
        productArticle.appendChild(productItemContent);
        productItemContent.className = "cart__item__content";

        let productItemContentTitlePrice = document.createElement("div");
        productItemContent.appendChild(productItemContentTitlePrice);
        productItemContentTitlePrice.className = "cart__item__content__titlePrice";

        let productTitle = document.createElement("h2");
        productItemContentTitlePrice.appendChild(productTitle);
        productTitle.innerHTML = productsFromBasket[i].nameProduct;

        let productColor = document.createElement("p");
        productTitle.appendChild(productColor);
        productColor.innerHTML = productsFromBasket[i].colorProduct;

        let productPrice = document.createElement("p");
        productItemContentTitlePrice.appendChild(productPrice);
        productPrice.innerHTML = productsFromBasket[i].priceProduct + " €";

        let productItemContentSettings = document.createElement("div");
        productItemContent.appendChild(productItemContentSettings);
        productItemContentSettings.className = "cart__item__content__settings";

        let productItemContentSettingsQuantity = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsQuantity);
        productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

        let productQuantity = document.createElement("p");
        productItemContentSettingsQuantity.appendChild(productQuantity);
        productQuantity.innerHTML = "Quantité : ";

        let productQuantityChoosen = document.createElement("input");
        productItemContentSettingsQuantity.appendChild(productQuantityChoosen);
        productQuantityChoosen.value = productsFromBasket[i].quantityProduct;
        productQuantityChoosen.className = "itemQuantity";
        productQuantityChoosen.setAttribute("type", "number");
        productQuantityChoosen.setAttribute("min", "1");
        productQuantityChoosen.setAttribute("max", "100");
        productQuantityChoosen.setAttribute("name", "itemQuantity");

        modifyQtt(productQuantityChoosen, productsFromBasket[i].colorProduct, productsFromBasket[i].productId);

        let productItemContentSettingsDelete = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsDelete);
        productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

        let productSupprimer = document.createElement("p");
        productItemContentSettingsDelete.appendChild(productSupprimer);
        productSupprimer.className = "deleteItem";
        productSupprimer.innerHTML = "Supprimer";
        productSupprimer.addEventListener("click", () => {

            let deleteId = productsFromBasket[i].productId;
            let deleteColor = productsFromBasket[i].colorProduct;

            productsFromBasket = productsFromBasket.filter(elt => elt.productId !== deleteId || elt.colorProduct !== deleteColor);

            localStorage.setItem('produitKanapAdamOpcrp5', JSON.stringify(productsFromBasket));

            alert('Votre article a bien été supprimé.');
            getTotals();
            if (productsFromBasket.length === 0) {
                localStorage.removeItem("produitKanapAdamOpcrp5");
            }
            
        });
    }
    displayDeleteBtn(cartItemsCtnr)
}

function displayDeleteBtn(cartItemsCtnr) {
    let btnDeleteAll = document.createElement("button");
            btnDeleteAll.id = "emptyCart";
            let t = document.createTextNode("Vider le panier");
            btnDeleteAll.appendChild(t);
            document.querySelector(".cart__price").appendChild(btnDeleteAll);

            btnDeleteAll.addEventListener("click", ()=>{
                localStorage.removeItem("produitKanapAdamOpcrp5");
                cartItemsCtnr.innerHTML = "";               
                displayEmptyBasket()
            })
}
function getTotals() {
    let totalQtt = 0,
        totalPrice = 0;
    if (productsFromBasket) {
        let myLength = productsFromBasket.length;

        for (let i = 0; i < myLength; ++i) {
            const productQtt = productsFromBasket[i].quantityProduct;
            totalQtt += productQtt;
            totalPrice += (productQtt * productsFromBasket[i].priceProduct);
        }
    }


    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
}
getTotals();


function modifyQtt(quantityInput, colorProduct, productId) {

    quantityInput.addEventListener("change", () => {
        const productIndex = productsFromBasket
            .findIndex(product => product.productId === productId && product.colorProduct === colorProduct);

        const newQuantityInput = quantityInput.value;
        productsFromBasket[productIndex].quantityProduct = Number(newQuantityInput);

        localStorage.setItem("produitKanapAdamOpcrp5", JSON.stringify(productsFromBasket));
        getTotals();
    })
}


function getForm() {
    let firstName = document.getElementById('firstName');
    firstName.addEventListener('input', function () {
        if (nameRegex.test(firstName.value) === false) {
            document.getElementById('firstNameErrorMsg').textContent =
                'Format du prénom incorrect';
        } else {
            document.getElementById('firstNameErrorMsg').textContent = '';
        }
    });

    let lastName = document.getElementById('lastName');
    lastName.addEventListener('input', function () {
        if (nameRegex.test(lastName.value) === false) {
            document.getElementById('lastNameErrorMsg').textContent =
                'Format du nom incorrect';
        } else {
            document.getElementById('lastNameErrorMsg').textContent = '';
        }
    });

    let address = document.getElementById('address');
    address.addEventListener('input', function () {
        if (adressRegex.test(address.value) === false) {
            document.getElementById('addressErrorMsg').textContent =
                "Format de l'adresse incorrect";
        } else {
            document.getElementById('addressErrorMsg').textContent = '';
        }
    });

    let city = document.getElementById('city');
    city.addEventListener('input', function () {
        if (adressRegex.test(city.value) === false) {
            document.getElementById('cityErrorMsg').textContent =
                'Format de la ville incorrecte';
        } else {
            document.getElementById('cityErrorMsg').textContent = '';
        }
    });

    let email = document.getElementById('email');
    email.addEventListener('input', function () {
        if (emailRegex.test(email.value) === false) {
            document.getElementById('emailErrorMsg').textContent =
                "Format de l'email incorrect";
        } else {
            document.getElementById('emailErrorMsg').textContent = '';
        }
    });
}

function setUpOrderForm() {
    const orderButton = document.getElementById('order');

    orderButton.addEventListener('click', (e) => {
        e.preventDefault();

        if (!productsFromBasket) {
            alert(
                'Votre panier est vide, veuillez sélectionner un article pour passer une commande'
            );

        }

        else if (
            !nameRegex.test(firstName.value) ||
            !nameRegex.test(lastName.value) ||
            !emailRegex.test(email.value) ||
            !adressRegex.test(city.value) ||
            !adressRegex.test(address.value)
        ) {
            alert('Veuillez remplir correctement tous les champs du formulaire');
        } else {

            let productIds = [];
            for (let i = 0; i < productsFromBasket.length; i++) {
                productIds.push(productsFromBasket[i].productId);
            }

            let buyOrder = {
                contact: {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    address: address.value,
                    city: city.value,
                    email: email.value,
                },
                products: productIds,
            };
            console.log(buyOrder);

            const postOptions = {
                method: 'POST',
                body: JSON.stringify(buyOrder),
                headers: {
                    'Content-type': 'application/json',
                },
            };
            fetch('http://localhost:3000/api/products/order', postOptions)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    const orderId = data.orderId;
                    window.location.href = 'confirmation.html?orderId=' + orderId;
                })
                .catch((error) => {
                    alert(error);
                });

        }

    })
}

getForm()
setUpOrderForm();
displayBasketCreation();

