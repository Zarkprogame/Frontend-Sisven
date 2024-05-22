<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Nueva Categoría</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Información de la Categoría
            </div>
            <div class="card-body">
                <form @submit.prevent="saveCategory">
                    <div class="row mb-3">
                        <label for="name" class="form-label">Nombre:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="name" placeholder="Nombre de la Categoría" v-model='category.name'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="description" class="form-label">Descripción:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
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
    name: 'NewCategory',
    data() {
        return {
            category: {
                name: '',
                description: ''
            },
        };
    },
    methods: {
        cancel() {
            this.$router.push({ name: 'categories' });
        },
        async saveCategory() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/categories', this.category);
                if (res.status === 200) {
                    this.$router.push({ name: 'categories' });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'La categoría ha sido guardada',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                Swal.fire('Error!', error.message, 'error');
            }
        }
    },
};
</script>
