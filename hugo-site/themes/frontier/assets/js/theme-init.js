(function() {
  try {
    var s = localStorage.getItem('theme');
    var d = document.documentElement;
    var m = document.querySelector('meta[name="theme-color"]');
    var hex;
    if (s === 'dark' || s === 'light') {
      d.setAttribute('data-theme', s);
      hex = s === 'dark' ? '#0a0a0c' : '#ffffff';
      if (m) m.setAttribute('content', hex);
    } else {
      var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      d.setAttribute('data-theme', dark ? 'dark' : 'light');
      hex = dark ? '#0a0a0c' : '#ffffff';
      if (m) m.setAttribute('content', hex);
    }
  } catch (e) {}
})();
