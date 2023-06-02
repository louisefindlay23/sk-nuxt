<script setup>
import "/node_modules/flag-icons/css/flag-icons.min.css";

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
    :modelValue="locale"
    @update:modelValue="switchLocale"
    label="lang_name"
    :options="locales"
  >
    <template slot="option" slot-scope="option">
      {{ console.info(option.lang.substring(3)) }}
      <span :class="['fi', `fi-${option.lang.substring(3)}`]"></span>
      <span>{{ option.lang_name }}</span>
    </template>
  </v-select>
</template>