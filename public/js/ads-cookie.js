document.addEventListener("DOMContentLoaded", function () {
  const cookieBar = document.getElementById("cookieBar");
  const acceptCookiesBtn = document.getElementById("acceptCookies");
  const adBanner = document.getElementById("adBanner");
  const dismissAdBtn = document.getElementById("dismissAdBanner");

  // ✅ Show cookie bar if not accepted (persistent)
  if (cookieBar && !localStorage.getItem("cookieAccepted")) {
    cookieBar.style.display = "block";
  }

  if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener("click", function () {
      localStorage.setItem("cookieAccepted", "true");
      cookieBar.style.display = "none";
    });
  }

  // ✅ Only show ad banner once per session
  const adDismissed = sessionStorage.getItem("adDismissed");

  if (adBanner && !adDismissed) {
    adBanner.style.display = "block";
  } else if (adBanner) {
    adBanner.style.display = "none";
  }

  if (dismissAdBtn) {
    dismissAdBtn.addEventListener("click", function () {
      sessionStorage.setItem("adDismissed", "true");
      adBanner.style.display = "none";
    });
  }
});
