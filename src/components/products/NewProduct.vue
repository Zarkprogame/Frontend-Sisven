<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Nuevo Producto</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Información del Producto
            </div>
            <div class="card-body">
                <form @submit.prevent="saveProduct">
                    <div class="row mb-3">
                        <label for="name" class="form-label">Nombre:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="name" placeholder="Nombre del Producto" v-model='product.name'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="price" class="form-label">Precio:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="number" class="form-control" id="price" placeholder="Precio del Producto" v-model='product.price'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="stock" class="form-label">Stock:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="number" class="form-control" id="stock" placeholder="Stock del Producto" v-model='product.stock'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="category_id" class="form-label">Categoría:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <select class="form-control" id="category_id" v-model="product.category_id">
                                <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
                            </select>
                        </div>
                    </div>
                    <button class="btn btn-primary" type="submit">Guardar</button>
                    <button class="btn btn-secondary mx-2" @click="cancel">Cancelar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'NewProduct',
    data() {
        return {
            product: {
                name: '',
                price: '',
                stock: '',
                category_id: ''
            },
            categories: []
        };
    },
    methods: {
        cancel() {
            this.$router.push({ name: 'products' });
        },
        async loadCategories() {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/categories');
                if (res.status === 200) {
                    this.categories = res.data.categories;
                }
            } catch (error) {
                Swal.fire('Error!', error.message, 'error');
            }
        },
        async saveProduct() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/products', this.product);
                if (res.status === 200) {
                    this.$router.push({ name: 'products' });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'El producto ha sido guardado',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                Swal.fire('Error!', error.message, 'error');
            }
        }
    },
    mounted() {
        this.loadCategories();
    }
};
</script>
