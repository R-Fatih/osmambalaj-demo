(function () {
  var en = (document.documentElement.lang || 'tr') !== 'tr';
  var msg = en ? 'This is a design preview. Forms are disabled in the demo; please contact us by phone or e-mail.'
               : 'Bu bir tasarım önizlemesidir. Demo sürümünde form gönderimi kapalıdır; lütfen telefon veya e-posta ile ulaşın.';
  document.querySelectorAll('form').forEach(function (f) {
    var search = f.getAttribute('role') === 'search';
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!search) { alert(msg); return; }
      var q = (f.querySelector('input[name=q]') || {}).value || '';
      q = q.toLocaleLowerCase(en ? 'en' : 'tr').trim();
      document.querySelectorAll('article').forEach(function (c) {
        c.style.display = !q || c.innerText.toLocaleLowerCase(en ? 'en' : 'tr').indexOf(q) >= 0 ? '' : 'none';
      });
    });
  });
  var b = document.createElement('div');
  b.textContent = en ? 'Design preview' : 'Tasarım önizlemesi';
  b.setAttribute('style', 'position:fixed;left:16px;bottom:16px;z-index:60;background:#2a3138;color:#fff;font:600 12px Inter,sans-serif;padding:8px 12px;border-radius:999px;opacity:.85;pointer-events:none');
  document.body.appendChild(b);
})();
