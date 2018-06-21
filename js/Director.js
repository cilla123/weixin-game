import DataStore from './base/DataStore'
import Index from './pages/index'
import Result from './pages/Result'
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
      // 画图
      // const IndexPage = Index.getInstance()
      const IndexPage = Result.getInstance()
      IndexPage.init()

      // let timer = requestAnimationFrame(() => this.run());
      // this.dataStore.put('timer', timer);
    }else {
      console.log('游戏结束');
      this.dataStore.destroy();
      wx.triggerGC();
    }
  }

}