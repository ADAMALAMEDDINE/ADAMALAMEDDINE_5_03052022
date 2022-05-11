(function () {
    "use strict" //permet de générer les erreurs qui n'étaient pas forcément relevées 
    const $items = document.querySelector("#items");

    function displayProduct(kanap) {
        $items.innerHTML +=
            `<a href="./product.html?id=${kanap._id}">
                <article>
                    <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
                    <h3 class="productName">${kanap.name}</h3>
                    <p class="productDescription">${kanap.description}</p>
                </article>
                </a> `;
    }
    function displayProducts(kanaps) {
        for (let i = 0; i < kanaps.length; i++) {
            const kanap = kanaps[i];
            displayProduct(kanap)
        }
    }

    async function fetchProducts() {
        const kanaps = await fetchKanaps();
        displayProducts(kanaps)
    }
    fetchProducts()
})()

