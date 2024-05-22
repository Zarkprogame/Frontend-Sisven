<template>
    <div class="container">
        <h1>Listado de Productos</h1>
        <button @click="newProduct()" class="btn btn-success mx-2">
            <font-awesome-icon icon="plus" />
        </button>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Categoría</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.stock }}</td>
                    <td>{{ product.Categoryname }}</td>
                    <td>
                        <button @click="deleteProduct(product.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editProduct(product.id)" class="btn btn-warning mx-2">
                            <font-awesome-icon icon="pencil" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
    name: "Product",
    data() {
        return {
            products: []
        };
    },
    methods: {
        newProduct() {
            this.$router.push({ name: "NewProduct" });
        },
        editProduct(id) {
            this.$router.push({ name: "EditProduct", params: { id } });
        },
        deleteProduct(id) {
            Swal.fire({
                title: `¿Desea eliminar el producto con ID ${id}?`,
                showCancelButton: true,
                confirmButtonText: "Eliminar",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/products/${id}`)
                        .then(response => {
                            if (response.data.success) {
                                Swal.fire("Eliminado!", "", "success");
                                this.loadProducts();
                            }
                        })
                        .catch(error => {
                            Swal.fire("Error!", error.message, "error");
                        });
                }
            });
        },
        loadProducts() {
            axios.get("http://127.0.0.1:8000/api/products")
                .then(response => (this.products = response.data.products));
        }
    },
    mounted() {
        this.loadProducts();
    }
};
</script>
