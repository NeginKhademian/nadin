<template>
  <div>
    <a-button data-testid="edit" type="link" @click="$emit('onEdit')">
      {{ $t("edit") }}
    </a-button>
    <a-button data-testid="delete" type="link" @click="$emit('onDelete')">
      {{ $t("delete") }}
    </a-button>
  </div>
</template>

<script lang="ts">
import { Button } from "ant-design-vue";

export default {
  components: { "a-button": Button },
}
</script>
