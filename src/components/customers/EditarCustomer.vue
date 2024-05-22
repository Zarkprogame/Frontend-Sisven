<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar Cliente</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Editar Cliente
            </div>
            <div class="card-body">
                <form @submit.prevent="updateCustomer">
                    <div class="row mb-3">
                        <label for="id" class="form-label">Código</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="tag" />
                            </div>
                            <input type="text" class="form-control" id="id" placeholder="Id Customer" disabled v-model='customer.id'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="document_number" class="form-label">Documento: </label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="building" />
                            </div>
                            <input type="text" class="form-control" id="document_number" placeholder="Customer Document" v-model='customer.document_number'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="first_name" class="form-label">Nombre: </label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="user" />
                            </div>
                            <input type="text" class="form-control" id="first_name" placeholder="Customer Name" v-model='customer.first_name'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="last_name" class="form-label">Apellido: </label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="user" />
                            </div>
                            <input type="text" class="form-control" id="last_name" placeholder="Customer lastname" v-model='customer.last_name'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="address" class="form-label">Direccion: </label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="building" />
                            </div>
                            <input type="text" class="form-control" id="address" placeholder="Customer Address" v-model='customer.address'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="birthday" class="form-label">Cumpleaños: </label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="building" />
                            </div>
                            <input type="date" class="form-control" id="birthday" placeholder="Customer Birthday" v-model='customer.birthday'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="phone_number" class="form-label">Celular: </label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="phone" />
                            </div>
                            <input type="text" class="form-control" id="phone_number" placeholder="Customer Phone Number" v-model='customer.phone_number'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="email" class="form-label">Email: </label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="building" />
                            </div>
                            <input type="email" class="form-control" id="email" placeholder="Customer Email" v-model='customer.email'>
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
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: 'EditCustomer',
    data() {
        return {
            customer: {
                id: 0,
                document_number: '',
                first_name: '',
                last_name: '',
                address: '',
                birthday: '',
                phone_number: '',
                email: ''
            },
        }
    },
    methods: {
        cancel() {
            this.$router.push({ name: 'customers' }) // Usar 'customers' en minúsculas
        },

        async loadCustomer() {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/customers/${this.$route.params.id}`)
                if (res.status === 200) {
                    this.customer = res.data.customer
                }
            } catch (error) {
                Swal.fire('Error!', error.message, 'error')
            }
        },

        async updateCustomer() {
            try {
                const res = await axios.post(`http://127.0.0.1:8000/api/customers/${this.$route.params.id}`, this.customer)
                if (res.status === 200) {
                    this.$router.push({ name: 'customers' }) // Usar 'customers' en minúsculas
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Customer has been updated',
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            } catch (error) {
                Swal.fire('Error!', error.message, 'error')
            }
        }
    },
    mounted() {
        this.loadCustomer()
    }
}
</script>
