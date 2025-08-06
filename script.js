document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const startButton = document.getElementById('start-btn');
    const pauseButton = document.getElementById('pause-btn');
    const resetButton = document.getElementById('reset-btn');
    const sessionTypeDisplay = document.getElementById('session-type');
    const completedSessionsDisplay = document.getElementById('completed-sessions');
    const workDurationInput = document.getElementById('work-duration');
    const breakDurationInput = document.getElementById('break-duration');
    
    // Timer variables
    let timer;
    let isRunning = false;
    let isWorkSession = true;
    let completedSessions = 0;
    
    // Initial timer values
    let workDuration = 25;
    let breakDuration = 5;
    let currentMinutes = workDuration;
    let currentSeconds = 0;
    
    // Update the display
    function updateDisplay() {
        minutesDisplay.textContent = currentMinutes.toString().padStart(2, '0');
        secondsDisplay.textContent = currentSeconds.toString().padStart(2, '0');
        
        if (isWorkSession) {
            sessionTypeDisplay.textContent = 'Work Session';
            sessionTypeDisplay.className = 'work-session';
        } else {
            sessionTypeDisplay.textContent = 'Break Time';
            sessionTypeDisplay.className = 'break-session';
        }
        
        completedSessionsDisplay.textContent = completedSessions;
    }
    
    // Start the timer
    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            startButton.disabled = true;
            pauseButton.disabled = false;
            
            timer = setInterval(() => {
                if (currentSeconds === 0) {
                    if (currentMinutes === 0) {
                        // Timer completed
                        clearInterval(timer);
                        isRunning = false;
                        
                        // Play sound
                        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
                        audio.play();
                        
                        // Switch session type
                        isWorkSession = !isWorkSession;
                        
                        // Increment completed sessions if work session completed
                        if (!isWorkSession) {
                            completedSessions++;
                        }
                        
                        // Set new timer values based on session type
                        if (isWorkSession) {
                            currentMinutes = parseInt(workDurationInput.value) || workDuration;
                            currentSeconds = 0;
                        } else {
                            currentMinutes = parseInt(breakDurationInput.value) || breakDuration;
                            currentSeconds = 0;
                        }
                        
                        updateDisplay();
                        startTimer(); // Auto-start next session
                    } else {
                        currentMinutes--;
                        currentSeconds = 59;
                    }
                } else {
                    currentSeconds--;
                }
                
                updateDisplay();
            }, 1000);
        }
    }
    
    // Pause the timer
    function pauseTimer() {
        clearInterval(timer);
        isRunning = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
    
    // Reset the timer
    function resetTimer() {
        pauseTimer();
        isWorkSession = true;
        workDuration = parseInt(workDurationInput.value) || 25;
        breakDuration = parseInt(breakDurationInput.value) || 5;
        currentMinutes = workDuration;
        currentSeconds = 0;
        updateDisplay();
    }
    
    // Event listeners
    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
    
    // Initialize display
    updateDisplay();
});
