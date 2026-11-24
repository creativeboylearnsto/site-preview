/* The bar is light frosted glass while it sits over a hero photo, and turns to a
   deeper espresso glass once the photo has scrolled away (or on pages without one),
   so its links stay easy to read over the light sections. */
(function () {
  var bar = document.querySelector('.cv-bar');
  if (!bar) return;
  var hero = document.querySelector('.hero__panel, main > .head--photo:first-child');
  function set() {
    var heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
    bar.classList.toggle('is-solid', heroBottom <= bar.offsetHeight);
  }
  window.addEventListener('scroll', set, { passive: true });
  window.addEventListener('resize', set);
  set();
})();
