import {BASE_URL} from "./apiConfig";

const PRODUCT_BASE_URL = `${BASE_URL}/products`

export const getAllProducts = async () => (await fetch(`${PRODUCT_BASE_URL}`)).json()

export const addProduct = async (product) => ((await fetch(`${PRODUCT_BASE_URL}`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        product,
    }),
})).json())
