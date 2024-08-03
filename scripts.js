document.addEventListener('DOMContentLoaded', function () {
    const recipeWrapper = document.querySelector('.recipes');
    const navPrev = document.querySelector('.nav-btn.prev');
    const navNext = document.querySelector('.nav-btn.next');

    function scrollRecipes(direction) {
        const cardWidth = document.querySelector('.recipe-card').offsetWidth;
        const cardGap = parseFloat(getComputedStyle(document.querySelector('.recipe-card')).marginRight);
        const cardWidthWithGap = cardWidth + cardGap;
        const currentScroll = recipeWrapper.scrollLeft;
        const newScroll = direction === 'next' ? currentScroll + cardWidthWithGap : currentScroll - cardWidthWithGap;
        recipeWrapper.scrollTo({ left: newScroll, behavior: 'smooth' });
    }

    navPrev.addEventListener('click', () => scrollRecipes('prev'));
    navNext.addEventListener('click', () => scrollRecipes('next'));

});
