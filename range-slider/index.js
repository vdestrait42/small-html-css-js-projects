const MAX_PRICE = 50;
const root = document.documentElement;
const slider = document.querySelector("input[type='range']");
const price = document.querySelector(".price");

price.innerHTML = ((slider.value / 100) * MAX_PRICE).toFixed(2);

slider.addEventListener("input", (event) => {
  root.style.setProperty("--slide-value-pct", event.target.value);
  price.innerHTML = ((event.target.value / 100) * MAX_PRICE).toFixed(2);
});
