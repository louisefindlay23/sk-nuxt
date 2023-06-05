// PrimeVue plugin for Dropdown component
import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Dropdown from "primevue/dropdown";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: false });
  nuxtApp.vueApp.component("Dropdown", Dropdown);
});