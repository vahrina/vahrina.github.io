document.addEventListener('DOMContentLoaded', () => {
    const recipes = document.querySelector('.recipes');
    const leftNav = document.querySelector('.left-nav');
    const rightNav = document.querySelector('.right-nav');
    const recipeCards = document.querySelectorAll('.recipe-card');

    let currentIndex = 0;
    let autoScroll;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        recipes.style.transform = `translateX(${offset}%)`;
    }

    function resetTimer() {
        clearInterval(autoScroll);
        autoScroll = setInterval(() => {
            rightNav.click();
        }, 5000);
    }

    leftNav.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = recipeCards.length - 1;
        }
        updateCarousel();
        resetTimer();
    });

    rightNav.addEventListener('click', () => {
        if (currentIndex < recipeCards.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
        resetTimer();
    });

    autoScroll = setInterval(() => {
        rightNav.click();
    }, 5000);

    updateCarousel();
});
