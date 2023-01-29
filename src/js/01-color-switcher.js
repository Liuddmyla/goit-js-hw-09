const body = document.body;
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener('click', handleClickStart);
btnStop.addEventListener('click', handleClickStop);

btnStop.setAttribute('disabled', 'disabled');

function handleClickStart() {
    timerId = setInterval(() => {
        const colorBody = getRandomHexColor();
        body.style.backgroundColor = colorBody;
    }, 1000);
    
    btnStart.setAttribute('disabled', 'disabled');
    btnStop.removeAttribute('disabled');
}

function handleClickStop() {
    clearInterval(timerId);

    btnStart.removeAttribute('disabled');
    btnStop.setAttribute('disabled', 'disabled');
}

// стилі

btnStart.style.padding = '20px 25px';
btnStop.style.padding = '20px 25px';
btnStart.style.borderRadius = '10px';
btnStop.style.borderRadius = '10px';
btnStart.style.fontWeight = '600';
btnStop.style.fontWeight = '600';
btnStart.style.fontSize = '30px';
btnStop.style.fontSize = '30px';
