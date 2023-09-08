<template>
  <div>
    <button class="w-full h-full" @click="click">Stats</button>
    <teleport
      to="#app > div.min-h-screen.bg-gray-100.flex.flex-col.justify-between main"
    >
      <div v-show="open">
        <div
          id="stat-main"
          class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col bg-white dark:bg-gray-800 shadow text-gray-700 dark:text-gray-300 sm:rounded-lg mt-2"
        >
          <h2 class="text-2xl font-bold mb-5">Statistiques</h2>
          <h3 class="mb-1 text-xl">Items</h3>
          <hr class="mb-4" />
          <div class="flex flex-wrap gap-4 mb-5">
            <ItemComponent v-for="item in items" class="w-fit" :item="item">
            </ItemComponent>
          </div>
          <h3 class="mb-1 text-xl">Compagnons</h3>
          <hr class="mb-4" />
          <div class="flex flex-wrap gap-2 mb-5">
            <CompanionComponent
              v-for="companion in companions"
              class="w-fit"
              :companion="companion"
            >
            </CompanionComponent>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { useFetch } from "../composables/useFetch.js";
import ItemComponent from "./ItemComponent.vue";
import CompanionComponent from "./CompanionComponent.vue";
import { ref } from "vue";

const open = ref(false);
const items = ref([]);
const companions = ref([]);

async function click() {
  open.value = true;
  hideDom();
  if (items.value.length < 1) {
    await fetchData();
  }
}

async function fetchData() {
  const {
    props: {
      gameVersion,
      weapons,
      builds: { data: builds },
    },
  } = await useFetch("/builds");
  const equipments = {
    items: [],
    companions: [],
  };

  const gameVersionId = gameVersion[gameVersion.length - 1].id;
  const requests = [];
  weapons.forEach((weap) => {
    if (weap["god_id"] && weap.id) {
      requests.push(
        useFetch(
          `/builds?page=1&type=PVM&god=${weap["god_id"]}&weapon=${weap.id}&version=${gameVersionId}`,
        ).then((res) => {
          countEquipment(res.props.builds.data, equipments);
        }),
      );
    }
  });
  await Promise.all(requests);
  items.value = equipments.items.sort((a, b) => b.count - a.count).slice(0, 45);
  companions.value = equipments.companions
    .sort((a, b) => b.count - a.count)
    .slice(0, 30);
}

function countEquipment(builds, equipments) {
  builds.forEach((build) => {
    build.equipments.forEach((equip) => {
      const index = equipments.items.findIndex((e) => e.id === equip.id);
      if (index === -1) {
        equipments.items.push({
          ...equip,
          count: 1,
        });
      } else {
        equipments.items[index].count++;
      }
    });
    build.companions.forEach((companion) => {
      const index = equipments.companions.findIndex(
        (e) => e.id === companion.id,
      );
      if (index === -1) {
        equipments.companions.push({
          ...companion,
          count: 1,
        });
      } else {
        equipments.companions[index].count++;
      }
    });
  });
}

function hideDom() {
  const currentDomMain = document.querySelector(
    "#app > div.min-h-screen.bg-gray-100.flex.flex-col.justify-between main > div:not(#stat-main)",
  );
  if (currentDomMain && currentDomMain.style) {
    currentDomMain.style.display = "none";
  }

  const currentHeaderDom = document.querySelector(
    "#app > div.min-h-screen.bg-gray-100.flex.flex-col.justify-between header",
  );
  if (currentHeaderDom && currentHeaderDom.style) {
    currentHeaderDom.style.display = "none";
  }
}
</script>
