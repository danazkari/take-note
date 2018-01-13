const basePath = 'http://localhost:3000/api/notes';

const makeRequest = (path = '', method = 'GET', data = {}) => {
  const init = {
    method,
    ...(/GET|HEAD/.test(method) ? {} : { body: JSON.stringify(data) }),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  };

  return fetch(`${basePath}${path}`, init)
    .then(response => response.text())
    .then(JSON.parse);
};

export const deleteNote = (id) => {
  return makeRequest(`/${id}`, 'DELETE');
};

export const editNote = (note) => {
  return makeRequest(`/${note.id}`, 'PUT', note);
}

export const createNote = (title, text) => {
  return makeRequest('/', 'POST', { title, text });
};

export const fetchNotes = (filter) => {
  let urlParams = '';

  if (filter) {
    urlParams = `?filter=${encodeURI(JSON.stringify(filter))}`;
  }

  return makeRequest(`/${urlParams}`);
};
