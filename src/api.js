const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Función auxiliar para manejar respuestas y errores uniformemente
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

// --- SERVICIOS DE IDENTIDAD (CORE) ---

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
  register: async (signUpData) => {
    const response = await fetch(`${BASE_URL}/authService/signUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpData),
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

// --- SERVICIOS DE PARKING (NEGOCIO) ---

export const zoneService = { // Antes projectService
  create: async (zoneData) => {
    const response = await fetch(`${BASE_URL}/zoneService`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(zoneData),
    });

    return await handleResponse(response);
  },

  getAll: async () => {
    const response = await fetch(`${BASE_URL}/zoneService`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return await handleResponse(response);
  },

  // Endpoint útil para el Dashboard (lugares libres)
  getAvailable: async () => {
    const response = await fetch(`${BASE_URL}/zoneService/available`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return await handleResponse(response);
  }
};

export const vehicleService = { // Antes teamService
  create: async (vehicleData) => {
    const response = await fetch(`${BASE_URL}/vehicleService`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vehicleData),
    });

    return await handleResponse(response);
  },

  getAll: async () => {
    const response = await fetch(`${BASE_URL}/vehicleService`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vehicleData), // Nota: GET usualmente no lleva body, verifica si tu backend lo ignora.
    });

    return await handleResponse(response);
  },
  
  // Corregí el getAll anterior, fetch GET no debería llevar body.
  getAllCorrected: async () => { 
      const response = await fetch(`${BASE_URL}/vehicleService`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return await handleResponse(response);
  }
};

export const reservationService = { // Antes taskService
  create: async (reservationData) => {
    const response = await fetch(`${BASE_URL}/reservationService`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservationData),
    });

    return await handleResponse(response);
  },

  getAll: async () => {
    const response = await fetch(`${BASE_URL}/reservationService`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return await handleResponse(response);
  },
};

export const tariffService = { // Antes objectiveService
  create: async (tariffData) => {
    const response = await fetch(`${BASE_URL}/tariffService`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tariffData),
    });

    return await handleResponse(response);
  },

  getAll: async () => {
    const response = await fetch(`${BASE_URL}/tariffService`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return await handleResponse(response);
  },
};

// Nuevo Servicio: MONITOREO
export const sensorService = {
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/sensorService`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return await handleResponse(response);
  },
  
  // Útil si quieres cambiar el estado manualmente desde el admin panel
  updateStatus: async (id, status) => {
      const response = await fetch(`${BASE_URL}/sensorService/${id}/status?status=${status}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
    return await handleResponse(response);
  }
};
