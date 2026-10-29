// Универсальный зум картинок на всех страницах портфолио
(function() {
  function initLightbox() {
    // 1. Создаем всплывающее окно со встроенными стилями (работает автономно)
    let modal = document.getElementById('global-lightbox-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'global-lightbox-modal';
      modal.style.cssText = `
        display: none;
        position: fixed;
        z-index: 999999;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        align-items: center;
        justify-content: center;
        cursor: zoom-out;
        padding: 20px;
        box-sizing: border-box;
      `;
      modal.innerHTML = `
        <img id="global-lightbox-img" style="
          max-width: 95vw;
          max-height: 95vh;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.9);
          cursor: zoom-out;
        ">
      `;
      document.body.appendChild(modal);

      // Закрытие по клику в любое место
      modal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      });

      // Закрытие по клавише Esc
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          modal.style.display = 'none';
          document.body.style.overflow = '';
        }
      });
    }

    const modalImg = document.getElementById('global-lightbox-img');

    // 2. Навешиваем клик на ВСЕ картинки контента (отсекаем только крошечные иконки)
    const allImages = document.querySelectorAll('img');
    allImages.forEach(function(img) {
      // Игнорируем картинку внутри самой модалки
      if (img.id === 'global-lightbox-img') return;

      img.style.cursor = 'zoom-in';

      img.addEventListener('click', function(e) {
        // Предотвращаем переход по ссылке, если картинка была обернута в <a>
        e.preventDefault();
        e.stopPropagation();

        const src = img.currentSrc || img.src;
        if (src) {
          modalImg.src = src;
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      });
    });
  }

  // Запуск при готовности DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
  } else {
    initLightbox();
  }
})();
