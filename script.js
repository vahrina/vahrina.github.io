document.addEventListener('DOMContentLoaded', () => {
    const recipes = document.querySelector('.recipes');
    const leftNav = document.querySelector('.left-nav');
    const rightNav = document.querySelector('.right-nav');
    const recipeCards = document.querySelectorAll('.recipe-card');
    const libraryBtn = document.querySelector('.library-btn');
    const randomBtn = document.querySelector('.random-btn');
    const body = document.body;

    let currentIndex = 0;
    let autoScroll;
    const autoScrollInterval = 5000;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        recipes.style.transform = `translateX(${offset}%)`;
    }

    function resetTimer(interval = autoScrollInterval) {
        clearInterval(autoScroll);
        autoScroll = setInterval(() => {
            rightNav.click();
        }, interval);
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
    }, autoScrollInterval);

    updateCarousel();

    libraryBtn.addEventListener('click', () => {
        libraryBtn.style.boxShadow = 'none';
        window.location.href = 'library.html'; // Needs to be changed soon!
    });

    randomBtn.addEventListener('click', () => {
        randomBtn.style.boxShadow = 'none';

        body.style.transition = 'background-color 0.5s';
        body.style.backgroundColor = '#fff0e2';

        setTimeout(() => {
            body.style.backgroundColor = '';
        }, 300);

        const randomIndex = Math.floor(Math.random() * recipeCards.length);
        currentIndex = randomIndex;
        updateCarousel();
        resetTimer(10000);
    });
});
