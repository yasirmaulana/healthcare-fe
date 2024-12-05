<script>
    import { Modal } from 'bootstrap';
    import ProductServices from '@/services/ProductServices';

    export default {
        data() {
            return{
                products: [],
                productForm: {
                    name:'',
                    sku:'',
                    imageUrl:'',
                    price: null,
                    description: '',
                    category: '',
                },
                editing: false,
                modalinstance: null

            }
        },
        computed: {
            modalTitle() {
                return this.editing ? "Edit Product":  "Add Employee";
            },
            buttonLabel(){
                return this.editing ? "Update" : "Save";
            }
        },
        methods:{
            showModal(product) {
                if(product) {
                    this.productForm = { ...product}
                    this.editing = true
                } else {
                    this.restForm()
                }
                if(!this.modalinstance) {
                    this.modalinstance = new Modal(document.getElementById('productModal'))
                }
                this.modalinstance.show()
            },
            saveProduct(){
                    const action = this.editing ? 'updateProduct':'addProduct';
                    ProductServices[action](this.productForm)
                        .then(()=>{
                            this.loadProducts();
                            this.modalinstance.hide();
                        })
            },
            loadProducts() {
                ProductServices.getProducts()
                    .then(Response => {
                        this.products = Response.data
                    })
                    .catch(error => {
                        console.error("Error loading products:", error);
                    });
            },
            deleteProduct(id){
                ProductServices.deleteProduct(id)
                    .then(this.loadProducts)
            },
            restForm(){
                this.productForm = {
                    name:'',
                    sku:'',
                    imageUrl:'',
                    price: null,
                    description: '',
                    category: '',
                };
                this.editing=false;
            },
        },
        mounted() {
            this.loadProducts()
        },
    }

</script>

<template>
    <div class="container mt-3">
        <button @click="showModal(null)" class="btn btn-primary mb-3">Add Product</button>
        <!-- <table class="table table-stripped mt-3">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Nama</th>
                    <th>SKU</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products.result" :key="product.id">
                    <td><img :src="product.imageUrl" width="100" height="100" /></td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.sku }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.description }}</td>
                    <td>{{ product.category }}</td>
                    <td>
                        <button class="btn btn-warning" @click="showModal(product)">Edit</button> <span></span>
                        <button class="btn btn-danger" @click="deleteProduct(product.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table> -->
        <!-- <div class="container mt-3"> -->
            <div class="row">
                <div 
                    class="col-md-4 mb-4" 
                    v-for="product in products.result" 
                    :key="product.id">
                    <div class="card h-100">
                        <img 
                            :src="product.imageUrl" 
                            class="card-img-top" 
                            alt="Product Image" 
                            style="max-height: 200px; object-fit: cover;" />
                        <div class="card-body">
                            <h5 class="card-title">{{ product.name }}</h5>
                            <p class="card-text">
                                <strong>SKU:</strong> {{ product.sku }}<br>
                                <strong>Price:</strong> {{ product.price }}<br>
                                <strong>Description:</strong> {{ product.description }}<br>
                                <strong>Category:</strong> {{ product.category }}
                            </p>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <button 
                                class="btn btn-warning btn-sm" 
                                @click="showModal(product)">Edit</button>
                            <button 
                                class="btn btn-danger btn-sm" 
                                @click="deleteProduct(product.id)">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        <!-- </div> -->


        <div class="modal fade" id="productModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ modalTitle }}</h5>
                        <button class="btn-close" type="button" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveProduct" >
                            <div class="mb-3">
                                <div class="form-label">Name</div>
                                <input type="text" class="form-control" v-model="productForm.name" required>
                            </div>
                            <div class="mb-3">
                                <div class="form-label">SKU</div>
                                <input type="text" class="form-control" v-model="productForm.sku" required>
                            </div>
                            <div class="mb-3">
                                <div class="form-label">Price</div>
                                <input type="text" class="form-control" v-model="productForm.price" required>
                            </div>
                            <div class="mb-3">
                                <div class="form-label">Description</div>
                                <input type="text" class="form-control" v-model="productForm.description" required>
                            </div>
                            <div class="mb-3">
                                <div class="form-label">Category</div>
                                <input type="text" class="form-control" v-model="productForm.category" required>
                            </div>
                            <div class="mb-3">
                                <div class="form-label">Image</div>
                                <input type="text" class="form-control" v-model="productForm.imageUrl" required>
                            </div>        
                            <button type="submit" class="button btn btn-primary">{{ buttonLabel }}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>