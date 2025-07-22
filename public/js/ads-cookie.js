document.addEventListener("DOMContentLoaded", function () {
  const cookieBar = document.getElementById("cookieBar");
  const acceptCookiesBtn = document.getElementById("acceptCookies");
  const adBanner = document.getElementById("adBanner");
  const dismissAdBtn = document.getElementById("dismissAdBanner");

  // Show cookie bar if not accepted
  if (!localStorage.getItem("cookieAccepted") && cookieBar) {
    cookieBar.style.display = "block";
  }

  // Accept cookies
  if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener("click", function () {
      localStorage.setItem("cookieAccepted", "true");
      cookieBar.style.display = "none";
    });
  }

  // Show ad banner if not dismissed
  if (!localStorage.getItem("adDismissed") && adBanner) {
    adBanner.style.display = "block";
  }

  // Dismiss ad banner
  if (dismissAdBtn) {
    dismissAdBtn.addEventListener("click", function () {
      localStorage.setItem("adDismissed", "true");
      adBanner.style.display = "none";
    });
  }
});