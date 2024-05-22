<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Nuevo Método de Pago</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Información del Método de Pago
            </div>
            <div class="card-body">
                <form @submit.prevent="savePaymode">
                    <div class="row mb-3">
                        <label for="id" class="form-label">ID</label>
                        <div class="input-group">
                            <div class="input-group-text"> <font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="ID del Método de Pago" disabled
                                v-model='paymode.id'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="name" class="form-label">Nombre: </label>
                        <div class="input-group">
                            <div class="input-group-text"> <font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="name" placeholder="Nombre del Método de Pago"
                                v-model='paymode.name'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="observation" class="form-label">Observación: </label>
                        <div class="input-group">
                            <div class="input-group-text"> <font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="observation" placeholder="Observación"
                                v-model='paymode.observation'>
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
    name: 'NewPaymode',
    data() {
        return {
            paymode: {
                id: '',
                name: '',
                observation: ''
            },
        }
    },
    methods: {
        cancel() {
            this.$router.push({ name: 'paymodes' })
        },

        async savePaymode() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/paymodes', this.paymode)
                if (res.status === 200) {
                    this.$router.push({ name: 'paymodes' })
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'El método de pago ha sido guardado',
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            } catch (error) {
                Swal.fire('Error!', error.message, 'error')
            }
        }
    },
}
</script>
