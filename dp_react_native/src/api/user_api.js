import ApiManager from './ApiManager';
export const user_get = async data => {
  try {
    const result = await ApiManager('/employee', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0ZXJAdGVzdGVyLmNvbSIsImlhdCI6MTY5NzIxMTEzMywiZXhwIjoxNjk3MjEyNTczfQ.6nP9RnfmIF6sbBokO-HC5ljiL9aEKyppr0qYoK80tro',
      },
      data: data,
    });
  } catch (error) {
    return error.response.data;
  }
};
