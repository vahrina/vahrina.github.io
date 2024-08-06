document.addEventListener('DOMContentLoaded', () => {
    const recipes = document.querySelector('.recipes');
    const leftNav = document.querySelector('.left-nav');
    const rightNav = document.querySelector('.right-nav');
    const recipeCards = document.querySelectorAll('.recipe-card');

    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        recipes.style.transform = `translateX(${offset}%)`;
    }

    leftNav.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = recipeCards.length - 1;
        }
        updateCarousel();
    });

    rightNav.addEventListener('click', () => {
        if (currentIndex < recipeCards.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });

    // Automatically scroll every 5 seconds
    setInterval(() => {
        rightNav.click();
    }, 5000);

    updateCarousel();
});
