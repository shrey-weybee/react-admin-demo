import {BASE_URL} from "./apiConfig";

const PRODUCT_BASE_URL = `${BASE_URL}/products`

export const getAllProducts = async () => (await fetch(`${PRODUCT_BASE_URL}`)).json()
export const getProductById = async (id) => (await fetch(`${PRODUCT_BASE_URL}/${id}`)).json()

export const addProduct = async (product) => ((await fetch(`${PRODUCT_BASE_URL}`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
})).json())

export const updateProduct = async (product) => ((await fetch(`${PRODUCT_BASE_URL}/${product.id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
})).json())

export const deleteProduct = async (id) => ((await fetch(`${PRODUCT_BASE_URL}/${id}`, {
    method: "DELETE",
})).json())
