/* Hero parallax: the hero photo drifts slower than the page as you scroll.
   Only the photo moves; the text over it stays put. The photo is made taller
   than its frame by the drift range, so its edges never show. Lighter on
   phones, and off for anyone who asks their device to reduce motion. */
(function () {
  // ?motion in the address forces it on, to preview on a device with Reduce Motion switched on
  var preview = /[?&]motion\b/.test(location.search);
  if (!window.matchMedia || (matchMedia('(prefers-reduced-motion: reduce)').matches && !preview)) return;
  var imgs = [].slice.call(document.querySelectorAll('.hero__img, .head--photo > img'));
  if (!imgs.length) return;

  var css = document.createElement('style');
  css.textContent =
    '.is-parallax { --drift: 18%; top: calc(-1 * var(--drift)) !important; bottom: auto !important;' +
    ' height: calc(100% + var(--drift)) !important; will-change: transform; }' +
    '@media (max-width: 760px) { .is-parallax { --drift: 8%; } }';
  document.head.appendChild(css);
  imgs.forEach(function (img) { img.classList.add('is-parallax'); });

  var phone = matchMedia('(max-width: 760px)');
  var ticking = false;
  function update() {
    ticking = false;
    var k = phone.matches ? 0.08 : 0.18; // share of the scroll the photo follows; matches --drift
    var vh = window.innerHeight;
    imgs.forEach(function (img) {
      var box = img.parentElement.getBoundingClientRect();
      if (box.bottom < 0 || box.top > vh) return;
      // at rest until the frame reaches the top of the screen, then it drifts down
      var y = Math.max(0, -box.top) * k;
      img.style.transform = 'translate3d(0,' + y.toFixed(1) + 'px,0)';
    });
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
