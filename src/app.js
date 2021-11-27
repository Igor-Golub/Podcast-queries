import {Question} from './question'
import {createModal, isValid} from './utils';
import {authWithEmailAndPassword, getAuthForm} from "./auth";
import './style.css'

const form = document.getElementById('form')
const modalBtn = document.getElementById('modalBtn')
const input = form.querySelector('#question-input')
const submitButton = form.querySelector('#submit-button')

window.addEventListener('load', Question.renderList)
form.addEventListener('submit', submitFormHandler)
modalBtn.addEventListener('click', openModal)
input.addEventListener('input', () => {
  submitButton.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
  event.preventDefault()

  if (isValid(input.value)) {

    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    }

    submitButton.disabled = true

    Question.create(question).then(() => {
      input.value = ''
      input.className = ''
      submitButton.disabled = false
    })
  }
}

function openModal() {
  createModal('Авторизация', getAuthForm())
  document
    .getElementById('authForm')
    .addEventListener('submit', authFormHandler, { once: true })
}

function authFormHandler(event) {
  event.preventDefault()

  const btn = event.target.querySelector('button')
  const email = event.target.querySelector('#email').value
  const password = event.target.querySelector('#password').value

  btn.disabled = true
   authWithEmailAndPassword(email, password)
     .then(Question.fetch)
     .then(renderModelAfterAuth)
     .then(() => btn.disabled = false)
}

function renderModelAfterAuth(content) {
  if(typeof content === 'string') {
    createModal('Ошибка', content)
  }

  return createModal('Список вопросов', Question.listToHTML(content))
}