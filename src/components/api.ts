export interface AuthData {
  email: string;
  password: string;
}

export interface CheckAuthResponse {
  id: string;
  email: string;
  roles: string[];
  "auth-schemes": { name: string }[];
}

export interface AuthSuccessResponse {
  email: string;
  id: string;
  password: string;
}

export interface AuthResult<T = any> {
  success: boolean;
  data?: T;
  error?: { message: string };
}

export class AuthAPI {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async checkAuth(
    email: string,
    password: string,
  ): Promise<AuthResult<CheckAuthResponse>> {
    const basic = btoa(`${email}:${password}`); // Base64
    try {
      const res = await fetch(this.url, {
        method: "GET",
        headers: {
          Authorization: `Basic ${basic}`,
        },
      });

      if (res.ok) {
        const json: CheckAuthResponse = await res.json();
        return { success: true, data: json };
      } else {
        return { success: false, error: { message: `Ошибка ${res.status}` } };
      }
    } catch (err) {
      return { success: false, error: { message: (err as Error).message } };
    }
  }

  async register(data: AuthData): Promise<AuthResult> {
    try {
      const res = await fetch(this.url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const json: AuthSuccessResponse = await res.json();
        return { success: true, data: json };
      } else {
        return { success: false, error: { message: `Ошибка ${res.status}` } };
      }
    } catch (err) {
      console.error("Ошибка при запросе:", err);
      return { success: false, error: { message: (err as Error).message } };
    }
  }
}
