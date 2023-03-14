import API_URL from './config';

export async function readUserService(idUser) {
  return await fetch(`${API_URL}/users/readOne/${idUser}`);
}

export async function updatePasswordService(data) {
  return await fetch(`${API_URL}/users/updatePassword`, {
    method: 'PUT',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function deleteUserService(idUser) {
  return await fetch(`${API_URL}/users/delete`, {
    method: 'DELETE',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(idUser),
  });
}
