<template>
  <a-config-provider
    :theme="{
      algorithm:
        appTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
    }"
  >
    <a-layout>
      <Sidebar />
      <a-layout>
        <Header />
        <Container>
          <router-view />
        </Container>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>

<script>
import { ConfigProvider, Layout, theme } from "ant-design-vue";
import Sidebar from "@/layout/SidebarLayout.vue";
import Header from "@/layout/HeaderLayout.vue";
import Container from "@/layout/CotainerLayout.vue";

export default {
  components: {
    "a-config-provider": ConfigProvider,
    "a-layout": Layout,
    Header,
    Sidebar,
    Container,
  },
  computed: {
    appTheme: {
      get() {
        return this.$store.state.appTheme;
      },
      set(theme) {
        this.$store.commit("setAppTheme", theme);
      },
    },
  },
  watch: {
    appTheme(newVal) {
      document.body.classList.remove("theme-light", "theme-dark");
      document.body.classList.add(`theme-${newVal}`);
    },
  },
  data() {
    return {
      theme,
    };
  },
};
</script>
