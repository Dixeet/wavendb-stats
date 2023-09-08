// ==UserScript==
// @name         Test
// @version      0.1
// @description
// @author       Dixeet
// @match        https://wavendb.com/*
// @grant        none
// @run-at document-idle
// ==/UserScript==

const vueScript = document.createElement("script");
document.body.append(vueScript);
vueScript.addEventListener("load", main);
vueScript.src = "https://unpkg.com/vue@3/dist/vue.global.prod.js";

function main() {
  const { createApp } = Vue;
  const AppComponent = vueComponent();

  const navEl = document.querySelector(
    "#app > div.min-h-screen.bg-gray-100.flex.flex-col.justify-between nav > div.max-w-7xl.mx-auto.px-4 > div > div:nth-child(1) > div.hidden.space-x-6",
  );
  navEl.innerHTML +=
    '<div id="vue-app" class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 "><span class="">Builds</span></div>';

  createApp(AppComponent).mount("#vue-app");
}

function vueComponent() {
  const { ref } = Vue;
  const StatComponent = statComponent();

  const components = {
    StatComponent,
  };

  const template = `<div class=""><StatComponent/></div>`;

  const setup = () => {};

  return {
    components,
    template,
    setup,
  };
}

function statComponent() {
  const template = `<button @click="click">Stats</button>`;

  const setup = () => {
    function click() {
      console.log("click");
    }

    return {
      click,
    };
  };

  return {
    template,
    setup,
  };
}
