import axios from "axios";

const BASE_URL = "http://localhost:9090/api/v1/products"

export default {
    getProducts() {
        return axios.get(BASE_URL);
    },
    getProductById(id) {
        return axios.get(`${BASE_URL}/{id}`)
    },
    addProduct(product) {
        return axios.post(`${BASE_URL}`, product)
    },
    updateProduct(product){
        return axios.put(`${BASE_URL}/${product.id}`, product);
    },
    deleteProduct(id){
        return axios.delete(`${BASE_URL}/${id}`);
    }
}