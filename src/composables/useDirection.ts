import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export default function useDirection() {
  const { locale } = useI18n();

  const direction = computed(() => (locale.value === 'fa' ? 'rtl' : 'ltr'));

  return {
    direction,
  };
}