<template>
  <a-layout-content :style="{ direction: direction }" class="container">
    <slot />
  </a-layout-content>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import { LayoutContent } from "ant-design-vue";
import useDirection from "../composables/useDirection";
import { useStore } from "vuex";
import { onMounted } from "vue";

export default {
  components: {
    "a-layout-content": LayoutContent,
  },
  setup() {
    const store = useStore();
    const { t } = useI18n();
    const { direction } = useDirection();
    onMounted(() => {
      store.commit("setAppTheme", localStorage.getItem("theme"));
    });
    return {
      t,
      direction,
    };
  },
};
</script>

<style scoped>
.container {
  margin: 24px 16px;
  padding: 16px;
  min-height: "280px";
}
</style>
