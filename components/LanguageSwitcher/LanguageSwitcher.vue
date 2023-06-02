<script setup>
const nuxtApp = useNuxtApp();
const locale = nuxtApp.$i18n.locale;

const getLocales = useState("locales");
const locales = getLocales.value;

const switchLocale = (value) => {
  nuxtApp.$i18n.setLocale(value.lang);
  navigateTo(value.url);
};
</script>

<template>
  <v-select
    v-model="locale"
    @update:modelValue="switchLocale"
    label="lang_name"
    :options="locales"
  />
</template>