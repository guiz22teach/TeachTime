document.addEventListener('DOMContentLoaded', function() {
    function setClock(clockElement, type) {
        const now = new Date();
        let degrees;

        if (type === 'hour') {
            const hours = now.getHours() % 12; // Ensure hours are in 12-hour format
            const minutes = now.getMinutes();
            degrees = ((hours / 12) * 360) + ((minutes / 60) * 30) - 90; // Adjust for minutes and correct offset
            clockElement.querySelector('.hour-hand').style.transform = `rotate(${degrees}deg)`;
        } else if (type === 'minute') {
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            degrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) - 90; // Adjust for seconds and correct offset
            clockElement.querySelector('.minute-hand').style.transform = `rotate(${degrees}deg)`;
        } else if (type === 'second') {
            const seconds = now.getSeconds();
            degrees = ((seconds / 60) * 360) - 90; // Correct offset
            clockElement.querySelector('.second-hand').style.transform = `rotate(${degrees}deg)`;
        } else {
            const seconds = now.getSeconds();
            const minutes = now.getMinutes();
            const hours = now.getHours() % 12; // Ensure hours are in 12-hour format
            const secondDegrees = ((seconds / 60) * 360) - 90; // Correct offset
            const minuteDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) - 90; // Correct offset
            const hourDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) - 90; // Correct offset

            clockElement.querySelector('.second-hand').style.transform = `rotate(${secondDegrees}deg)`;
            clockElement.querySelector('.minute-hand').style.transform = `rotate(${minuteDegrees}deg)`;
            clockElement.querySelector('.hour-hand').style.transform = `rotate(${hourDegrees}deg)`;
        }
    }

    function updateClocks() {
        setClock(document.getElementById('hour-clock'), 'hour');
        setClock(document.getElementById('minute-clock'), 'minute');
        setClock(document.getElementById('second-clock'), 'second');
        setClock(document.getElementById('full-clock'), 'full');
    }

    function createMinuteMarkers() {
        const clocks = document.querySelectorAll('.clock');
        clocks.forEach(clock => {
            for (let i = 0; i < 60; i++) {
                const marker = document.createElement('div');
                marker.classList.add('marker');
                if (i % 5 === 0) {
                    marker.classList.add('hour-marker'); // Add class for hour markers
                }
                marker.style.setProperty('--rotate-angle', `${i * 6}deg`);
                clock.appendChild(marker);
            }
        });
    }

    function hideTextBox() {
        const textBox = document.querySelector('.text-box');
        textBox.style.display = 'none'; // Hide the text box
    }

    // Hide the text box after 10 seconds
    setTimeout(hideTextBox, 10000); // 10000 milliseconds = 10 seconds

    createMinuteMarkers();
    setInterval(updateClocks, 1000);
    updateClocks(); // Initial call to set the clocks immediately

    let toggleState = 0;

    document.getElementById('toggle-clock').addEventListener('click', function() {
        const fullClockWrapper = document.getElementById('full-clock-wrapper');
        const hourClockWrapper = document.getElementById('hour-clock-wrapper');
        const minuteClockWrapper = document.getElementById('minute-clock-wrapper');
        const secondClockWrapper = document.getElementById('second-clock-wrapper');

        toggleState = (toggleState + 1) % 3;

        if (toggleState === 0) {
            fullClockWrapper.style.display = 'flex';
            hourClockWrapper.style.display = 'none';
            minuteClockWrapper.style.display = 'none';
            secondClockWrapper.style.display = 'none';
        } else if (toggleState === 1) {
            fullClockWrapper.style.display = 'none';
            hourClockWrapper.style.display = 'flex';
            minuteClockWrapper.style.display = 'flex';
            secondClockWrapper.style.display = 'flex';
        } else {
            fullClockWrapper.style.display = 'flex';
            hourClockWrapper.style.display = 'flex';
            minuteClockWrapper.style.display = 'flex';
            secondClockWrapper.style.display = 'flex';
        }
    });

    document.getElementById('toggle-seconds').addEventListener('click', function() {
        const secondHands = document.querySelectorAll('.second-hand');
        const secondClock = document.getElementById('second-clock');
        const secondLabel = secondClock.previousElementSibling;
        secondHands.forEach(hand => {
            hand.style.display = hand.style.display === 'none' ? 'block' : 'none';
        });
        if (secondClock.style.display === 'none') {
            secondClock.style.display = 'flex';
            secondLabel.style.display = 'block';
        } else {
            secondClock.style.display = 'none';
            secondLabel.style.display = 'none';
        }
    });

    document.getElementById('toggle-theme').addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
    });

    // Add event listener for the text box
    document.querySelector('.text-box').addEventListener('click', hideTextBox);
});
