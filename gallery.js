// ===== Gallery Page Logic =====
document.addEventListener('DOMContentLoaded', function () {
  // Hamburger / mobile menu (shared pattern with other pages)
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
    });
  }

  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');

      galleryItems.forEach(function (item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Lightbox
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var closeBtn = document.getElementById('lightboxClose');
  var prevBtn = document.getElementById('lightboxPrev');
  var nextBtn = document.getElementById('lightboxNext');
  var currentIndex = 0;
  var visibleItems = [];

  function refreshVisibleItems() {
    visibleItems = Array.prototype.filter.call(galleryItems, function (item) {
      return !item.classList.contains('hidden');
    });
  }

  function openLightbox(index) {
    refreshVisibleItems();
    currentIndex = index;
    showImage();
    lightbox.classList.add('open');
  }

  function showImage() {
    var item = visibleItems[currentIndex];
    if (!item) return;
    var img = item.querySelector('img');
    var caption = item.querySelector('figcaption');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';
  }

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      refreshVisibleItems();
      var index = visibleItems.indexOf(item);
      openLightbox(index >= 0 ? index : 0);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      lightbox.classList.remove('open');
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
      showImage();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      currentIndex = (currentIndex + 1) % visibleItems.length;
      showImage();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') lightbox.classList.remove('open');
    if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
  });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      lightbox.classList.remove('open');
    }
  });
});
