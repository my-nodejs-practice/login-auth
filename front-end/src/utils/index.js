import Cookies from 'js-cookie';

const USERNAME_KEY = 'AUTH_USER_NAME';
const TOKEN_KEY = 'AUTH_USER_TOKEN';
const DEFAULT_USERNAME = '无名';

export function getToken() {
  return Cookies.get(TOKEN_KEY);
}

export function setToken(token) {
  return Cookies.set(TOKEN_KEY, token);
}

export function removeToken() {
  return Cookies.remove(TOKEN_KEY);
}

export function getUserName() {
  return decodeURI(Cookies.get(USERNAME_KEY)) || DEFAULT_USERNAME;
}

export function setUserName(name) {
  return Cookies.set(USERNAME_KEY, name);
}

export function removeUserName() {
  return Cookies.remove(USERNAME_KEY);
}
