import { el, setChildren, mount } from 'redom';
import form from './form.js';
import IMask from 'imask';

const bootstrap = el('link', {
  href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
  rel: 'stylesheet',
  integrity: 'sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3',
  crossorigin: 'anonymous'
});
mount(window.document.head, bootstrap);

const container = el('div', {class: 'container mt-5'});
setChildren(container, form);
setChildren(window.document.body, container);

const inputMask = () => {
  const cardNumber = document.querySelector('#validationCustom01');
  const cardDate = document.querySelector('#validationCustom02');
  const cvc = document.querySelector('#validationCustom03');
  const email = document.querySelector('#validationCustom04');

  const today = new Date();
  const form = {
    cardNumber: false,
    cardDate: false,
    cvc: false,
    email: false,
  }

  IMask(cardNumber, {mask: '0000 0000 0000 0000'});
  IMask(cvc, {mask: '000'});
  IMask(cardDate, {
    mask: 'MM{/}YY',
    blocks: {
      YY: {
        mask: IMask.MaskedRange,
        from: today.getFullYear() % 100,
        to: 99
      },

      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12
      }
    }
  });
  IMask(email, {mask: /^\S*@?\S*$/});

  function turnOffButton() {
    if (form.cardNumber && form.cardDate && form.cvc && form.email) {
      document.querySelector('.btn').removeAttribute('disabled');
    }
  }

  cardDate.addEventListener('blur', () => {
    if (!cardDate.value) return; // новый массив
    const day = cardDate.value.split('/');
    if (day[1] == today.getFullYear() % 100 && day[0] < (today.getMonth() + 1)) {
      cardDate.value = '';
    } else {
      form.cardDate = true;
      turnOffButton();
    }
  });

  cardNumber.addEventListener('input',() => {
    switch (cardNumber.value[0]) {
      case '2':
        cardNumber.classList.remove('card-master');
        cardNumber.classList.remove('card-visa');
        cardNumber.classList.add('card-mir');
        break;
      case '4':
        cardNumber.classList.remove('card-master');
        cardNumber.classList.remove('card-mir');
        cardNumber.classList.add('card-visa');
        break;
      case '5':
        cardNumber.classList.remove('card-mir');
        cardNumber.classList.remove('card-visa');
        cardNumber.classList.add('card-master');
        break;
      default:
        cardNumber.classList.remove('card-mir');
        cardNumber.classList.remove('card-visa');
        cardNumber.classList.remove('card-master');
        break;
    }
  });

  cardNumber.addEventListener('blur', () => {
    if (cardNumber.value.length == 19) {
      form.cardNumber = true;
      turnOffButton();
    }
  });
  cvc.addEventListener('blur', () => {
    if (cvc.value.length == 3) {
      form.cvc = true;
      turnOffButton();
    }
  });
  email.addEventListener('blur', () => {
    const regExp = /^\S*@?\S*$/;
    if (email.value.replace(regExp, '') == '') {
      form.email = true;
      turnOffButton();
    } else {
      email.value = '';
    }
  });
};
inputMask();
