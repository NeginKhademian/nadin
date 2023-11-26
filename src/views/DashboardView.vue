<template>
  <a-card>
    <div>
      <a-typography class="centered-text">
        {{ t("time") }}: {{ currentHour }} : {{ currentMinutes }}
      </a-typography>
      <a-typography class="centered-text">{{ greetingMessage }} {{name}}</a-typography>
    </div>
  </a-card>
</template>

<script>
import { ref, onMounted } from "vue";
import dayjs from "dayjs";
import { Typography, Card } from "ant-design-vue";
import { useI18n } from "vue-i18n";

export default {
  components: {
    "a-card": Card,
    ATypography: Typography,
  },
  setup() {
    const { t } = useI18n();

    const currentHour = ref(getCurrentHour());
    const currentMinutes = ref(getCurrentMinutes());
    const greetingMessage = ref(getGreetingMessage());
    const name = ref(localStorage.getItem("name") || "user");

    function getCurrentHour() {
      const now = dayjs();
      return now.hour();
    }

    function getCurrentMinutes() {
      const now = dayjs();
      return now.minute();
    }

    function getGreetingMessage() {
      const now = dayjs();
      const hours = now.hour();
      return hours < 12 ? t("goodMorning") : t("goodAfternoon");
    }

    onMounted(() => {
      // Update the time every minute
      setInterval(() => {
        currentHour.value = getCurrentHour();
        currentMinutes.value = getCurrentMinutes();
      }, 60000);
    });

    return {
      currentHour,
      currentMinutes,
      greetingMessage,
      name,
      t,
    };
  },
};
</script>

<style scoped>
.centered-text {
  text-align: center;
}
</style>
