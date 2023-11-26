<template>
  <a-card>
    <a-space direction="vertical" style="width: 100%">
      <a-autocomplete
        v-model="selectedCityName"
        :options="filteredCityOptions"
        :option-label-prop="'label'"
        placeholder="Enter city name"
        @select="handleSelectOption"
      >
        <a-input :value="selectedCityName" @input="handleInputChange" />
      </a-autocomplete>

      <div v-if="loading">
        <a-spin />
      </div>
      <div v-else-if="weatherData">
        <h2>{{ weatherData.city }}</h2>
        <p>{{ $t('temperature') }}: {{ $t(`${weatherData.temperature}`) }}°C</p>
        <p>{{$t('weather') }}: {{  $t(`${weatherData.weather }`)}}</p>
      </div>
    </a-space>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from "vue";
import { Card, Space, Input, AutoComplete, Spin } from "ant-design-vue";
import cities from "@/../public/ir.json";
import wmo from "@/../public/wmo.json";

interface WeatherData {
  city: string;
  temperature: number;
  weather: string;
}

export default defineComponent({
  components: {
    "a-card": Card,
    "a-space": Space,
    "a-input": Input,
    "a-autocomplete": AutoComplete,
    "a-spin": Spin,
  },
  setup() {
    const selectedCityName = ref("");
    const cityOptions = computed(() =>
      cities.map((city) => ({ value: city.city, label: city.city }))
    );
    const weatherData = ref(null as WeatherData | null);
    const loading = ref(false);

    const filteredCityOptions = computed(() =>
      cityOptions.value.filter(({ label }) =>
        label.toLowerCase().includes(selectedCityName.value.toLowerCase())
      )
    );

    const handleInputChange = (e: Event) => {
      const value = (e.target as HTMLInputElement).value;
      selectedCityName.value = value;
      weatherData.value = null;
    };

    const handleSelectOption = (value: string): void => {
      selectedCityName.value = value;
      weatherData.value = null;
      fetchWeatherData(value);
    };

    const fetchWeatherData = async (cityName: string) => {
      loading.value = true;
      const selectedCity = cities.find(
        ({ city }) => city.toLowerCase() == cityName.toLowerCase()
      );

      if (selectedCity) {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.lng}&current_weather=true`;

        try {
          const response = await fetch(apiUrl);

          if (!response.ok) {
            throw new Error(`Failed to fetch weather data: ${response.status}`);
          }

          const data = await response.json();
          console.log("weather", data);
          weatherData.value = {
            city: data.city,
            temperature: data.current_weather.temperature,
            weather: getWMOInterpretation(data.current_weather.weathercode),
          };
        } catch (error) {
          console.error("Error fetching weather data:", error);
        } finally {
          loading.value = false;
        }
      }
    };

    const getWMOInterpretation = (code: keyof typeof wmo): string =>
      code in wmo ? wmo[code] : "";

    // Watch selectedCityName for changes and fetch weather data
    watchEffect(() => {
      if (selectedCityName.value) {
        fetchWeatherData(selectedCityName.value);
      }
    });

    return {
      selectedCityName,
      cityOptions,
      weatherData,
      loading,
      filteredCityOptions,
      handleInputChange,
      handleSelectOption,
    };
  },
});
</script>
