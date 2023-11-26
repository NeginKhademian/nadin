<template>
  <a-layout-sider
    :width="200"
    :class="sidebarClasses"
    :style="{ minHeight: '100vh', direction: direction }"
  >
    <div class="logo">{{ t("logo") }}</div>
    <a-menu :theme="appTheme" mode="vertical">
      <router-link
        exact
        v-for="sideBarLinks in routes"
        :key="sideBarLinks.path"
        :to="sideBarLinks.path"
      >
        <a-menu-item
          :class="
            sideBarLinks.path === $route.path
              ? 'ant-menu-item-selected'
              : 'ant-menu-item'
          "
          :key="sideBarLinks.path"
          >{{ t(sideBarLinks.name) }}</a-menu-item
        >
      </router-link>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { Menu } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import useDirection from "@/composables/useDirection";

export default {
  components: { "a-menu": Menu },
  setup() {
    const { t } = useI18n();
    const { direction } = useDirection();
    const store = useStore();

    const appTheme = computed(() => store.state.appTheme);

    const routes = [
      { path: "/", name: "dashboard" },
      { path: "/weather", name: "weather" },
      { path: "/profile", name: "profile" },
      { path: "/todo", name: "todo" },
    ];

    const sidebarClasses = computed(() => {
      return {
        "sidebar-wrp": true,
        "sidebar-wrp-light": appTheme.value === "light",
        "sidebar-wrp-dark": appTheme.value === "dark",
      };
    });
    return {
      t,
      direction,
      routes,
      sidebarClasses,
      appTheme,
    };
  },
};
</script>

<style scoped>
.sidebar-wrp {
  min-height: 100vh;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
}
.sidebar-wrp-light {
  border-right: 1px solid #e8e8e8;
  background-color: #fff;
}
.sidebar-wrp-dark {
  border-right: 1px solid #012a4f;
  background-color: #001529;
}
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
