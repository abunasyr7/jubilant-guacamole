import { validateEmail } from "../helpers/validation.ts";
import { authenticateOrRegister } from "./authService.ts";

export function setupEmailAndPasswordValidation() {
  const form = document.getElementById(
    "register-form",
  ) as HTMLFormElement | null;
  if (!form) return;
  const successPopup = document.getElementById(
    "success-popup",
  ) as HTMLElement | null;
  const popupOverlay = document.querySelector(".popup-overlay") as HTMLElement;
  const closeBtn = document.querySelector(".popup-close") as HTMLElement;

  const emailInput = document.getElementById(
    "email",
  ) as HTMLInputElement | null;
  const passwordInput = document.getElementById(
    "password",
  ) as HTMLInputElement | null;
  if (!emailInput || !passwordInput) return;

  const emailWrapper = emailInput.parentElement!;
  const passwordWrapper = passwordInput.parentElement!;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateEmail(emailInput.value)) {
      emailWrapper.classList.add("invalid");
      valid = false;
    } else {
      emailWrapper.classList.remove("invalid");
    }

    if (passwordInput.value.length < 8) {
      passwordWrapper.classList.add("invalid");
      valid = false;
    } else {
      passwordWrapper.classList.remove("invalid");
    }

    if (valid && successPopup) {
      await authenticateOrRegister(
        emailInput.value,
        passwordInput.value,
        successPopup,
        popupOverlay,
        closeBtn,
      );
    }
  });

  // Сброс ошибки при вводе
  emailInput.addEventListener("input", () =>
    emailWrapper.classList.remove("invalid"),
  );
  passwordInput.addEventListener("input", () =>
    passwordWrapper.classList.remove("invalid"),
  );
}
