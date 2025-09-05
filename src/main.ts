import "./styles/main.sass";
import { initPopup } from "./components/popup";
import { setupEmailAndPasswordValidation } from "./components/form";

document.addEventListener("DOMContentLoaded", () => {
  initPopup();
  setupEmailAndPasswordValidation();
});
