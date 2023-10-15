import apiClient from ".";

export const login = async (username: string, password: string) => {
  try {
    const response = await apiClient.post("/login/", {
      username,
      password,
    });

    const { data } = response;

    localStorage.setItem("authToken", data.token);
    return data;
  } catch (error) {
    throw new Error("Login failed");
  }
};
