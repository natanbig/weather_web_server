console.log('Client side js file is loaded!')





const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    messageOne.textContent = ''
    messageTwo.textContent = ''
    const location = search.value
    fetch('http://localhost:8000/weather?address='+ location).then((response) => {
        console.log(response)
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error
            } else if (data.cod){
                messageOne.textContent = data.cod
                messageTwo.textContent = data.message
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast

            }

        })
    })
})