<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar Categoría</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Editar Categoría
            </div>
            <div class="card-body">
                <form @submit.prevent="updateCategory">
                    <div class="row mb-3">
                        <label for="id" class="form-label">ID</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="tag" />
                            </div>
                            <input type="text" class="form-control" id="id" placeholder="ID de la Categoría" disabled v-model='category.id'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="name" class="form-label">Nombre:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="tag" />
                            </div>
                            <input type="text" class="form-control" id="name" placeholder="Nombre de la Categoría" v-model='category.name'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="description" class="form-label">Descripción:</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="building" />
                            </div>
                            <input type="text" class="form-control" id="description" placeholder="Descripción" v-model='category.description'>
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
    name: 'EditCategory',
    data() {
        return {
            category: {
                id: '',
                name: '',
                description: ''
            },
        };
    },
    methods: {
        cancel() {
            this.$router.push({ name: 'categories' });
        },
        async loadCategory() {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/categories/${this.$route.params.id}`);
                if (res.status === 200) {
                    this.category = res.data.category;
                }
            } catch (error) {
                Swal.fire('Error!', error.message, 'error');
            }
        },
        async updateCategory() {
            try {
                const res = await axios.put(`http://127.0.0.1:8000/api/categories/${this.$route.params.id}`, this.category);
                if (res.status === 200) {
                    this.$router.push({ name: 'categories' });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'La categoría ha sido actualizada',
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
        this.loadCategory();
    }
};
</script>
