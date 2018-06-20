import DataStore from './base/DataStore'

/**
 * 导演类
 */
export default class Director {

  /**
   * 获取单例
   */
  static getInstance(){
    if (!Director.instance) {
      Director.instance = new Director();
    }
    return Director.instance;
  }

  constructor(){
    this.dataStore = DataStore.getInstance();
  }


  check(){

  }

  /**
   * 运行
   */
  run(){
    this.check();
    if (!this.isGameOver) {
      this.dataStore.get('background').draw();

      let timer = requestAnimationFrame(() => this.run());
      this.dataStore.put('timer', timer);
    }else {
      console.log('游戏结束');
      this.dataStore.destroy();
      wx.triggerGC();
    }
  }

}