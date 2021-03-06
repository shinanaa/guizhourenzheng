const useUrl = 'p'
const mock_url = 'http://192.168.4.11:3000'
const url={
    l: 'http://192.168.4.12:8080/api/', //真实
    t: 'http://127.0.0.1:3000',  //测试
    p: 'http://121.41.83.191:10010/api/'
  }

module.exports = {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  J_API: url[useUrl],
  BASE_API: '"https://api-dev"',
  MOCK_API: mock_url
}
