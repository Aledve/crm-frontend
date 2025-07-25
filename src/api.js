const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = 'Error en la solicitud';
    try {
      const error = await response.json();
      errorMessage = error.message || errorMessage;
    } catch (_) {
      const errorText = await response.text();
      if (errorText) errorMessage = errorText;
    }
    throw new Error(errorMessage);
  }

  const contentLength = response.headers.get('content-length');
  const contentType = response.headers.get('content-type') || '';

  if (response.status === 204 || contentLength === '0') return null;

  if (contentType.includes('application/json')) {
    return await response.json();
  }

  return null;
};

export const authService = {
  login: async ({ username, password }) => {
    const response = await fetch(`${BASE_URL}/authService/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    return await handleResponse(response);
  },
};

export const personService = {
   getAll: async () => {
    const response = await fetch(`${BASE_URL}/personService`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Error al obtener personas');
    }

    return response.json();
  },
  register: async (personData) => {
    console.log('Datos de registro:', personData);
    const response = await fetch(`${BASE_URL}/personService`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(personData),
    });

    return await handleResponse(response);
  },
};

export const projectService = {
  create: async (projectData) => {
    const response = await fetch(`${BASE_URL}/projectService`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });

    return await handleResponse(response);
  },

  getAll: async () => {
    const response = await fetch(`${BASE_URL}/projectService`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return await handleResponse(response);
  },
};

export const teamService = {
  create: async (teamData) => {
    const response = await fetch(`${BASE_URL}/teamService`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teamData),
    });

    return await handleResponse(response);
  },

  getAll: async () => {
    const response = await fetch(`${BASE_URL}/teamService`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return await handleResponse(response);
  },
};

export const taskService = {
  create: async (taskData) => {
    const response = await fetch(`${BASE_URL}/taskService`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });

    return await handleResponse(response);
  },

  getAll: async () => {
    const response = await fetch(`${BASE_URL}/taskService`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return await handleResponse(response);
  },
};


export const objectiveService = {
  create: async (objectiveData) => {
    const response = await fetch(`${BASE_URL}/objectiveService`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(objectiveData),
    });

    return await handleResponse(response);
  },

  getAll: async () => {
    const response = await fetch(`${BASE_URL}/objectiveService`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return await handleResponse(response);
  },
};
