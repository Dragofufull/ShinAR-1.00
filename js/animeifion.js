document.addEventListener("DOMContentLoaded", function () {
    
    // 1. АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКОВ ПРИ СКРОЛЛЕ
    const revealElements = document.querySelectorAll(".scroll-reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Добавляем класс active, когда блок виден на экране
                entry.target.classList.add("active");
                // Перестаем следить за ним, чтобы анимация не повторялась постоянно
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12 // Анимация начнется, когда блок покажется на 12%
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 2. МОБИЛЬНОЕ МЕНЮ (Закрытие при клике на пункт)
    const menuCheckbox = document.getElementById("menu-checkbox");
    const navLinks = document.querySelectorAll(".nav-list a");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (menuCheckbox) {
                menuCheckbox.checked = false; // Закрывает шторку меню на смартфонах
            }
        });
    });
});