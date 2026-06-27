function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.auth-form');

    tabs.forEach(tab => tab.classList.remove('active'));
    forms.forEach(form => form.classList.remove('active'));

    if (tabName === 'login') {
        tabs[0].classList.add('active');
        document.getElementById('shinar-login-form').classList.add('active');
    } else if (tabName === 'register') {
        tabs[1].classList.add('active');
        document.getElementById('shinar-reg-form').classList.add('active');
    }
}

// Обработка РЕГИСТРАЦИИ
document.getElementById('shinar-reg-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const TELEGRAM_TOKEN = 'СЮДА_ВСТАВЬ_ТОКЕН_ОТ_BOTFATHER';
    const TELEGRAM_CHAT_ID = '7276832042';

    const name = document.getElementById('reg-name').value;
    const phone = document.getElementById('reg-phone').value;
    const email = document.getElementById('reg-email').value;

    let messageText = `🛒 <b>Новая регистрация ПОКУПАТЕЛЯ в ShinAR!</b>\n\n`;
    messageText += `👤 <b>Имя:</b> ${name}\n`;
    messageText += `📞 <b>Телефон:</b> ${phone}\n`;
    messageText += `📧 <b>Email:</b> ${email}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: messageText,
            parse_mode: 'HTML'
        })
    })
    .then(response => {
        if (response.ok) {
            // Сохраняем пользователя локально
            localStorage.setItem('currentUser', JSON.stringify({ name: name, email: email }));
            
            alert(`Регистрация успешна! Добро пожаловать, ${name}!`);
            window.location.href = 'index.html'; // Уходим на главную
        } else {
            alert('Ошибка при регистрации.');
        }
    })
    .catch(error => console.error('Ошибка:', error));
});

// Обработка ВХОДА (Заглушка для полноценного вида)
document.getElementById('shinar-login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    // Пока базы данных нет, просто берем имя из email до собачки (например, igor@mail.com -> Igor)
    let fakeName = email.split('@')[0];
    fakeName = fakeName.charAt(0).toUpperCase() + fakeName.slice(1);

    localStorage.setItem('currentUser', JSON.stringify({ name: fakeName, email: email }));
    
    alert(`Рады видеть вас снова, ${fakeName}!`);
    window.location.href = 'index.html';
});