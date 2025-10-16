import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const refs = {
  inputData: document.querySelector('#datetime-picker'),
  btn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate;
refs.btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.info({
        title: 'Hello',
        message: 'Please choose a date in the future',
        position: 'center',
      });
    } else {
      userSelectedDate = selectedDates[0];
      refs.btn.disabled = false;
    }
  },
};

const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};

const dataPickr = flatpickr(refs.inputData, options);
// flatpickr(refs.inputData, options);

const onBtnClick = e => {
  e.preventDefault();
  refs.btn.disabled = true;
  refs.inputData.disabled = true;

  const intervalId = setInterval(() => {
    let differenData = userSelectedDate - new Date();
    if (differenData <= 1000) {
      clearInterval(intervalId);
      refs.inputData.disabled = false;
    }

    const { days, hours, minutes, seconds } = convertMs(differenData);

    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
  }, 1000);
};

refs.btn.addEventListener('click', onBtnClick);

////////////////////////////////////////////////
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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
