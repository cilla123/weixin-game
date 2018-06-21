import request from './https.js'
export default {
  get: () => request.post('/prfinance/api/app/que/getQueList.json'),
  // 登录
  login: () => request.post('/prfinance/api/app/auth/login.json?phone=18688201818&password=123456'),
  // 开始答题-抽取题目
  getQueList: () => request.post('/prfinance/api/app/que/getQueList.json'),
  // 锦囊数量
  getSilkBag: () => request.post('/prfinance/api/app/que/getSilkBag.json'),
  // 回答问题
  getAnswer: (data) => request.post('/prfinance/api/app/que/answer.json', data),
  // 使用锦囊
  useSilkBag: (data) => request.post('/prfinance/api/app/que/useSilkBag.json', data),
  // 结束游戏
  gameOver: (data) => request.post('/prfinance/api/app/que/gameOver.json', data),
  // 充值
  pay: (data) => request.post('/prfinance/api/app/wallet/buyOrder.json', data),
  // 游戏简介
  introduction: () => request.post('/prfinance/api/app/que/getQueRule.json'),
  // 复活
  relive: (data) => request.post('/prfinance/api/app/que/relive.json', data)
}