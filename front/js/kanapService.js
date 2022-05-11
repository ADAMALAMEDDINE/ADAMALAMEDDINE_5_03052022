async function fetchKanaps() {
    try {
        const response = await fetch("http://localhost:3000/api/products");
        if (!response.ok) {
            throw new Error("message : une erreur est survenue, statut de la requête :" + response.status)

        }
        const kanaps = await response.json();
        return kanaps;
    } catch (error) {
        return { error }

    }
}
async function fetchKanap(id) {
    try {
        const response = await fetch("http://localhost:3000/api/products/" + id);
        if (!response.ok) {
            throw new Error("message : une erreur est survenue, statut de la requête :" + response.status)

        }
        const kanap = await response.json();
        return kanap;
    } catch (error) {
        return { error }

    }
}
async function fetchKanapsOrder(buyOrder) {
    try {
        const postOptions = {
            method: 'POST',
            body: JSON.stringify(buyOrder),
            headers: {
                'Content-type': 'application/json',
            },
        };
        const response = await fetch("http://localhost:3000/api/products/order");
        if (!response.ok) {
            throw new Error("message : une erreur est survenue, statut de la requête :" + response.status)

        }
        const order = await response.json();
        return order;
    } catch (error) {
        return { error }

    }
}