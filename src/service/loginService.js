import API_URL from './config';

export async function createUserService(data) {
  return await fetch(`${API_URL}/login/createroute`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function loginService(data) {
  return await fetch(`${API_URL}/login/loginroute`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}
