const axios = require('axios').default;
const port = 8080;

const spring = axios.create({ baseURL: `http://localhost:${port}` });

export default spring;