// Шляхи застосунку. Функції будують динамічні маршрути з id гравця.
export const ROUTES = {
  HOME: "/",
  SETTINGS: "/settings",
  USERS: "/users",
  user: (id) => `/users/${id}`,
  game: (id) => `/users/${id}/game`,
  results: (id) => `/users/${id}/results`,
};
