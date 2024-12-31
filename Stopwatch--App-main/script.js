// Enhanced Stopwatch Script with Additional Visual Effects
class Stopwatch {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.reset();
        this.laps = [];
    }

    formatTime(value) {
        return value < 10 ? `0${value}` : value;
    }

    updateDisplay() {
        const hours = this.formatTime(this.hours);
        const minutes = this.formatTime(this.minutes);
        const seconds = this.formatTime(this.seconds);
        this.displayElement.innerHTML = `${hours} : ${minutes} : ${seconds}`;
        this.displayElement.style.animation = 'pulse 1s'; // Add pulse effect
        setTimeout(() => this.displayElement.style.animation = '', 1000);
    }

    start() {
        if (this.timerId) return;
        this.startTime = Date.now() - this.elapsedTime;
        this.timerId = setInterval(() => this.updateTime(), 1000);
    }

    updateTime() {
        this.elapsedTime = Date.now() - this.startTime;

        const totalSeconds = Math.floor(this.elapsedTime / 1000);
        this.hours = Math.floor(totalSeconds / 3600);
        this.minutes = Math.floor((totalSeconds % 3600) / 60);
        this.seconds = totalSeconds % 60;

        this.updateDisplay();
    }

    pause() {
        if (!this.timerId) return;
        clearInterval(this.timerId);
        this.timerId = null;
    }

    reset() {
        this.pause();
        this.elapsedTime = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.updateDisplay();
    }

    recordLap() {
        const lapTime = `${this.formatTime(this.hours)} : ${this.formatTime(this.minutes)} : ${this.formatTime(this.seconds)}`;
        this.laps.push(lapTime);

        const lapDisplay = document.createElement('div');
        lapDisplay.className = 'lap'; // Style lap entries
        lapDisplay.innerText = `Lap ${this.laps.length}: ${lapTime}`;
        document.querySelector('.laps-container').appendChild(lapDisplay);
    }
}

// DOM Elements
const timerDisplay = document.querySelector('.timerDisplay');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.createElement('button');

// Configure Lap Button
lapBtn.id = 'lapBtn';
lapBtn.className = 'btn';
lapBtn.style.setProperty('--clr', 'yellow');
lapBtn.innerText = 'Lap';
lapBtn.title = 'Record Lap';
document.querySelector('.buttons').appendChild(lapBtn);

// Create Lap Container
const lapContainer = document.createElement('div');
lapContainer.className = 'laps-container';
document.querySelector('.stopwatch').appendChild(lapContainer);

// Stopwatch Instance
const stopwatch = new Stopwatch(timerDisplay);

// Event Listeners
startBtn.addEventListener('click', () => stopwatch.start());
stopBtn.addEventListener('click', () => stopwatch.pause());
resetBtn.addEventListener('click', () => stopwatch.reset());
lapBtn.addEventListener('click', () => stopwatch.recordLap());




