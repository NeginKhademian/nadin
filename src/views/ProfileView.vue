<template>
  <a-card class="profile-wrp">
    <h2>{{ t("profile") }}</h2>
    <a-form>
      <a-form-item :label="t('name')">
        <a-input data-testid="name-input" v-model:value="name" />
      </a-form-item>
      <a-form-item :label="t('theme')">
        <a-select data-testid="theme-dropdown" v-model:value="theme" :options="themeOptions" >
          <template  #option="{ value: val, label }">
            <span :key="val" :aria-label="val">{{ t(label) }}</span>
          
          </template>
        </a-select>
      </a-form-item>

      <a-form-item :label="t('language')">
        <a-select data-testid="language-dropdown" v-model:value="selectedLocale" :options="languageOptions">
        </a-select>
      </a-form-item>

      <a-form-item>
        <a-button data-testid="save-button" type="primary" @click="saveProfile">{{
          `${t("update")}  ${t("profile")}`
        }}</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import { Form, Input, Select, Button, Card } from "ant-design-vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  components: {
    "a-form": Form,
    "a-form-item": Form.Item,
    "a-input": Input,
    "a-select": Select,
    "a-button": Button,
    "a-card": Card,
  },
  setup() {
    const { locale, t } = useI18n();
    const selectedLocale = ref<string>("fa");
    const store = useStore();
    const name = ref<string>("");
    const theme = ref<string>(store.state.appTheme || "light");

    const saveProfile = () => {
      locale.value = selectedLocale.value;
      localStorage.setItem("name", name.value);
      store.commit("setAppTheme", theme.value);
    };

    const languageOptions = [
      { value: "en", label: "english" },
      { value: "fa", label: "farsi" },
    ];

    const themeOptions = [
      { value: "light", label: "light" },
      { value: "dark", label: "dark" },
    ];

    watch(theme, (newVal) => {
      document.body.classList.remove("theme-light", "theme-dark");
      document.body.classList.add(`theme-${newVal}`);
    });

    return {
      name,
      theme,
      languageOptions,
      themeOptions,
      selectedLocale,
      saveProfile,
      t,
    };
  },
});
</script>
