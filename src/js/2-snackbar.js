// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  promiseForm: document.querySelector('.form'),
};

const onBtnCreatePromisesSubmit = e => {
  e.preventDefault();

  const statusPromise = e.target.elements.state.value;
  const delay = Number(e.target.elements.delay.value);

  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (statusPromise === 'fulfilled') {
        res(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        rej(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  refs.promiseForm.reset();

  promise
    .then(res => {
      iziToast.success({
        title: 'Ok',
        message: res,
        position: 'topRight',
      });
    })
    .catch(err => {
      iziToast.error({
        title: 'Error',
        message: err,
        position: 'topRight',
      });
    });
};

refs.promiseForm.addEventListener('submit', onBtnCreatePromisesSubmit);
