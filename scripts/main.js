// EVENT COUNTER
function counter() {
    let countdownElement = document.getElementById('countdown');

    function getMidnight() {
        return new Date(2025, 9, 16, 0, 0, 0); // 16th October 2025 at midnight
    }

    function getTimeUntilMidnight() {
        return getMidnight().getTime() - new Date().getTime();
    }

    let previousDigits = {};

    function createDigit(value, unit) {
        const digits = value.toString().padStart(2, '0').split('');
        return digits.map((digit, index) => {
            const id = `${unit}-${index}`;
            const isChanged = previousDigits[id] !== undefined && previousDigits[id] !== digit;
            previousDigits[id] = digit;
            // Add animation class if changed
            return `<div class="countdown-digit${isChanged ? ' animate' : ''}" id="${id}">${digit}</div>`;
        }).join('');
    }

    function removeAnimationClasses() {
        const animated = document.querySelectorAll('.countdown-digit.animate');
        animated.forEach(el => {
            el.classList.remove('animate');
        });
    }

    const updateCountdown = () => {
        let remainingTime = getTimeUntilMidnight();

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            countdownElement.innerHTML = "Countdown finished!";
            return;
        }

        let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        let hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        let seconds = Math.floor((remainingTime / 1000) % 60);

        countdownElement.innerHTML = `
            <div class="countdown-unit">
                <div class="countdown-digits">${createDigit(days, 'days')}</div>
                <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-unit">
                <div class="countdown-digits">${createDigit(hours, 'hours')}</div>
                <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-unit">
                <div class="countdown-digits">${createDigit(minutes, 'minutes')}</div>
                <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-unit">
                <div class="countdown-digits">${createDigit(seconds, 'seconds')}</div>
                <span class="countdown-label">Seconds</span>
            </div>
        `;

        // Remove animation classes after animation duration (adjust if needed)
        setTimeout(removeAnimationClasses, 500);
    };

    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);
}

counter();




