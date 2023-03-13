export const setUser = data => {
  return {type: 'SET_USER', payload: data};
};

export const unsetUser = () => {
  return {type: 'UNSET_USER'};
};
