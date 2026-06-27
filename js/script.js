document.addEventListener('DOMContentLoaded', function () {
    const userNav = document.getElementById('user-profile-nav');
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser && userNav) {
        const user = JSON.parse(currentUser);
        
        // Меняем иконку человечка на имя пользователя и красивую иконку выхода рядом
        userNav.innerHTML = `
            <span class="user-name-display" style="font-weight: 600; margin-right: 8px; color: var(--primary-color);">${user.name}</span>
            <i class="fa-solid fa-circle-user" style="color: var(--accent-color);"></i>
            <button id="logout-btn" style="background: none; border: none; margin-left: 12px; cursor: pointer; color: #e74c3c; font-size: 14px;" title="Выйти">
                <i class="fa-solid fa-right-from-bracket"></i>
            </button>
        `;

        // Отключаем переход на страницу регистрации при клике на имя
        userNav.addEventListener('click', function(e) {
            if (!e.target.closest('#logout-btn')) {
                e.preventDefault(); 
            }
        });

        // Логика кнопки "Выйти"
        document.getElementById('logout-btn').addEventListener('click', function (e) {
            e.stopPropagation(); // Чтобы не сработал клик по ссылке
            localStorage.removeItem('currentUser'); // Удаляем юзера
            window.location.reload(); // Перезагружаем страницу, чтобы вернуть человечка
        });
    }
});