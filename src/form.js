import { el } from 'redom';
import './form.scss';

export default el('form', {class: 'row g-3'}, [
  // Card number
  el('div', {class: 'col-md-12'}, [
    el('div', {class: 'col-md-2-2'}, [
      el('label', {class: 'form-label', for: 'validationCustom01'}, 'Card number'),
      el('input', {class: 'form-control card-num', type: 'text', id: 'validationCustom01', placeholder: '0000 0000 0000 0000', required: true})
    ])
  ]),
  // date
  el('div', {class: 'col-md-1'}, [
    el('label', {class: 'form-label', for: 'validationCustom02'}, 'MM/YY'),
    el('input', {class: 'form-control', type: 'text', id: 'validationCustom02', placeholder: '00/00', required: true}),
  ]),
  // cvc
  el('div', {class: 'col-md-1'}, [
    el('label', {class: 'form-label', for: 'validationCustom03'}, 'CVC/CVV'),
    el('input', {class: 'form-control', type: 'text', id: 'validationCustom03', placeholder: '***', required: true}),
  ]),
  // email
  el('div', {class: 'col-md-12'}, [
    el('div', {class: 'col-md-2'}, [
      el('label', {class: 'form-label', for: 'validationCustom04'}, 'Email'),
      el('input', {class: 'form-control', type: 'text', id: 'validationCustom04', placeholder: 'name@mail.com', required: true})
    ])
  ]),
  // button
  el('div', {class: 'col-12'}, [
    el('button', {class: 'btn btn-primary', disabled: true}, 'Pay')
  ])
]);
