import API_URL from './config';

export async function createRoutineService(data) {
  return await fetch(`${API_URL}/routines/create`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function readRoutineMiniListService(idUser) {
  return await fetch(`${API_URL}/routines/readMiniList/${idUser}`);
}

export async function readRoutineListService(idUser) {
  return await fetch(`${API_URL}/routines/readList/${idUser}`);
}

export async function readRoutineService(idRoutine) {
  return await fetch(`${API_URL}/routines/readOne/${idRoutine}`);
}

export async function updateRoutineService(data) {
  return await fetch(`${API_URL}/routines/update`, {
    method: 'PUT',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data),
  });
}

export async function deleteRoutineService(idRoutine) {
  return await fetch(`${API_URL}/routines/delete`, {
    method: 'DELETE',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(idRoutine),
  });
}
