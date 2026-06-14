// /public/js/cms-loader.js
(function() {
  const config = {
    api: 'https://api-xstb.vercel.app/api',
    slug: window.location.hostname.split('.')[0]
  };

  window.CMS_CONFIG = config;

  const script = document.createElement('script');
  script.src = 'https://api-xstb.vercel.app/cms-connector.js';
  script.async = true;
  document.head.appendChild(script);
})();