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
  const delayPromise = e.target.elements.delay.value;

  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (statusPromise === 'fulfilled') {
        res('Ok');
      } else {
        rej('err');
      }
    }, delayPromise);
  });

  refs.promiseForm.reset();

  promise
    .then(() => {
      iziToast.success({
        title: 'Ok',
        message: `✅ Fulfilled promise in ${delayPromise}ms`,
        position: 'topRight',
      });
    })
    .catch(() => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delayPromise}ms`,
        position: 'topRight',
      });
    });
};

refs.promiseForm.addEventListener('submit', onBtnCreatePromisesSubmit);
