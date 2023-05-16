import axios from 'axios';

export const getState = () => {
  let config = {
    method: 'get',
    url: 'https://api.countrystatecity.in/v1/countries/IN/states',
    headers: {
      'X-CSCAPI-KEY':
        'ZFFKOUFROGZ0aVU3bU0yd2JVUTlFUEdVZWZDYzg2Rkg0cm50V0EzUw==',
    },
  };

  return axios(config);
};

export const getCities = state => {
  let config = {
    method: 'get',
    url: `https://api.countrystatecity.in/v1/countries/IN/states/${state}/cities`,
    headers: {
      'X-CSCAPI-KEY':
        'ZFFKOUFROGZ0aVU3bU0yd2JVUTlFUEdVZWZDYzg2Rkg0cm50V0EzUw==',
    },
  };
  return axios(config);
};
