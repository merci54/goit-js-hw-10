import flatpickr from "flatpickr";
import { refs } from "./refs";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "flatpickr/dist/flatpickr.min.css";

let userSelectedDate = null;
refs.startBtn.disabled = true;

const timerValues = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero({ days, hours, minutes, seconds }) {
    return {
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
    };
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = new Date();

        if (currentDate > selectedDates[0]) {
            iziToast.error({
                position: 'topRight',
                message: 'Please choose a date in the future'
            });

            refs.startBtn.disabled = true;
            return;
        }

        // const diff = selectedDates[0] - currentDate;
        refs.startBtn.disabled = false;
        userSelectedDate = selectedDates[0].getTime();

    },
};


const fp = flatpickr(refs.input, options);
refs.startBtn.addEventListener('click', handleClick)

function handleClick(e) {
    e.target.disabled = true;
    fp.destroy();
    countdownTimer(userSelectedDate);

}

function renderTimer(ms) {
    const currentTime = addLeadingZero(convertMs(ms));
    timerValues.seconds.innerHTML = currentTime.seconds;
    timerValues.minutes.innerHTML = currentTime.minutes;
    timerValues.hours.innerHTML = currentTime.hours;
    timerValues.days.innerHTML = currentTime.days;
}

function countdownTimer(endTime) {

    const delay = 1000;
    const countdown = setInterval(() => {

        const timeLeft = endTime - Date.now();

        if (timeLeft <= 0) {
            clearInterval(countdown);

            iziToast.success({
                title: 'Timer has over',
                position: 'topRight'
            })
            flatpickr(refs.input, options);

            return;
        }
        renderTimer(timeLeft);
    }, delay)
}








