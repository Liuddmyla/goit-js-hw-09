import Notiflix from 'notiflix';

const form = document.querySelector('.form');


function createPromise(position, delay) {

  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {   
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });  
};

form.addEventListener('submit', onsubmitForm);

function onsubmitForm(event) {
  event.preventDefault();  

  const amount = Number(event.target.elements.amount.value);
  const step = Number(event.target.elements.step.value);
  let firstDelay = Number(event.target.elements.delay.value);  
  
  if (firstDelay < 0 || step < 0 || amount <= 0) {
    form.reset();
      return;
  }
  for (let i = 1; i <= amount; i += 1){
    
    createPromise(i, firstDelay)
    .then(({position, delay }) => Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
    .catch(({position, delay}) => Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
    
    firstDelay += step;    
  };
  
  form.reset();
};


