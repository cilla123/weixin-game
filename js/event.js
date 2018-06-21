import DataStore from "./base/DataStore"
import Result from './pages/Result'

// 所有事件列表
export default class AllEvent {
  static getInstance() {
    if (!AllEvent.instance) {
      AllEvent.instance = new AllEvent();
    }
    return AllEvent.instance;
  }

  constructor() {
    this.DataStore =DataStore.getInstance()
    this.ctx = this.DataStore.ctx;
    this.canvas = this.DataStore.canvas;
  }

  // 开始游戏
  start(res, x, y) {
    const touchesX = res.touches[0].clientX
    const touchesY = res.touches[0].clientY
    if (touchesX >= x[0] && touchesX <= x[1] && touchesY >= y[0] && touchesY <= y[1]) {
      this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
      const ResultPage = Result.getInstance()
      ResultPage.init()
    }
  }
}