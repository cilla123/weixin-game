import Background from './runtime/Background'
import NavBack from './runtime/NavBack'
import NavTitle from './runtime/NavTitle'
import RuleContent from './runtime/RuleContent'
import Footer from './runtime/Footer'
import ResultNr from './runtime/ResultNr'
import DatiNr from './runtime/DatiNr'

import Director from './Director'
import ResourceLoader from './base/ResourceLoader'
import DataStore from './base/DataStore'

/**
 * 游戏主函数
 */
export default class Main {

  constructor() {
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d')
    this.dataStore = DataStore.getInstance()
    this.director = Director.getInstance()

    const loader = ResourceLoader.create();
    loader.onLoaded(map => this.onResourceFirstLoaded(map));
  }

  /**
   * 初始化
   */
  init(){
    this.director.isGameOver = false;
    // 设置数据
    this.dataStore
      .put('background', Background)
      .put('footer', Footer)
      .put('nav-back', NavBack)
      .put('nav-title', NavTitle)
      .put('result-nr', ResultNr)
      .put('rule-content', RuleContent)
      .put('dati-nr', DatiNr)

    this.registerEvent();
    this.director.run();
  }

  /**
   * 首次资源加载
   */
  onResourceFirstLoaded(map){

    this.dataStore.canvas = this.canvas;
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;
    this.createBackgroundMusic();

    this.init();
  }

  /**
   * 创建背景音乐
   */
  createBackgroundMusic() {
    const bgm = wx.createInnerAudioContext();
    bgm.autoplay = true;
    bgm.loop = true;
    bgm.src = 'audios/bgm.mp3';
  }

  registerEvent() {
    wx.onTouchStart(() => {
      if (this.director.isGameOver) {
        console.log('游戏开始');
        this.init();
      } else {

      }
    });
  }

}
