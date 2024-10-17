<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/Polease.vue</code> to test HMR
    </p>
  </div>

  <p>
    <strong>PoleaseX</strong>, alias Polease
    <strong>NE<span class="text-blue-900">X</span>T</strong><br />
    A Vue.js 3 Polease fork based on Vite.
  </p>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const count = ref(0);
    return { count, msg: props.msg };
  },
};
</script>
