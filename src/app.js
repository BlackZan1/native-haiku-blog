import './styles.css';
import { validate, createModal, createUserBlock } from './utils';
import { JokePost, getFromLocalStorage } from './jokePost';
import { getAuthPage, authWithEmailAndPassword } from './auth';

// form, input, button
const form = document.querySelector('#form');
const q_input = document.querySelector('#q-input');
const n_input = document.querySelector('#n-input');
const submitBtn = document.querySelector('#submit-btn');
const j_count = document.querySelector('#j-count');
const list = document.querySelector('#content-wrapper');
const modalBtn = document.querySelector('#modal-btn');

submitBtn.disabled = true;

// Event Listeners
window.addEventListener('load', showPosts);
q_input.addEventListener('input', submitValidate);
n_input.addEventListener('input', submitValidate);
form.addEventListener('submit', submitHandler);

// Handlers

// Show posts for dynamic present
async function showPosts() {
    const data = Object.values(await JokePost.getData());
    const html = await JokePost.renderList(data);

    for(let i = 0; i < html.length; i++) {
        let el = document.createElement('div');
        el.innerHTML = html[i];
        el.classList.add('joke-item');

        console.log(el)

        list.appendChild(el);
    }

    j_count.textContent = html.length;
}

// Validate for submit joke form
function submitValidate() {
    submitBtn.disabled = !validate(q_input.value, n_input.value);
}

// Submit in joke form
function submitHandler(ev) {
    ev.preventDefault();

    if(validate(q_input.value, n_input.value)) {
        const jokeItem = {
            text: q_input.value,
            name: n_input.value,
            date: new Date().toJSON() // Calm down, padavan
        }

        // Async req to server to save jokeItem

        JokePost.create(jokeItem).then(res => {
            submitBtn.disabled = true;
            q_input.value = '';
            n_input.value = '';

            showPosts();
        });
    }
    else {
        if(!q_input.value.length) {
            console.log('Question = error')
        }

        if(!n_input.value.length) {
            console.log('Name = error')
        }
    }
}

// Check fot token and make modalBtn more smarter
function isAuth() {
    let token = localStorage.getItem('haikuBlog') || '';

    if(token.length) {
        modalBtn.style.animation = 'fadeIntDown 1s ease';

        setTimeout(() => {
            modalBtn.style.display = '';
        }, 900)

        modalBtn.textContent = "Шутки";
        modalBtn.addEventListener('click', openJokeModal);
        createUserBlock({name: 'Nazar'});

        try {

        }
        catch(err) {
            console.log(err)
        }
    }
    else {
        modalBtn.textContent = 'Войти'
        modalBtn.addEventListener('click', openAuthModal);
    }
}

// Open reqistration fields in modal
function openAuthModal() {
    createModal(getAuthPage());

    document
    .querySelector('#auth-form')
    .addEventListener('submit', authFormHandler, {once: true});
}

// Open jokes in modal
async function openJokeModal() {
    const data = await getFromLocalStorage();

    createModal(JokePost.renderList(data));

    // document
    // .querySelector('')
}

// Login handler
function authFormHandler(ev) {
    ev.preventDefault()

    const email = ev.target.querySelector('#email').value;
    const password = ev.target.querySelector('#password').value;

    authWithEmailAndPassword(email, password)
    .then(res => {
        if(!res) throw Error('Invalid mail or password');

        localStorage.setItem('haikuBlog', JSON.stringify(res));

        modalBtn.style.animation = 'fadeOutDown 1s ease';

        setTimeout(() => {
            modalBtn.style.display = 'none';
        }, 900)

        ev.target.parentNode.innerHTML = '<h1>Успешно!</h1> <h1>Тапните чтобы продолжить</h1>'

        isAuth();
    })
    .catch(err => {
        let warning = document.createElement('div');
        warning.textContent = err;

        ev.target.parentNode.appendChild(warning)
    }) 
}

export async function logOutHandler(ev) {
    localStorage.removeItem('haikuBlog');

    ev.target.parentNode.style.animation = 'fadeOutDown 1s ease';

    console.log(ev)

    setTimeout(() => {
        ev.target.parentNode.style.display = 'none';
    }, 900)

    isAuth();
}

// Registration handler

isAuth()

// console.log('What is love...!!!')