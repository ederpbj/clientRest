import {create} from 'apisauce';

//API
const api = create({
  baseURL: 'http://localhost:3000',
});

//interceptador, altera dados da api antes de chegar no react
//verifica se tem erro
api.addResponseTransform(response => {
  if (!response.ok) throw response;
});

export default api;
