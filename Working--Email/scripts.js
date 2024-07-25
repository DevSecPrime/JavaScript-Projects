
const scriptURL = 'https://script.google.com/macros/s/AKfycby4T8qMoG2-oRqDzJs0MAAqwliwPLdgIXI3D3phvVBtn-7WVm_c07kcWUlqyRidOcXa/exec'
const form = document.forms['submit-to-google-sheet'];
const msg = document.querySelector('#msg');

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message sent successfully!"
            setTimeout(() => {
                msg.innerHTML = ""
            }, 5000)

            form.reset()
        })
        .catch(error => console.log('Error!', error.message))
})
