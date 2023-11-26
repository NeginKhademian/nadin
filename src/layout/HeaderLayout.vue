<template>
  <a-layout-header :class="headerClasses" :style="{ direction: direction }">
    <div class="header-content">
      <a-avatar
        class="header-avatar"
        :style="{
          marginLeft: direction === 'rtl' ? '8px' : 0,
          marginRight: direction === 'rtl' ? 0 : '8px',
        }"
      />
    </div>
  </a-layout-header>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { Avatar } from "ant-design-vue";
import useDirection from "../composables/useDirection";

export default {
  components: {
    "a-avatar": Avatar,
  },
  setup() {
    const store = useStore();
    const appTheme = computed(() => store.state.appTheme);
    const { direction } = useDirection();
    const headerClasses = computed(() => {
      return {
        "header-wrp": true,
        "header-wrp-light": appTheme.value === "light",
        "header-wrp-dark": appTheme.value === "dark",
      };
    });

    return {
      direction,
      headerClasses,
    };
  },
};
</script>

<style scoped>
.header-wrp {
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-wrp-light {
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
}

.header-wrp-dark {
  background-color: #001529;
  border-bottom: 1px solid #012a4f;
}
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
</style>
