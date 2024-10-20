// Step 1: Declare variables
let timer, isPaused = false, isRunning = false, minutes = 25, seconds = 0;

// Grab elements from the DOM for displaying time and control buttons
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

// Step 2: Define the function to update time every second
function updateTime() {
    // Check if the timer is not paused and there is time left
    if (!isPaused && (minutes > 0 || seconds > 0)) {
        // Decrease seconds; if seconds hit 0, decrease minutes and reset seconds to 59
        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateDisplay(); // Refresh the displayed time
    } else {
        clearInterval(timer); // Stop the timer if time is up
        isRunning = false; // Update the running state
        if (minutes === 0 && seconds === 0) alert('Time is up!'); // Alert when time is up
    }
}

// Step 3: Add event listeners for Start, Pause, and Reset actions

// Start the timer if it is not already running
startButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true; // Update running state
        timer = setInterval(updateTime, 1000); // Call updateTime every second
    }
});

// Pause or resume the timer when the Pause button is clicked
pauseButton.addEventListener('click', () => {
    isPaused = !isPaused; // Toggle between paused and running
    if (!isPaused) {
        timer = setInterval(updateTime, 1000); // Resume the timer
    } else {
        clearInterval(timer); // Pause the timer
    }
});

// Reset the timer to its initial state (25 minutes, 0 seconds)
resetButton.addEventListener('click', () => {
    clearInterval(timer); // Stop the timer
    isRunning = isPaused = false; // Reset running and paused states
    minutes = 25; // Reset minutes to 25
    seconds = 0; // Reset seconds to 0
    updateDisplay(); // Update the display to show the reset time
});

// Step 4: Update the display to show the current minutes and seconds
function updateDisplay() {
    // Format minutes and seconds to always show 2 digits (e.g., 09:05)
    minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
}
