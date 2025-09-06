import { AuthAPI } from "./api.ts";

export async function authenticateOrRegister(
  email: string,
  password: string,
  successPopup?: HTMLElement,
  popupOverlay?: HTMLElement,
  closeBtn?: HTMLElement,
) {
  const authApi = new AuthAPI("https://api.dating.com/identity");

  try {
    const checkRes = await authApi.checkAuth(email, password);

    if (checkRes.success && checkRes.data) {
      sessionStorage.setItem("token", checkRes.data.id);
      window.location.href = `https://www.dating.com/people/#token=${checkRes.data.id}`;
    } else {
      console.log("Пользователь не найден, идем на регистрацию");

      const regRes = await authApi.register({ email, password });

      if (regRes.success && regRes.data) {
        sessionStorage.setItem("token", regRes.data.id);

        if (successPopup) successPopup.classList.add("active");

        closeBtn?.addEventListener("click", () => {
          popupOverlay?.classList.remove("active");
          successPopup?.classList.remove("active");
        });
        popupOverlay?.addEventListener("click", () => {
          successPopup?.classList.remove("active");
        });

        setTimeout(() => {
          window.location.href = `https://www.dating.com/people/#token=${regRes.data.id}`;
        }, 3000);
      } else {
        console.error("Регистрация не удалась:", regRes.error?.message);
      }
    }
  } catch (err) {
    console.error("Ошибка авторизации/регистрации:", err);
  }
}
