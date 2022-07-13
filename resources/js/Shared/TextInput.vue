<template>
  <ion-item :class="$attrs.class">
    <ion-label v-if="label" position="stacked" :for="id">{{ label }}:</ion-label>
    <ion-input :id="id" ref="input" v-bind="{ ...$attrs, class: null }" :class="{ error: error }" :type="type" :value="modelValue" @ion-input="$emit('update:modelValue', $event.target.value)" />
    <div v-if="error" class="form-error">{{ error }}</div>
  </ion-item>
</template>

<script>
import { v4 as uuid } from 'uuid'
import { IonInput, IonLabel, IonItem } from '@ionic/vue';

export default {
  components: {
    IonInput, IonLabel, IonItem,
  },
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default() {
        return `text-input-${uuid()}`
      },
    },
    type: {
      type: String,
      default: 'text',
    },
    error: String,
    label: String,
    modelValue: String,
  },
  emits: ['update:modelValue'],
  methods: {
    focus() {
      this.$refs.input.setFocus()
    },
    select() {
      this.$refs.input.select()
    },
    setSelectionRange(start, end) {
      this.$refs.input.setSelectionRange(start, end)
    },
  },
}
</script>
