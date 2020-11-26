import req from './request';

export function login({ username, password }) {
  return req({
    method: 'POST',
    data: {
      username,
      password,
    },
  });
}
