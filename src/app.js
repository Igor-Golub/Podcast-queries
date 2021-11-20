import { Question } from './question'
import { isValid } from './utils';
import './stule.css'

const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitButton = form.querySelector('#submit-button')

window.addEventListener('load', Question.renderList)
form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', () => {
  submitButton.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
  event.preventDefault()

  if(isValid(input.value)) {

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