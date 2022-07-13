<template>
  <div>
    <Head :title="`${form.first_name} ${form.last_name}`" />
    <div class="flex justify-start items-center mb-8 max-w-3xl">
      <h1 class="text-3xl font-bold">
        <Link class="text-indigo-400 hover:text-indigo-600" href="/users">Users</Link>
        <span class="text-indigo-400 font-medium">/</span>
        {{ form.first_name }} {{ form.last_name }}
      </h1>
      <img v-if="user.photo" class="block ml-4 w-8 h-8 rounded-full" :src="user.photo" />
    </div>
    <trashed-message v-if="user.deleted_at" class="mb-6" @restore="restore"> This user has been deleted. </trashed-message>
    <ion-card class="max-w-3xl overflow-hidden m-0" mode="ios">
      <ion-card-content class="p-0">
        <form @submit.prevent="update">
          <div class="flex flex-wrap -mb-8 -mr-6 p-8">
            <text-input v-model="form.first_name" :error="form.errors.first_name" class="pb-8 pr-6 w-full lg:w-1/2" label="First name" />
            <text-input v-model="form.last_name" label="Last name" :error="form.errors.first_name" class="pb-8 pr-6 w-full lg:w-1/2" />
            <text-input v-model="form.email" :error="form.errors.email" label="Email" class="pb-8 pr-6 w-full lg:w-1/2" /> 
            <text-input v-model="form.password" :error="form.errors.password" type="password" autocomplete="new-password" label="Password" class="pb-8 pr-6 w-full lg:w-1/2" />
            
            <ion-item class="pb-8 pr-6 w-full lg:w-1/2">
              <ion-label position="stacked">Owner</ion-label>
              <ion-select v-model="form.owner" interface="action-sheet" :error="form.errors.owner" placeholder="Select Owner">
                <ion-select-option :value="true">Yes</ion-select-option>
                <ion-select-option :value="false">No</ion-select-option>
              </ion-select>
            </ion-item>

            <file-input v-model="form.photo" class="pb-8 pr-6 w-full lg:w-1/2" :error="form.errors.photo" accept="image/*" label="Photo" />
          </div>
          <div class="flex items-center px-8 py-4 bg-gray-50 border-t border-gray-100 justify-between">
            <ion-button v-if="!user.deleted_at" color="danger" tabindex="-1" type="button" @click="destroy">Delete User</ion-button>
            <ion-button :loading="form.processing" type="submit">Update User</ion-button>
          </div>
        </form>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script>

import { Head, Link } from '@inertiajs/inertia-vue3'
import Layout from '@/Shared/Layout'
import FileInput from '@/Shared/FileInput'
import TextInput from '@/Shared/TextInput'
import TrashedMessage from '@/Shared/TrashedMessage'
import { 
  IonButton, alertController, IonLabel, 
  IonItem, IonSelect, IonSelectOption,
  IonCard,
} from '@ionic/vue'

export default {
  components: {
    FileInput,
    Head,
    Link,
    TrashedMessage,
    IonButton,
    IonLabel,
    IonItem,
    IonSelect,
    IonSelectOption,
    TextInput,
    IonCard,
  },
  layout: Layout,
  props: {
    user: Object,
  },
  remember: 'form',
  data() {
    return {
      alertIsOpen: false,
      form: this.$inertia.form({
        _method: 'put',
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        password: '',
        owner: this.user.owner,
        photo: null,
      }),
    }
  },
  methods: {
    update() {
      this.form.post(`/users/${this.user.id}`, {
        onSuccess: () => this.form.reset('password', 'photo'),
      })
    },
    async destroy() {
      const alert = await alertController.create({
        header: 'Delete User?',
        mode: 'ios',
        message: 'Are you sure you want to delete this user?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Ok',
            role: 'destructive',
            handler: () => this.$inertia.delete(`/users/${this.user.id}`),
          },
        ],
      })
      alert.present()
    },
    restore() {
      if (confirm('Are you sure you want to restore this user?')) {
        this.$inertia.put(`/users/${this.user.id}/restore`)
      }
    },
  },
}
</script>
