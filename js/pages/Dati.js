import DataStore from '../base/DataStore'

// 结果
export default class Dati {
  static getInstance() {
    if (!Dati.instance) {
      Dati.instance = new Dati()
    }
    return Dati.instance
  }
  constructor() {
    this.dataStore = DataStore.getInstance();
  }

  init() {
    this.dataStore.get('background').draw();
    this.dataStore.get('footer').draw();
    this.dataStore.get('nav-back').draw();
    this.dataStore.get('nav-title').draw();
    this.dataStore.get('dati-nr').drawPage();
  }
}