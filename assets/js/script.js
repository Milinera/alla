// ========== Проверки для существующих слайдеров (если они есть) ==========
const sliderWrapper = document.querySelector('.slider_wrapper');
if (sliderWrapper) {
    const originalItems = Array.from(sliderWrapper.children);
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        sliderWrapper.appendChild(clone);
    });
}

const sliderWrapper2 = document.querySelector('.slider2_wrapper');
if (sliderWrapper2) {
    const originalItems2 = Array.from(sliderWrapper2.children);
    originalItems2.forEach(item => {
        const clone2 = item.cloneNode(true);
        sliderWrapper2.appendChild(clone2);
    });
}

// ========== Переключатель меню (food) ==========
const btns = document.querySelectorAll('.food_li');
const menus = document.querySelectorAll('.food_menu');

if (btns.length && menus.length) {
    function HideTab() {
        btns.forEach(x => {
            x.classList.remove('food_li_active');
        });
        menus.forEach(x => {
            x.classList.remove('food_menu_active');
        });
    }
    btns.forEach((item, index) => {
        item.addEventListener('click', () => {
            HideTab();
            menus[index].classList.add('food_menu_active');
            btns[index].classList.add('food_li_active');
        });
    });
}

// ========== Слайдер для блока .masters ==========
document.addEventListener('DOMContentLoaded', () => {
    const mastersSection = document.querySelector('.masters');
    if (!mastersSection) return;

    const originalWrapper = mastersSection.querySelector('.masters_wrapper');
    const items = Array.from(originalWrapper?.children || []);
    const prevBtn = mastersSection.querySelector('.masters_btn_arr:first-child');
    const nextBtn = mastersSection.querySelector('.masters_btn_arr:last-child');

    if (!originalWrapper || !items.length || !prevBtn || !nextBtn) return;

    // Создаём обёртку слайдера, если её нет
    if (!mastersSection.querySelector('.masters_slider')) {
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'masters_slider';
        originalWrapper.parentNode.insertBefore(sliderContainer, originalWrapper);
        sliderContainer.appendChild(originalWrapper);
    }

    const sliderContainer = mastersSection.querySelector('.masters_slider');
    let currentIndex = 0;
    let itemsPerView = getItemsPerView();
    let maxIndex = Math.max(0, items.length - itemsPerView);

    function getItemsPerView() {
        return window.innerWidth <= 768 ? 1 : 3;
    }

    function updateSlider() {
        itemsPerView = getItemsPerView();
        maxIndex = Math.max(0, items.length - itemsPerView);
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        const offset = -currentIndex * (100 / itemsPerView);
        originalWrapper.style.transform = `translateX(${offset}%)`;

        // Управление активностью кнопок
        if (currentIndex === 0) {
            prevBtn.classList.add('disabled');
            prevBtn.classList.remove('masters_btn_arr_active');
        } else {
            prevBtn.classList.remove('disabled');
            prevBtn.classList.add('masters_btn_arr_active');
        }

        if (currentIndex >= maxIndex) {
            nextBtn.classList.add('disabled');
            nextBtn.classList.remove('masters_btn_arr_active');
        } else {
            nextBtn.classList.remove('disabled');
            nextBtn.classList.add('masters_btn_arr_active');
        }
    }

    // Обработчики кнопок
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    // Свайп
    let touchStartX = 0;
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const delta = touchEndX - touchStartX;
        if (Math.abs(delta) > 50) {
            if (delta > 0 && currentIndex > 0) {
                currentIndex--;
                updateSlider();
            } else if (delta < 0 && currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        }
    });

    // Ресайз окна
    window.addEventListener('resize', () => {
        updateSlider();
    });

    // Инициализация
    updateSlider();
});


// ========== Переключатель меню (sure) ==========
const btnss = document.querySelectorAll('.sure_btn_item');
const menuss = document.querySelectorAll('.sure_item');

if (btnss.length && menuss.length) {
    function HideTabs() {
        btnss.forEach(x => {
            x.classList.remove('sure_btn_item_active');
        });
        menuss.forEach(x => {
            x.classList.remove('sure_item_active');
        });
    }
    btnss.forEach((item, index) => {
        item.addEventListener('click', () => {
            HideTabs();
            menuss[index].classList.add('sure_item_active');
            btnss[index].classList.add('sure_btn_item_active');
        });
    });
}