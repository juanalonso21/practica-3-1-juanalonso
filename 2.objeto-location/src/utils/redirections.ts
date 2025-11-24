export function selectNav(): void {
  const userAgent = navigator.userAgent;
  
  if (userAgent.includes('Firefox')) {
    window.location.href = 'firefox.html';
  } else if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    window.location.href = 'chrome.html';
  } else {
    console.log('Navegador no soportado');
  }
}

export function redirectWithTimer(url: string, seconds: number): void {
  console.log(`Redirigiendo a ${url} en ${seconds} segundos...`);
  
  setTimeout(() => {
    window.location.href = url;
  }, seconds * 1000);
}

export function enforceHTTPS(): void {
  if (window.location.protocol === 'http:') {
    window.location.href = window.location.href.replace('http://', 'https://');
  }
}

export function redirectByLanguage(): void {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang');
  
  if (lang === 'en') {
    window.location.href = 'lang-en.html';
  } else if (lang === 'es') {
    window.location.href = 'lang-es.html';
  } else {
    console.log('Idioma no especificado o no soportado');
  }
}
