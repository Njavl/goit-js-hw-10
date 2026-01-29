import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

/** @type {HTMLFormElement} */
const form = document.querySelector('.form');

form.addEventListener(`submit`, creactePromis);

/**@param {SubmitEvent} event */
function creactePromis(event) {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);

  if (form.elements.state.value === `` || delay === ``) {
    iziToast.error({
      title: 'FILL INPUT!',
      message: 'Fill in the input fields!!!',
    });
    console.log(`Error`);
    return;
  }

  /** @type {Promise} promis */
  const promis = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (form.elements.state.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promis
    .then(delay => {
      iziToast.success({
        title: 'Fulfilled',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Reject',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
}
