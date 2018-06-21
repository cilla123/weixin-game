import DataStore from '../base/DataStore'

// 结果
export default class Result {
  static getInstance() {
    if (!Result.instance) {
      Result.instance = new Result()
    }
    return Result.instance
  }
  constructor() {
    this.dataStore = DataStore.getInstance();
  }

  init() {
    this.dataStore.get('background').draw();
    this.dataStore.get('result-nr').drawPage()
    this.dataStore.get('footer').draw('#000');
    this.dataStore.get('nav-back').draw();
    this.dataStore.get('nav-title').draw();
  }
}