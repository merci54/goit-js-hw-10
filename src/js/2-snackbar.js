import { refs } from "./refs";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();


    const delay = e.target.elements.delay.value;
    const state = e.target.elements.state.value;

    creatingPromise(delay, state)
        .then(data => {
            iziToast.show({
                message: `${data}`,
                position: 'topRight',
                backgroundColor: '#31c581',
                messageColor: 'white',
                messageSize: '20'
            })
        })
        .catch(data => {
            iziToast.show({
                message: `${data}`,
                position: 'topRight',
                backgroundColor: '#fe5549',
                messageColor: 'white',
                messageSize: '20',
            })
        })

}

function creatingPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(`✅ Fulfilled promise in ${delay}ms`)
            }

            reject(`❌ Rejected promise in ${delay}ms`)
        }, delay)
    })
}

