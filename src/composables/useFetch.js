const baseUrl = "https://wavendb.com";
const { version: inertiaVersion } = JSON.parse(
  document.getElementById("app").attributes["data-page"].value,
);

export async function useFetch(url) {
  const res = await fetch(`${baseUrl}${url}`, {
    headers: {
      "x-inertia": "true",
      "x-inertia-version": inertiaVersion,
      "x-requested-with": "XMLHttpRequest",
    },
  });
  return res.json();
}
