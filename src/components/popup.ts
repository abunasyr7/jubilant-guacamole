export function initPopup() {
  const popupOverlays = document.querySelectorAll(".popup-overlay");
  const popupOverlay = document.querySelector(".popup-overlay") as HTMLElement;
  const openBtn = document.querySelector(".btn-signup");
  const closeBtns = document.querySelectorAll(".popup-close");

  openBtn?.addEventListener("click", () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      window.location.href = `https://www.dating.com/people/#token=${token},`;
      return;
    }
    popupOverlay.classList.add("active");
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".popup-overlay").forEach((popup) => {
        popup.classList.remove("active");
      });
    });
  });

  popupOverlays.forEach((popup) => {
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popupOverlays.forEach((p) => p.classList.remove("active"));
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      popupOverlays.forEach((popup) => popup.classList.remove("active"));
    }
  });
}
