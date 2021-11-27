export class Question {
  static create(question) {
    return fetch('https://podcast-questions-app-5b442-default-rtdb.firebaseio.com/questions.json', {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        question.id = response.name
        return question
      })
      .then(addToLocalStorage)
      .then(Question.renderList)
  }

  static renderList() {
    const questions = getQuestionsFromLocalstorage()

    const html = questions.length
      ? questions.map(item => toCard(item)).join('')
      : `<div class="mui--text-headline">Вы пока ни чего не спрашивали</div>`

    const list = document.getElementById('list')
    list.innerHTML = html
  }

  static fetch(token) {
    if (!token) {
      return Promise.resolve('<p class="error">У вас нет токена</p>')
    }
    return fetch(`https://podcast-questions-app-5b442-default-rtdb.firebaseio.com/questions.json?auth=${token}`)
      .then(res => res.json())
      .then(res => {
        if (res && res.error) {
          return `<p class="error">${res.error}</p>`
        }

        return res
          ? Object.keys(res).map(key => ({
            ...res[key],
            id: key,
          }))
          : []
      })
  }

  static listToHTML(questions) {
    return questions.length
      ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
      : `<p>Вопросов пока нет</p>`
  }
}

const addToLocalStorage = (question) => {
  const all = getQuestionsFromLocalstorage()
  all.push(question)
  localStorage.setItem('questions', JSON.stringify(all))
}

const getQuestionsFromLocalstorage = () => {
  return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question) {
  return `
    <div class="mui--text-black-54">
      ${new Date(question.date).toLocaleDateString()}
      ${new Date(question.date).toLocaleTimeString()}
    </div>
    <div>${question.text}</div>
    <br>
    `
}
