// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище
//  объект с полями email и message, в которых сохраняй текущие значения полей формы.
//  Пусть ключом для хранилища будет строка "feedback-form-state".
import throttle from 'lodash.throttle';
const LOCALSTORAGE_KEY = 'feedback-form-state';
const emailEl = document.querySelector('input[name="email"]');
const messageEl = document.querySelector('textarea[name="message"]');
const submitEl = document.querySelector('button');

emailEl.addEventListener('input', throttle(onFormInput, 500));
messageEl.addEventListener('input', throttle(onFormInput, 500));
submitEl.addEventListener('click', onSubmitForm);
function onFormInput() {
  const formData = {
    mail: `${emailEl.value}`,
    message: `${messageEl.value}`,
  };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

// // При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные,
//     заполняй ими поля формы.В противном случае поля должны быть пустыми.
storageCapacity();
function storageCapacity() {
  const parsedForm = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  if (!localStorage.getItem(LOCALSTORAGE_KEY)) {
    return;
  }
  emailEl.value = parsedForm.mail;
  messageEl.value = parsedForm.message;
}
// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email,
//     message и текущими их значениями в консоль.

function onSubmitForm(event) {
  event.preventDefault();
  if (emailEl.value === '' || messageEl.value === '') {
    alert('Пожалуйста заполеите все поля');
    return;
  }
  localStorage.clear(LOCALSTORAGE_KEY);

  console.log('email:', emailEl.value);
  console.log('messageEl:', messageEl.value);
  emailEl.value = '';
  messageEl.value = '';
}

//
// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд.
//  Для этого добавь в проект и используй библиотеку lodash.throttle.
