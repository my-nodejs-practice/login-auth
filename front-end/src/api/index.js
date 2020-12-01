import req from './request';

export function login({ username, password }) {
  return req({
    url: '/login',
    method: 'POST',
    data: {
      username,
      password,
    },
  });
}

export function getUserInfo() {
  return req({
    url: '/user_info',
  });
}
