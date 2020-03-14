import { logOutHandler } from './app';

export function validate(value, name) {
    console.log(value)

    if(value.length >= 10 && name.length) {
        return true;
    }

    return false;
}

export function createModal(elements) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const html = `
        <div class="modal-content">${elements}</div>
    `

    modal.innerHTML = html;

    mui.overlay('on', modal);
}

export function createUserBlock(user) {
    const block = document.createElement('div');
    block.classList.add('user-block');

    const btn = document.createElement('button');
    btn.addEventListener('click', logOutHandler);
    btn.classList.add('mui-btn');
    btn.classList.add('mui-btn--raised');
    btn.classList.add('mui-btn--accent');
    btn.textContent = 'Выйти';

    const name = document.createElement('div');
    name.textContent = `Имя: ${user.name}`;

    block.appendChild(name);
    block.appendChild(btn);
    
    document
    .querySelector('body')
    .appendChild(block)
}