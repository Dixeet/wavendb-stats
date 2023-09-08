<template>
  <div class="relative">
    <div
      v-show="hover"
      class="z-10 rounded-lg py-2 px-3 text-sm font-medium shadow-sm transition-opacity duration-300 bg-gray-900 text-white dark:bg-gray-700"
      role="tooltip"
      style="
        position: absolute;
        top: -5px;
        transform: translateY(-100%) translateX(calc(-50% + 32px));
        max-width: 400px;
        min-width: 300px;
      "
    >
      <div class="relative z-20">
        <div class="flex flex-col">
          <div v-if="item['name_fr']" class="flex flex-row gap-2 items-center">
            {{ item["name_fr"] }}
          </div>
          <div
            style="white-space: pre-wrap"
            v-html="item['description_fr']"
          ></div>
        </div>
      </div>
    </div>
    <div
      class="cursor-pointer"
      style="width: 64px"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <div class="relative flex justify-center">
        <img
          :src="`https://wavendb.com/img/equipment/${item.rarity}.png`"
        /><img
          class="top-0 left-0 absolute z-0"
          :src="`https://wavendb.com/img/equipment/${item.img}.png`"
          loading="lazy"
        />
      </div>
      <div class="text-center">
        {{ item.count }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps(["item"]);
const hover = ref(false);
</script>
