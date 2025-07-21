// utils/auth.js
export const isLoggedIn = () => {
  if (typeof window === 'undefined') return true;
//   return !!localStorage.getItem('authToken'); // or use a boolean like 'isLoggedIn'
  return true; // or use a boolean like 'isLoggedIn'
};
