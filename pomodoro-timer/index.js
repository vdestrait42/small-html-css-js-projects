const root = document.documentElement;
const time = document.querySelector(".time");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const start = document.querySelector(".start");
const stop = document.querySelector(".stop");
const gear = document.querySelector(".gear");
const check = document.querySelector(".check");
let editMode = false;
let setStartMinutes = parseInt(minutes.innerHTML);
let setStartSeconds = parseInt(seconds.innerHTML);
let setStartTimer = setStartMinutes * 60 + setStartSeconds;
let intervalId;

gear.addEventListener("click", () => {
  editMode = true;
  gear.hidden = true;
  check.hidden = false;
  time.classList.add("edit");
  stop.style.display = "none";
  start.style.display = "block";
  start.style.visibility = "hidden";
  clearInterval(intervalId);
  minutes.innerHTML = String(setStartMinutes).padStart(2, "0");
  seconds.innerHTML = String(setStartSeconds).padStart(2, "0");
  root.style.setProperty("--time-pct", 100);
});

check.addEventListener("click", () => {
  gear.hidden = false;
  check.hidden = true;
  time.classList.remove("edit");
  start.style.removeProperty("visibility");
  editMode = false;
  minutes.classList.remove("selected");
  seconds.classList.remove("selected");
});

start.addEventListener("click", () => {
  stop.style.display = "block";
  start.style.display = "none";
  let timer = parseInt(minutes.innerHTML) * 60 + parseInt(seconds.innerHTML);
  intervalId = setInterval(() => {
    if (!timer) {
      stopHandler();
      minutes.innerHTML = String(setStartMinutes).padStart(2, "0");
      seconds.innerHTML = String(setStartSeconds).padStart(2, "0");
      root.style.setProperty("--time-pct", 100);
      alert("Time is out!");
    } else {
      timer--;
      root.style.setProperty("--time-pct", (timer / setStartTimer) * 100);
      const mins = Math.floor(timer / 60);
      const secs = timer % 60;
      minutes.innerHTML = String(mins).padStart(2, "0");
      seconds.innerHTML = String(secs).padStart(2, "0");
    }
  }, 1000);
});

const stopHandler = () => {
  stop.style.display = "none";
  start.style.display = "block";
  start.style.removeProperty("visibility");
  clearInterval(intervalId);
};

stop.addEventListener("click", stopHandler);

minutes.addEventListener("click", (event) => {
  if (editMode) {
    seconds.classList.remove("selected");
    if (minutes.classList.contains("selected"))
      minutes.classList.remove("selected");
    else minutes.classList.add("selected");
  }
});

seconds.addEventListener("click", (event) => {
  if (editMode) {
    minutes.classList.remove("selected");
    if (seconds.classList.contains("selected"))
      seconds.classList.remove("selected");
    else seconds.classList.add("selected");
  }
});

document.addEventListener("keydown", (event) => {
  if (editMode && minutes.classList.contains("selected")) {
    switch (event.key) {
      case "ArrowUp":
        setStartMinutes = (setStartMinutes + 1) % 60;
        break;
      case "ArrowDown":
        setStartMinutes = (setStartMinutes - 1) % 60;
        break;
    }
    minutes.innerHTML = String(setStartMinutes).padStart(2, "0");
    setStartTimer = setStartMinutes * 60 + setStartSeconds;
  }

  if (editMode && seconds.classList.contains("selected")) {
    switch (event.key) {
      case "ArrowUp":
        setStartSeconds = (setStartSeconds + 1) % 60;
        break;
      case "ArrowDown":
        setStartSeconds = setStartSeconds - 1 === -1 ? 59 : setStartSeconds - 1;
        break;
    }
    seconds.innerHTML = String(setStartSeconds).padStart(2, "0");
    setStartTimer = setStartMinutes * 60 + setStartSeconds;
  }
});
