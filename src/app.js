import { isValid } from './utils';
import './stule.css'

const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitButton = form.querySelector('#submit-button')

form.addEventListener('submit', submitFormHandler)

function submitFormHandler(event) {
  event.preventDefault()

  if(isValid(input.value)) {

    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    }

    submitButton.disabled = true

    // Async request to server to save question
    console.log('question', question)
    input.value = ''
    input.className = ''
    submitButton.disabled = false
  }
}