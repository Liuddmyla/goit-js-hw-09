import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const dataForm = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const valueDays = document.querySelector('span[data-days]');
const valueHours = document.querySelector('span[data-hours]');
const valueMinutes = document.querySelector('span[data-minutes]');
const valueSeconds = document.querySelector('span[data-seconds]');
const div = document.querySelector('.timer');
const secondDiv = document.querySelectorAll('.field');
const value = document.querySelectorAll('.value');


btnStart.setAttribute('disabled', 'disabled');

function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  
  const days = addLeadingZero(Math.floor(ms / day));
  
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
   
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

function upDateForm({ days, hours, minutes, seconds }) {
    valueDays.textContent = `${days}`;
    valueHours.textContent = `${hours}`;
    valueMinutes.textContent = `${minutes}`;
    valueSeconds.textContent = `${seconds}`;
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        
        if (selectedDates[0] < new Date()) {
            Notiflix.Notify.failure("Please choose a date in the future");
            selectedDates[0] = new Date();
            return;
        }
        
        btnStart.removeAttribute('disabled'); 
        
        btnStart.addEventListener('click', onClick);
        function onClick() {
            const intervalId = setInterval(() => {                
                const ms = selectedDates[0].getTime() - new Date().getTime();
                if (ms <= 0) {
                    return;
                }
                const currentTime = convertMs(ms);
                upDateForm(currentTime);
            }, 1000);

            btnStart.setAttribute('disabled', 'disabled');
        }               
    },    
};

flatpickr("#datetime-picker", options);

 
// стилі
div.style.display = 'flex';
div.style.gap = '30px';
dataForm.style.fontSize = '20px';
btnStart.style.fontSize = '20px';

secondDiv.forEach((elem) => {
    elem.style.display = 'block';   
    elem.style.textAlign = 'center';
    
});
value.forEach((elem) => {
    elem.style.display = 'block';
    elem.style.fontSize = '40px';
    elem.style.fontWeight = '500';
    elem.style.textAlign = 'center';
    elem.style.color = 'green';
});





