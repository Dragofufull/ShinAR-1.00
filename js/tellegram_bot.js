// НАСТРОЙКА ОТПРАВКИ В TELEGRAM
document.getElementById('telegram-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Запрещаем стандартную перезагрузку страницы

    // 1. Вставь сюда свои данные, которые ты получил от ботов:
    const TELEGRAM_TOKEN = '8825504781:AAFYF94uooe7kjgzQSnnI0dvxzVCUF-Kx3c';
    const TELEGRAM_CHAT_ID = '7276832042';

    // 2. Собираем данные из полей формы
    const name = document.getElementById('form-name').value;
    const contact = document.getElementById('form-contact').value;
    const message = document.getElementById('form-message').value;

    // 3. Формируем красивый текст сообщения для Telegram
    let textMessage = `🔔 <b>Новая заявка с сайта ShinAR!</b>\n\n`;
    textMessage += `👤 <b>Имя:</b> ${name}\n`;
    textMessage += `📞 <b>Контакты:</b> ${contact}\n`;
    textMessage += `💬 <b>Сообщение:</b> ${message}`;

    // 4. Отправляем запрос на сервера Telegram через fetch
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: textMessage,
            parse_mode: 'HTML' // Чтобы работал жирный шрифт в сообщении
        })
    })
    .then(response => {
        if (response.ok) {
            // Если всё прошло успешно
            alert('Сообщение успешно отправлено в наш Telegram! Мы свяжемся с вами.');
            document.getElementById('telegram-form').reset(); // Очищаем поля формы
        } else {
            // Если Telegram вернул ошибку
            alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Не удалось связаться с сервером отправки.');
    });
});