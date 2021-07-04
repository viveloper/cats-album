const API_ENDPOINT = '';

export const request = async (nodeId) => {
  try {
    const res = await fetch(`${API_ENDPOINT}/${nodeId ? nodeId : ''}`);
    if (!res.ok) {
      throw new Error('Server Error');
    }
    return await res.json();
  } catch (e) {
    throw new Error(`${e.message}`);
  }
};
