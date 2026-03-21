//slider
const sliderWrapper = document.querySelector('.slider_wrapper');
const originalItems = Array.from(sliderWrapper.children);

originalItems.forEach(item => {
    const clone = item.cloneNode(true);
    sliderWrapper.appendChild(clone);
});



//slider 2
const sliderWrapper2 = document.querySelector('.slider2_wrapper');
const originalItems2 = Array.from(sliderWrapper2.children);

originalItems2.forEach(item => {
    const clone2 = item.cloneNode(true);
    sliderWrapper2.appendChild(clone2);
});

//переключатель меню
const btns = document.querySelectorAll('.food_li'),
      menus = document.querySelectorAll('.food_menu');

function HideTab() {
    btns.forEach(x => {
        x.classList.remove('food_li_active');
    });
    menus.forEach(x => {
        x.classList.remove('food_menu_active');
    })
}
console.log(btns, menus)
btns.forEach((item, index) => {
    item.addEventListener('click', () => {
        HideTab();
        menus[index].classList.add('food_menu_active');
        btns[index].classList.add('food_li_active');
    })
})