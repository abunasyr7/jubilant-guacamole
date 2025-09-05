export function initPopup() {
  const popupOverlay = document.querySelector(".popup-overlay") as HTMLElement;
  const openBtn = document.querySelector(".btn-signup");
  const closeBtn = document.querySelector(".popup-close");

  openBtn?.addEventListener("click", () => {
    popupOverlay.classList.add("active");
  });

  closeBtn?.addEventListener("click", () => {
    popupOverlay.classList.remove("active");
  });

  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) popupOverlay.classList.remove("active");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") popupOverlay.classList.remove("active");
  });
}
