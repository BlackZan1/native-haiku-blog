export function getAuthPage() {
    return `
        <form class="mui-form" id="auth-form">
            <legend>Авторизация</legend>

            <br>

            <div class="mui-textfield">
                <input type="text" id="email">

                <label>Логин</label>
            </div>

            <div class="mui-textfield">
                <input type="password" id="password">
                <label>Пароль</label>
            </div>

            <button type="submit" class="mui-btn mui-btn--raised mui-btn--accent">Авторизация</button>
        </form>
    `
} 

export function authWithEmailAndPassword(email, password) {
    const API_KEY = 'AIzaSyDGgteqBf-rW__uIYMUgSDRfYBXZ_1cYM4';

    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
            token: '8pXTu2qyaQf8nuwgXBrrOFyaOef2'
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .catch(err => err)
    .then(res => res.idToken)
}