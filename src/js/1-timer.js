import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
const countDays = document.querySelector('[data-days]');
const countHours = document.querySelector('[data-hours]');
const countMinutes = document.querySelector('[data-minutes]');
const countSeconds = document.querySelector('[data-seconds]');
/**@type {HTMLInputElement} */
const datePicker = document.querySelector(`#datetime-picker`);
/**@type {HTMLButtonElement} */
const startBtn = document.querySelector('.start-button');

startBtn.addEventListener(`click`, startTimer);

changeStatus(startBtn, false);
const fp = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.parse(selectedDates[0]) - Date.now() > 0) {
      changeStatus(startBtn, true);
      userSelectedDate = Date.parse(selectedDates[0]);
    } else {
      changeStatus(startBtn, false);
      iziToast.error({
        title: 'Wrong date',
        message: 'Please choose a date in the future',
      });
    }

    console.log(selectedDates[0]);
    console.log(userSelectedDate);
  },
});

function startTimer(event) {
  if (userSelectedDate === undefined || userSelectedDate < Date.now()) {
    iziToast.error({
      title: 'Wrong date',
      message: 'Please choose a date in the future',
    });
    return;
  }
  let countTime = userSelectedDate - Date.now();
  changeStatus(startBtn, false);
  changeStatus(datePicker, false);
  const intervalID = setInterval(() => {
    countDownTimer(countTime);
    countTime = countTime - 1000;
    cheackForEnd(countTime, intervalID);
  }, 1000);
}

function changeStatus(element, status) {
  switch (status) {
    case true:
      element.disabled = false;
      break;
    case false:
      element.disabled = true;
      break;

    default:
      console.log(`Smth went wrong on changeStatusBtn`);
      break;
  }
}

function cheackForEnd(countTime, intervalID) {
  if (countTime < 0) {
    clearInterval(intervalID);
    changeStatus(datePicker, true);
  }
}

function countDownTimer(countTime) {
  const { days, hours, minutes, seconds } = convertMs(countTime);
  countDays.textContent = addLeadingZero(days);
  countHours.textContent = addLeadingZero(hours);
  countMinutes.textContent = addLeadingZero(minutes);
  countSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  const strValue = value.toString();
  if (value < 10) {
    const wthLeading = strValue.padStart(2, `0`);
    return wthLeading;
  }
  return strValue;
}

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
