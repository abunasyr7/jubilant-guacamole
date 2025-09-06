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
        const token = regRes.data.id;
        sessionStorage.setItem("token", regRes.data.id);

        if (successPopup) successPopup.classList.add("active");

        const redirect = () => {
          popupOverlay?.classList.remove("active");
          successPopup?.classList.remove("active");
          window.location.href = `https://www.dating.com/people/#token=${token}`;
        };

        closeBtn?.addEventListener("click", redirect);
        popupOverlay?.addEventListener("click", (e) => {
          if (e.target === popupOverlay) redirect();
        });
      } else {
        console.error("Регистрация не удалась:", regRes.error?.message);
      }
    }
  } catch (err) {
    console.error("Ошибка авторизации/регистрации:", err);
  }
}
