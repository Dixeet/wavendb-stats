<template>
  <div class="relative">
    <div
      v-show="hover"
      class="z-10 rounded-lg py-2 px-3 text-sm font-medium shadow-sm transition-opacity duration-300 bg-gray-900 text-white dark:bg-gray-700"
      role="tooltip"
      style="
        position: absolute;
        top: -5px;
        transform: translateY(-100%) translateX(calc(-50% + 40px));
        max-width: 400px;
        min-width: 300px;
      "
    >
      <div class="relative z-20">
        <div class="flex flex-col">
          <div
            v-if="companion['name_fr']"
            class="flex flex-row gap-2 items-center"
          >
            {{ companion["name_fr"] }}
          </div>
          <div
            style="white-space: pre-wrap"
            v-html="companion['description_fr']"
          ></div>
        </div>
      </div>
    </div>
    <div
      class="cursor-pointer"
      style="width: 80px"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <div class="absolute element-cost flex flex-col mt-2 z-10">
        <div class="h-4 w-4 justify-center flex" v-if="companion.cost1Element">
          <img
            class="z-0 absolute h-4 drop-shadow-lg"
            :src="`https://wavendb.com/img/elements/${companion.cost1Element}_new.png`"
          />
          <div class="text-sm text-white shadow-text z-10 absolute">
            {{ companion.cost1Value }}
          </div>
        </div>
        <div class="h-4 w-4 justify-center flex" v-if="companion.cost2Element">
          <img
            class="z-0 absolute h-4 drop-shadow-lg"
            :src="`https://wavendb.com/img/elements/${companion.cost2Element}_new.png`"
          />
          <div class="text-sm text-white shadow-text z-10 absolute">
            {{ companion.cost2Value }}
          </div>
        </div>
        <div class="h-4 w-4 justify-center flex" v-if="companion.cost3Element">
          <img
            class="z-0 absolute h-4 drop-shadow-lg"
            :src="`https://wavendb.com/img/elements/${companion.cost3Element}_new.png`"
          />
          <div class="text-sm text-white shadow-text z-10 absolute">
            {{ companion.cost3Value }}
          </div>
        </div>
      </div>
      <div class="relative" style="width: 80px; min-height: 80px">
        <img
          :src="`https://wavendb.com/img/companions/${companion.img}.png`"
          loading="lazy"
        /><img
          class="top-0 left-0 absolute"
          :src="`https://wavendb.com/img/companions/cadre_${companion.rarity}.png`"
        />
      </div>
      <div class="text-center">
        {{ companion.count }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps(["companion"]);
const hover = ref(false);
</script>
