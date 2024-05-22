<template>
    <div class="container">
        <h1>Listado de Métodos de Pago</h1>
        <button @click="newPaymode()" class="btn btn-success mx-2">
            <font-awesome-icon icon='plus' />
        </button>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Observación</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(paymode, index) in paymodes" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ paymode.id }}</td>
                    <td>{{ paymode.name }}</td>
                    <td>{{ paymode.observation }}</td>
                    <td>
                        <button @click="deletePaymode(paymode.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon='trash' />
                        </button>
                        <button @click="editPaymode(paymode.id)" class="btn btn-warning mx-2">
                            <font-awesome-icon icon='pencil' />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from "axios";
import Swal from 'sweetalert2';

export default {
    name: 'paymode',
    data() {
        return {
            paymodes: []
        };
    },
    methods: {
        deletePaymode(id) {
            Swal.fire({
                title: `¿Deseas eliminar el método de pago con id ${id}?`,
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/paymodes/${id}`)
                        .then(response => {
                            if (response.data.success) {
                                Swal.fire('¡Eliminado!', '', 'success');
                                this.loadPaymodes(); // Recarga la lista de métodos de pago después de eliminar
                            }
                        })
                        .catch(error => {
                            Swal.fire('¡Error!', error.message, 'error');
                        });
                }
            });
        },
        editPaymode(id) {
            this.$router.push({ name: 'EditarPaymode', params: { id } });
        },
        newPaymode() {
            this.$router.push({ name: 'NewPaymode' });
        },
        loadPaymodes() {
            axios
                .get('http://127.0.0.1:8000/api/paymodes')
                .then(response => (this.paymodes = response.data.paymodes));
        }
    },
    mounted() {
        this.loadPaymodes();
    },
};
</script>