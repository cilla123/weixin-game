import DataStore from '../base/DataStore'

// 首页
export default class Index {
  static getInstance() {
    if (!Index.instance) {
      Index.instance = new Index()
    }
    return Index.instance
  }
  constructor() {
    this.dataStore = DataStore.getInstance();
  }

  init() {
    this.dataStore.get('background').draw();
    this.dataStore.get('nav-back').draw();
    this.dataStore.get('nav-title').draw();
    this.dataStore.get('footer').draw();
    this.dataStore.get('rule-content').drawPage();
  }
}