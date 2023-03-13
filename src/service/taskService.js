import API_URL from './config';

export async function createTaskService(data) {
  return await fetch(`${API_URL}/tasks/create`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function readTaskMiniListService(idUser) {
  return await fetch(`${API_URL}/tasks/readMiniList/${idUser}`);
}

export async function readTaskListService(idUser) {
  return await fetch(`${API_URL}/tasks/readList/${idUser}`);
}

export async function readTaskService(idTask) {
  return await fetch(`${API_URL}/tasks/readOne/${idTask}`);
}

export async function updateTaskService(data) {
  return await fetch(`${API_URL}/tasks/update`, {
    method: 'PUT',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function deleteTaskService(idTask) {
  return await fetch(`${API_URL}/tasks/delete`, {
    method: 'DELETE',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(idTask),
  });
}
