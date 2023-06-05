<script setup>
import "/node_modules/flag-icons/css/flag-icons.min.css";
import styles from "./LanguageSwitcher.module.css";

const nuxtApp = useNuxtApp();
const locale = nuxtApp.$i18n.locale;

const getLocales = useState("locales");

// Find lang name from current locale to use in language selector display value
const getCurrentLocaleName = computed(() => {
  const locales = getLocales.value;
  return locales ? locales.find((loc) => loc.lang === locale.value) : undefined;
});

const switchLocale = (value) => {
  value = value.value;
  nuxtApp.$i18n.setLocale(value.lang);
  navigateTo(value.url);
};
</script>

// PrimeVue dropdown component to show country flags
<template>
  <div :class="styles.languageSelect">
    <Dropdown
      v-model="locale"
      :options="getLocales"
      @change="switchLocale"
      optionLabel="lang_name"
      placeholder="Select a Country"
      :class="`w-full md:w-14rem ${styles.dropdown}`"
    >
      <!-- Slot props to display country flags inside div -->

      <!-- Dropdown current value -->
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex align-items-center">
          <img
            :alt="slotProps.value.label"
            src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
            :class="`mr-2 fi fi-${slotProps.value.substring(3)} ${
              styles.dropdownDisplay
            } ${styles.dropdownImage}`"
          />
          <div v-if="getCurrentLocaleName" :class="styles.dropdownDisplay">
            {{ getCurrentLocaleName.lang_name }}
          </div>
        </div>
        <span v-else>
          {{ slotProps.placeholder }}
        </span>
      </template>
      <!-- Dropdown options -->
      <template #option="slotProps">
        <div class="flex align-items-center">
          <img
            :alt="slotProps.option.lang_name"
            src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
            :class="`mr-2 fi fi-${slotProps.option.lang.substring(3)} ${
              styles.dropdownDisplay
            } ${styles.dropdownImage}
          `"
          />
          <div :class="styles.dropdownDisplay">
            {{ slotProps.option.lang_name }}
          </div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>