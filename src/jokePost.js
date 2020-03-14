const storage = 'haikuBlogStore';

export class JokePost {
    constructor() {
        this.list = [];
    }

    static create(data) {
        addToLocalStorage(data);

        return fetch('https://haiku-blog-6ef84.firebaseio.com/jokes.json', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
        })
    }

    static getData() {
        return fetch('https://haiku-blog-6ef84.firebaseio.com/jokes.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);

            return res;
        })
    }

    static renderList(jokes) {
        const html = jokes.length ? 
        jokes.map(i => {
            return `<div class="mui-container-fluid"><h2>${i.text}</h2><p>${i.name}</p><p>${new Date(i.date).toLocaleString()}</p></div>`;
        }) : 'No items!'

        console.log(html)

        return html;
    }
}

// export function getJokePage(jokes) {
//     let div = document.createElement('div');

//     jokes.map(j => {
//         let el = document.createElement('div');


//     })

//     return `
//         <form class="mui-form" id="auth-form">
//             <legend>Авторизация</legend>

//             <br>

//             <div class="mui-textfield">
//                 <input type="text" id="email">

//                 <label>Логин</label>
//             </div>

//             <div class="mui-textfield">
//                 <input type="password" id="password">
//                 <label>Пароль</label>
//             </div>

//             <button type="submit" class="mui-btn mui-btn--raised mui-btn--accent">Авторизация</button>
//         </form>
//     `
// }

export function addToLocalStorage(data) {
    const allJokes = getFromLocalStorage();
    allJokes.push(data);

    localStorage.setItem(storage, JSON.stringify(allJokes));
}

export function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem(storage) || '[]');
}