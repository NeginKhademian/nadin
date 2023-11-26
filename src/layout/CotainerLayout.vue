<template>
  <a-layout-content :style="{ direction: direction }" class="container">
    <slot />
  </a-layout-content>
</template>

<script>
import { useI18n } from "vue-i18n";
import { ALayoutContent } from "ant-design-vue";
import useDirection from "../composables/useDirection";

export default {
  components: {
    ALayoutContent,
  },
  setup() {
    const { t } = useI18n();
    const { direction } = useDirection();

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
