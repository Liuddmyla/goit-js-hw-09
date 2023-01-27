import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dataForm = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const valueDays = document.querySelector('span[data-days]');
const valueHours = document.querySelector('span[data-hours]');
const valueMinutes = document.querySelector('span[data-minutes]');
const valueSeconds = document.querySelector('span[data-seconds]');
const label = document.querySelectorAll('.label');


function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  
  const days = pad(Math.floor(ms / day));
  
  const hours = pad(Math.floor((ms % day) / hour));
  
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
   
};

function pad(value) {
  return String(value).padStart(2, '0');
};

btnStart.setAttribute('disabled', 'disabled');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        
        if (selectedDates[0] < new Date()) {
            window.alert("Please choose a date in the future");
            selectedDates[0] = new Date();
        }
        
        btnStart.removeAttribute('disabled');

        btnStart.addEventListener('click', onClick)
        function onClick() {
            const intervalId = setInterval(() => {
            const delta = selectedDates[0].getTime() - new Date().getTime();            
            console.log(delta);
            }, 1000)
        }
        
    },   
    
};

flatpickr("#datetime-picker", options);







