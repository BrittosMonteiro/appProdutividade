import API_URL from './config';

export async function createListService(data) {
  return await fetch(`${API_URL}/lists/create`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function readMiniListService(idUser) {
  return await fetch(`${API_URL}/lists/readMiniList/${idUser}`);
}

export async function readListService(idUser) {
  return await fetch(`${API_URL}/lists/readList/${idUser}`);
}

export async function readItemListService(idList) {
  return await fetch(`${API_URL}/lists/readOne/${idList}`);
}

export async function updateListService(data) {
  return await fetch(`${API_URL}/lists/update`, {
    method: 'PUT',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function deleteListService(idList) {
  return await fetch(`${API_URL}/lists/delete`, {
    method: 'DELETE',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(idList),
  });
}
