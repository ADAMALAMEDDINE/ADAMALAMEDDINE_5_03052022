const urlParams = location.search;
const searchParams = new URLSearchParams(urlParams);
const productId = searchParams.get("orderId");

        document.querySelector("#orderId").innerHTML = productId + ' <br> Merci de votre commande !';
        localStorage.removeItem("produitKanapAdamOpcrp5");