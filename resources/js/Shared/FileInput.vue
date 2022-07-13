<template>
  <ion-item>
    <ion-label position="stacked" v-if="label">{{ label }}:</ion-label>
    <div class="border-0 p-0 flex items-center justify-between" :class="{ error: errors.length }">
      <input ref="file" type="file" :accept="accept" class="hidden" @change="change" />
      <div v-if="!modelValue" class="p-2">
        <ion-button size="small" color="success" type="button" @click="browse">Browse</ion-button>
      </div>
      <div v-else class="flex items-center justify-between p-2">
        <div class="flex-1 pr-1">
          {{ modelValue.name }} <span class="text-gray-500 text-xs">({{ filesize(modelValue.size) }})</span>
        </div>
        <ion-button size="small" type="button" color="danger" @click="remove">Remove</ion-button>
      </div>
    </div>
    <div v-if="errors.length" class="form-error">{{ errors[0] }}</div>
  </ion-item>
</template>

<script>
import { IonButton, IonItem, IonLabel } from '@ionic/vue'
export default {
  components: {
    IonButton,
    IonItem, IonLabel,
  },
  props: {
    modelValue: File,
    label: String,
    accept: String,
    errors: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  watch: {
    modelValue(value) {
      if (!value) {
        this.$refs.file.value = ''
      }
    },
  },
  methods: {
    filesize(size) {
      var i = Math.floor(Math.log(size) / Math.log(1024))
      return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
    },
    browse() {
      this.$refs.file.click()
    },
    change(e) {
      this.$emit('update:modelValue', e.target.files[0])
    },
    remove() {
      this.$emit('update:modelValue', null)
    },
  },
}
</script>
