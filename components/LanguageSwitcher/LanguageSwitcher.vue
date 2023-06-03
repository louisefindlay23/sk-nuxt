<script setup>
import "/node_modules/flag-icons/css/flag-icons.min.css";
import "./LanguageSwitcher.css";

const nuxtApp = useNuxtApp();
const locale = nuxtApp.$i18n.locale;

const getLocales = useState("locales");
const locales = getLocales.value;

const switchLocale = (value) => {
  value = value.value;
  nuxtApp.$i18n.setLocale(value.lang);
  navigateTo(value.url);
};
</script>

<template>
  <!-- <v-select
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
  </v-select> -->

  <Dropdown
    v-model="locale"
    :options="locales"
    @change="switchLocale"
    optionLabel="lang_name"
    placeholder="Select a Country"
    class="w-full md:w-14rem"
  >
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex align-items-center">
        <img
          :alt="slotProps.value.label"
          src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
          :class="`mr-2 fi fi-${slotProps.value.substring(3)}`"
          style="width: 25px"
        />
        <div>{{ slotProps.value }}</div>
      </div>
      <span v-else>
        {{ slotProps.placeholder }}
      </span>
    </template>
    <template #option="slotProps">
      <div class="flex align-items-center">
        <!-- Convert stylesheet to CSS modules and remove inline style -->
        <img
          :alt="slotProps.option.lang_name"
          src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
          :class="`mr-2 fi fi-${slotProps.option.lang.substring(3)}`"
          style="width: 25px"
        />
        <div>{{ slotProps.option.lang_name }}</div>
      </div>
    </template>
  </Dropdown>
</template>