<template>
    <div class="container">
        <h1>Listado de Clientes</h1>
        <button @click="newCustomer()" class="btn btn-success mx-2">
            <font-awesome-icon icon='plus' />
        </button>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Codigo</th>
                    <th scope="col">Documento</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Direccion</th>
                    <th scope="col">Cumpleaños</th>
                    <th scope="col">Celular</th>
                    <th scope="col">Email</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(customer, index) in customers" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ customer.id }}</td>
                    <td>{{ customer.document_number }}</td>
                    <td>{{ customer.first_name }}</td>
                    <td>{{ customer.last_name }}</td>
                    <td>{{ customer.address }}</td>
                    <td>{{ customer.birthday }}</td>
                    <td>{{ customer.phone_number }}</td>
                    <td>{{ customer.email }}</td>
                    <td>
                        <button @click="deleteCustomer(customer.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon='trash' />
                        </button>
                        <button @click="editCustomer(customer.id)" class="btn btn-warning mx-2">
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
import Swal from 'sweetalert2'
export default {
    name: 'customer',
    data() {
        return {
            customers: []
        }
    },
    methods: {
        deleteCustomer(id) {
            Swal.fire({
                title: `Do you want to delete the Customer with id ${id}?`,
                showCancelButton: true,
                confirmButtonText: 'Delete',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/customers/${id}`)
                        .then(response => {
                            if (response.data.success) {
                                Swal.fire('Deleted!', '', 'success')
                                this.loadCustomers() // Recarga la lista de clientes después de eliminar
                            }
                        })
                        .catch(error => {
                            Swal.fire('Error!', error.message, 'error')
                        })
                }
            })
        },
        editCustomer(id) {
            this.$router.push({ name: 'EditarCustomer', params: { id } })
        },
        newCustomer() {
            this.$router.push({ name: 'NewCustomer' })
        },
        loadCustomers() {
            axios
                .get('http://127.0.0.1:8000/api/customers')
                .then(response => (this.customers = response.data.customers))
        }
    },
    mounted() {
        this.loadCustomers()
    },
}
</script>
