import { AuthAPI } from "./api.ts";

export function setupEmailAndPasswordValidation() {
  const form = document.getElementById(
    "register-form",
  ) as HTMLFormElement | null;
  if (!form) return;
  const successPopup = document.getElementById(
    "success-popup",
  ) as HTMLElement | null;
  const popupOverlay = document.querySelector(".popup-overlay") as HTMLElement;
  const closeBtn = document.querySelector(".popup-close");

  const emailInput = document.getElementById(
    "email",
  ) as HTMLInputElement | null;
  const passwordInput = document.getElementById(
    "password",
  ) as HTMLInputElement | null;
  if (!emailInput || !passwordInput) return;

  const emailWrapper = emailInput.parentElement!;
  const passwordWrapper = passwordInput.parentElement!;

  const authApi = new AuthAPI("https://api.dating.com/identity");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateEmail(emailInput.value)) {
      emailWrapper.classList.add("invalid");
      valid = false;
    } else {
      emailWrapper.classList.remove("invalid");
    }

    // Проверка пароля ≥ 8 символов
    if (passwordInput.value.length < 8) {
      passwordWrapper.classList.add("invalid");
      valid = false;
    } else {
      passwordWrapper.classList.remove("invalid");
    }

    if (valid) {
      authApi
        .checkAuth(emailInput.value, passwordInput.value)
        .then((checkRes) => {
          if (checkRes.success && checkRes.data) {
            sessionStorage.setItem("token", checkRes.data.id);
            window.location.href = `https://www.dating.com/people/#token=${checkRes.data.id}`;
          } else if (!checkRes.success) {
            console.log(
              "Пользователь не найден или ошибка, идем на регистрацию",
            );

            authApi
              .register({
                email: emailInput.value,
                password: passwordInput.value,
              })
              .then((data) => {
                if (data.success && successPopup && data.data) {
                  sessionStorage.setItem("token", data?.data?.id);
                  window.location.href = `https://www.dating.com/people/#token=${data.data.id}`;

                  successPopup.classList.add("active");

                  closeBtn?.addEventListener("click", () => {
                    popupOverlay.classList.remove("active");
                    successPopup.classList.remove("active");
                  });
                  popupOverlay.addEventListener("click", () => {
                    successPopup.classList.remove("active");
                  });
                } else {
                  console.error("Регистрация не удалась:", data.error?.message);
                }
              });
          }
        });
    }
  });

  // Сброс ошибки при вводе
  emailInput.addEventListener("input", () =>
    emailWrapper.classList.remove("invalid"),
  );
  passwordInput.addEventListener("input", () =>
    passwordWrapper.classList.remove("invalid"),
  );

  function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
