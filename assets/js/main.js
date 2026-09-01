(function(){
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');
  navToggle.addEventListener('click', function(){
    var open = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  primaryNav.querySelectorAll('.nav-toplink').forEach(function(a){
    a.addEventListener('click', function(){ primaryNav.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); });
  });
  // mobile: tap the caret area to expand a sub-menu instead of navigating away
  primaryNav.querySelectorAll('.nav-item.has-sub').forEach(function(item){
    var link = item.querySelector('.nav-toplink');
    link.addEventListener('click', function(e){
      if (window.matchMedia('(max-width: 860px)').matches && !item.classList.contains('open')) {
        e.preventDefault();
        primaryNav.querySelectorAll('.nav-item.has-sub.open').forEach(function(other){ if (other !== item) other.classList.remove('open'); });
        item.classList.toggle('open');
      }
    });
  });

  // type filter pills
  function applyFilter(bar, filter){
    var groupId = bar.dataset.group;
    var grid = document.querySelector('.grid[data-filterable="' + groupId + '"]');
    if (!grid) return;
    bar.querySelectorAll('.filter-pill').forEach(function(p){ p.classList.toggle('is-active', p.dataset.filter === filter); });
    grid.querySelectorAll('.card').forEach(function(card){
      var show = (filter === 'all') || (card.dataset.type === filter);
      card.style.display = show ? '' : 'none';
    });
  }
  document.querySelectorAll('.filter-bar').forEach(function(bar){
    bar.querySelectorAll('.filter-pill').forEach(function(pill){
      pill.addEventListener('click', function(){ applyFilter(bar, pill.dataset.filter); });
    });
  });

  // nav sub-links jump to a section and pre-apply its filter
  document.querySelectorAll('[data-jump-filter]').forEach(function(a){
    a.addEventListener('click', function(){
      var groupId = a.dataset.jump;
      var filter = a.dataset.jumpFilter;
      var bar = document.querySelector('.filter-bar[data-group="' + groupId + '"]');
      if (bar) applyFilter(bar, filter);
      primaryNav.classList.remove('open');
      primaryNav.querySelectorAll('.nav-item.has-sub.open').forEach(function(item){ item.classList.remove('open'); });
    });
  });

  // photo gallery: prev/next buttons + dots, kept in sync with scroll position
  document.querySelectorAll('.card-photo.has-photos').forEach(function(photoArea){
    var scroller = photoArea.querySelector('.photo-scroll');
    var dots = photoArea.querySelectorAll('.photo-dot');
    var prevBtn = photoArea.querySelector('.photo-prev');
    var nextBtn = photoArea.querySelector('.photo-next');
    if (!scroller || dots.length < 2) return;

    function goTo(index){
      index = Math.max(0, Math.min(dots.length - 1, index));
      scroller.scrollLeft = scroller.clientWidth * index;
    }
    function currentIndex(){
      return Math.round(scroller.scrollLeft / scroller.clientWidth);
    }
    if (prevBtn) prevBtn.addEventListener('click', function(){ goTo(currentIndex() - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function(){ goTo(currentIndex() + 1); });

    var scrollTimer;
    scroller.addEventListener('scroll', function(){
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function(){
        var idx = currentIndex();
        dots.forEach(function(d, i){ d.classList.toggle('is-active', i === idx); });
      }, 80);
    });
  });

  var toast = document.getElementById('toast');
  var toastText = document.getElementById('toastText');
  var toastTimer;
  function showToast(msg){
    toastText.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ toast.classList.remove('show'); }, 3200);
  }

  var scrim = document.getElementById('scrim');
  var panelSub = document.getElementById('panelSub');
  var fieldItem = document.getElementById('fieldItem');
  var panelClose = document.getElementById('panelClose');
  var inquiryForm = document.getElementById('inquiryForm');
  var lastFocused;

  function openPanel(itemName, general){
    lastFocused = document.activeElement;
    fieldItem.value = itemName;
    panelSub.textContent = general ? 'ご相談内容について確認いたします。' : '対象商品について、現物確認・お見積りのご相談を承ります。';
    scrim.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function(){ document.getElementById('fieldPlace').focus(); }, 200);
  }
  function closePanel(){
    scrim.classList.remove('open');
    document.body.style.overflow = '';
    if(lastFocused){ lastFocused.focus(); }
  }

  document.querySelectorAll('.js-inquiry').forEach(function(btn){
    btn.addEventListener('click', function(){
      openPanel(btn.dataset.item, btn.dataset.general === '1');
    });
  });
  panelClose.addEventListener('click', closePanel);
  scrim.addEventListener('click', function(e){ if(e.target === scrim) closePanel(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && scrim.classList.contains('open')) closePanel(); });

  inquiryForm.addEventListener('submit', function(e){
    e.preventDefault();

    if (!window.FORM_READY) {
      showToast('お問い合わせフォームは準備中です。しばらくお待ちください。');
      return;
    }

    var submitBtn = inquiryForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    fetch(inquiryForm.action, {
      method: 'POST',
      body: new FormData(inquiryForm),
      headers: { 'Accept': 'application/json' }
    }).then(function(res){
      submitBtn.disabled = false;
      if (res.ok) {
        closePanel();
        inquiryForm.reset();
        showToast('送信しました。ご連絡までしばらくお待ちください。');
      } else {
        showToast('送信に失敗しました。時間をおいて再度お試しください。');
      }
    }).catch(function(){
      submitBtn.disabled = false;
      showToast('送信に失敗しました。通信環境をご確認ください。');
    });
  });
})();
