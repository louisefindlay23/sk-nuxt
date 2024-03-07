<script setup>
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { getLocales } from "~/lib/getLocales";

const nuxtApp = useNuxtApp();
const { locale } = useI18n();

const locales = ref([]);
const currentLocale = ref(null);

const useLocales = async (local) => {
  const prismic = usePrismic();
  return await getLocales(local, prismic.client);
};

// Fetch and set locales data
const fetchLocales = async () => {
  const injectedLocales = await useLocales(nuxtApp.$page.value);
  locales.value = injectedLocales;

  // Find current locale
  currentLocale.value = locales.value.find((loc) => loc.lang === locale.value);
};

onBeforeMount(fetchLocales);

const switchLocale = (value) => {
  value = value.value;
  const switchLocalePath = useSwitchLocalePath();
  currentLocale.value = value;
  navigateTo(switchLocalePath(value.lang));
};

function getFlagName(flagName) {
  flagName = flagName.toString();
  return flagName.substring(3);
}
</script>

<!-- PrimeVue dropdown component to show country flags -->
<template>
  <div v-if="locales" class="languageSelect">
    <Dropdown
      v-model="locale"
      :options="locales"
      @change="switchLocale"
      optionLabel="lang_name"
      placeholder="Select a Country"
      class="w-full md:w-14rem dropdown"
    >
      <!-- Slot props to display country flags inside div -->

      <!-- Dropdown current value -->
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex align-items-center">
          <img
            :alt="currentLocale?.value?.lang_name"
            src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
            :class="`mr-2 fi fi-${getFlagName(slotProps.value)} dropdownDisplay
            dropdownImage`"
          />
          <div v-if="currentLocale" class="dropdownDisplay">
            {{ currentLocale.lang_name }}
          </div>
          <div v-else class="dropdownDisplay">
            {{ locale.lang_name }}
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
            :class="`dropdownDisplay
           dropdownImage mr-2 fi fi-${slotProps.option.lang.substring(3)}
          `"
          />
          <div class="dropdownDisplay">
            {{ slotProps.option.lang_name }}
          </div>
        </div>
      </template>
    </Dropdown>
  </div>
  <div v-else class="languageSelect"></div>
</template>

<style scoped>
.languageSelect {
  display: flex;
  align-items: center;
}

.dropdown {
  width: 18rem;
}

.dropdownImage {
  margin-right: 10px;
}

.dropdownDisplay {
  display: inline;
}

@media only screen and (max-width: 599px) {
  .languageSelect {
    justify-content: center;
  }
}
</style>
