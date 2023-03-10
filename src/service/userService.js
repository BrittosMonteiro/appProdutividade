import API_URL from './config';

export async function createUserService(data) {
  return await fetch(`${API_URL}/login/create-account`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function loginUserService(data) {
  return await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}
