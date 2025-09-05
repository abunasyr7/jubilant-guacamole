export function setupEmailAndPasswordValidation() {
  const form = document.getElementById(
    "register-form",
  ) as HTMLFormElement | null;
  if (!form) return;

  const emailInput = document.getElementById(
    "email",
  ) as HTMLInputElement | null;
  const passwordInput = document.getElementById(
    "password",
  ) as HTMLInputElement | null;
  if (!emailInput || !passwordInput) return;

  const emailWrapper = emailInput.parentElement!;
  const passwordWrapper = passwordInput.parentElement!;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    // Проверка email
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
      console.log("Форма валидна!");
      form.submit(); // или твоя логика
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
