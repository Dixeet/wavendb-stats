import AppComponent from "./App.vue";
import { createApp } from "vue";

main();

function main() {
  setTimeout(() => {
    const navEl = document.querySelector(
      "#app > div.min-h-screen.bg-gray-100.flex.flex-col.justify-between nav > div.max-w-7xl.mx-auto.px-4 > div > div:nth-child(1) > div.hidden.space-x-6",
    );
    if (!navEl) {
      main();
      return;
    }
    navEl.innerHTML +=
      '<div id="vue-app" class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 "><span class="">Builds</span></div>';

    createApp(AppComponent).mount("#vue-app");
  }, 50);
}
