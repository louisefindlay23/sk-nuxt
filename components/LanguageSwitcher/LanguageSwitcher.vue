<script setup>
import "/node_modules/flag-icons/css/flag-icons.min.css";
import styles from "./LanguageSwitcher.module.css";

const nuxtApp = useNuxtApp();
const { locale } = useI18n();

const locales = ref(null);
const currentLocale = ref(null);

const fetchLocales = async () => {
  const getLocales = useState("locales");
  return await getLocales.value;
};

const switchLocale = (value) => {
  value = value.value;
  nuxtApp.$i18n.setLocale(value.lang);
  currentLocale.value = value;
  navigateTo(value.url);
};

onMounted(async () => {
  locales.value = await fetchLocales();
  // Find lang name from current locale to use in language selector display value
  currentLocale.value = locales.value.find((loc) => loc.lang === locale.value);
});

function getFlagName(flagName) {
  flagName = flagName.toString();
  return flagName.substring(3);
}
</script>

<!-- PrimeVue dropdown component to show country flags -->
<template>
  <div v-if="locales" :class="styles.languageSelect">
    <Dropdown
      v-model="locale"
      :options="locales"
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
            :alt="currentLocale.lang_name"
            src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
            :class="`mr-2 fi fi-${getFlagName(slotProps.value)} ${
              styles.dropdownDisplay
            } ${styles.dropdownImage}`"
          />
          <div v-if="currentLocale" :class="styles.dropdownDisplay">
            {{ currentLocale.lang_name }}
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