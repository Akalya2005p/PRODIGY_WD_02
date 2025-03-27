let timer;
let seconds = 0, minutes = 0, hours = 0;
let isRunning = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapsContainer = document.getElementById("laps");

function updateDisplay() {
    const formattedTime = 
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds);
    display.innerText = formattedTime;
}

function startTimer() {
    if (!isRunning) {
        timer = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
                if (minutes === 60) {
                    minutes = 0;
                    hours++;
                }
            }
            updateDisplay();
        }, 1000);
        isRunning = true;
        startBtn.innerText = "Lap";
        pauseBtn.removeAttribute("disabled");
        resetBtn.removeAttribute("disabled");
    } else {
        recordLap();
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    startBtn.innerText = "Resume";
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    seconds = minutes = hours = 0;
    updateDisplay();
    startBtn.innerText = "Start";
    pauseBtn.setAttribute("disabled", "true");
    resetBtn.setAttribute("disabled", "true");
    lapsContainer.innerHTML = "";
}

function recordLap() {
    const lapItem = document.createElement("li");
    lapItem.className = "list-group-item";
    lapItem.innerText = display.innerText;
    lapsContainer.appendChild(lapItem);
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
