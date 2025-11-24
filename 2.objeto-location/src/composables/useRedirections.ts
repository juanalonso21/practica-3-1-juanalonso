export function useSelectNav() {
  function selectNav(): void {
    const agent = navigator.userAgent;

    if (agent.includes("Firefox")) {
      window.location.assign("firefox.html");
    } else if (agent.includes("Chrome") && !agent.includes("Edg")) {
      window.location.assign("chrome.html");
    }
  }

  return { selectNav };
}

export function useRedirectTimer() {
  function redirectAfter(seconds: number, url: string): void {
    setTimeout(() => {
      window.location.assign(url);
    }, seconds * 1000);
  }

  return { redirectAfter };
}

export function useEnforceHttps() {
  function enforceHTTPS(): void {
    if (window.location.protocol === "http:") {
      window.location.href = window.location.href.replace("http://", "https://");
    }
  }

  return { enforceHTTPS };
}

export function useRedirectByLanguage() {
  function redirectByLanguage(): void {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang");

    if (lang === "en") {
      window.location.assign("lang-en.html");
    } else if (lang === "es") {
      window.location.assign("lang-es.html");
    }
  }

  return { redirectByLanguage };
}
