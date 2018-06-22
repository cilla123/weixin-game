import DataStore from "./base/DataStore"
import Result from './pages/Result'
import Index from './pages/index'
import Dati from './pages/Dati'
import Api from './utils/api'


// 所有事件列表
export default class AllEvent {
  static getInstance() {
    if (!AllEvent.instance) {
      AllEvent.instance = new AllEvent();
    }
    return AllEvent.instance;
  }

  constructor() {
    this.DataStore = DataStore.getInstance()
    this.ctx = this.DataStore.ctx;
    this.canvas = this.DataStore.canvas;
  }

  // 开始游戏
  start(res, x, y) {
    const touchesX = res.touches[0].clientX
    const touchesY = res.touches[0].clientY
    if (touchesX >= x[0] && touchesX <= x[1] && touchesY >= y[0] && touchesY <= y[1]) {
      Api.getQueList().then(res => {
        const data = res.data

        this.DataStore.put('dati', data)
        this.DataStore.put('time', {
          time: '00:00',
          timer: null,
          currentTime: data.time,
          // currentTime: 2,
          current: 0
        })
        this.datiPage()
        this.addEvent()
      })
    }
  }

  // 渲染答题页面
  datiPage() {
    const time = this.DataStore.get('time')
    const data = this.DataStore.get('dati')
    if (time.timer) {
      clearInterval(time.timer)
      time.timer = null
      this.DataStore.put('wrongAnswer', '')
    }

    wx.offTouchStart()
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    const DatiPage = Dati.getInstance()
    DatiPage.init()
  }


  // 选择答案
  answer(res, x, y, data, type) {
    const touchesX = res.touches[0].clientX
    const touchesY = res.touches[0].clientY
    if (touchesX >= x[0] && touchesX <= x[1] && touchesY >= y[0] && touchesY <= y[1]) {
      this.getAnswer(data, type)
    }
  }

  getAnswer(data, type) {
    let listData = this.DataStore.get('dati')
    let time = this.DataStore.get('time')
    const dataJson = {
      uuid: listData.uuid,
      topicId: listData.topicResultList[time.current].id,
      sort: listData.topicResultList[time.current].sort,
      answerId: data.id,
      type: type
    }
    clearInterval(time.timer)
    time.timer = null
    Api.getAnswer(dataJson).then(res => {
      const data1 = res.data
      if (data1.answerResult == 1) {
        data.btn = 1
        this.datiPage()
        this.rightAnwser(time, listData)
      } else if (data1.answerResult == 2) {
        data.btn = 2
        this.wrongAnswer(type)
      }
    })
  }

  // 答对题
  rightAnwser(time, listData) {
    setTimeout(() => {
      if (time.current >= listData.count) {
        console.log('答题完了')
        this.isDaCuoHuoTiShi(2)
        return false
      }
      time.current += 1
      time.currentTime = listData.time
      this.datiPage()
      this.addEvent()
    }, 1000)
  }

  // 答错题
  wrongAnswer(type) {
    wx.offTouchStart()
    this.DataStore.put('ejectText', type)
    this.DataStore.get('eject-box').drawBox()
    this.tiShiEvent(2)
  }

  // 答题页面的所有事件
  addEvent() {
    wx.onTouchStart((res) => {
      const time = this.DataStore.get('time')
      // 答案的按钮
      const list = this.DataStore.get('dati').topicResultList[time.current]
      list.answerList.forEach((item, index) => {
        if (item.btn == 2) return false
        this.changeAnswer(res, item, index, 1)
      })
      //  添加锦囊事件
      this.changeSilkBag(res)
    })
  }

  // 选择答案的事件
  changeAnswer(res, item, index, type) {
    const canvasWidth = this.canvas.width / 2
    const x = [canvasWidth - 538 / 4, canvasWidth - 538 / 4 + 538 / 2]
    const y = [602 / 2 + 62 * index, 602 / 2 + 62 * index + 98 / 2]
    this.answer(res, x, y, item, type)
  }

  // 选择锦囊
  changeSilkBag(res) {
    const touchesX = res.touches[0].clientX
    const touchesY = res.touches[0].clientY
    const canvasWidth = this.canvas.width / 2
    const x1 = [canvasWidth - 92 / 2, canvasWidth - 92 / 2 + 66 / 2] //提示
    const x2 = [canvasWidth + 12, canvasWidth + 12 + 66 / 2] //时间
    const x3 = [canvasWidth + (148 / 2), canvasWidth + (148 / 2) + 66 / 2] //划掉
    const y = [1090 / 2, 1090 / 2 + 66 / 2]

    if (touchesX >= x1[0] && touchesX <= x1[1] && touchesY >= y[0] && touchesY <= y[1]) {
      //提示
      this.useSilkBag(3)
      console.log('提示')
    } else if (touchesX >= x2[0] && touchesX <= x2[1] && touchesY >= y[0] && touchesY <= y[1]) {
      //时间
      this.useSilkBag(2)
      console.log('时间')
    } else if (touchesX >= x3[0] && touchesX <= x3[1] && touchesY >= y[0] && touchesY <= y[1]) {
      //划掉
      this.useSilkBag(1)
      console.log('划掉')
    }
  }

  // 使用锦囊的请求
  useSilkBag(type) {
    let listData = this.DataStore.get('dati')
    let time = this.DataStore.get('time')
    let data = {
      uuid: listData.uuid,
      topicId: listData.topicResultList[time.current].id,
      sort: listData.topicResultList[time.current].sort,
      type
    }

    // 暂停时间
    clearInterval(time.timer)
    time.timer = null
    Api.useSilkBag(data).then(res => {
      if (res.status == '50001032') {
        // 锦囊不足，需要弹出框
        return false
      }
      this.handleSilk(type, res.data)
    })
  }

  // 处理锦囊
  handleSilk(key, data) {
    let time = this.DataStore.get('time')
    key = parseInt(key)
    switch (key) {
      case 1:
        let json = {}
        let arr = data.answerList

        if (arr.length) {
          arr.forEach(item => {
            json[item] = 1
          })
          this.DataStore.put('wrongAnswer', json)
          this.datiPage()
          this.addEvent()
        }
        break;
      case 2:
        time.currentTime += parseInt(data.time || 0)
        this.datiPage()
        this.addEvent()
        break;
      case 3:
        wx.offTouchStart()
        this.DataStore.put('ejectText', 2)
        this.DataStore.put('ejectText1', data.tips)
        this.DataStore.get('eject-box').drawBox()
        this.tiShiEvent(1)
        break;

      default:
        break;
    }
  }

  // 弹出锦囊提示的事件
  tiShiEvent(type) {
    wx.onTouchStart((res) => {
      const touchesX = res.touches[0].clientX
      const touchesY = res.touches[0].clientY
      const canvasWidth = this.canvas.width / 2
      // 确认按钮位置
      const x1 = [canvasWidth - 314 / 4, canvasWidth - 314 / 4 + 314 / 2]
      const y1 = [745 / 2, 98 / 2 + 745 / 2]

      // 开关按钮的位置
      const x2 = [canvasWidth + 172 / 2, canvasWidth + 172 / 2 + 55 / 2]
      const y2 = [(468 + 34) / 2, 55 / 2 + (468 + 34) / 2]

      if (touchesX >= x1[0] && touchesX <= x1[1] && touchesY >= y1[0] && touchesY <= y1[1]) {
        this.isDaCuoHuoTiShi(type)
      } else if (touchesX >= x2[0] && touchesX <= x2[1] && touchesY >= y2[0] && touchesY <= y2[1]) {
        this.isDaCuoHuoTiShi(type)
      }
    })
  }

  // 判断是锦囊事件还是答错的事件
  isDaCuoHuoTiShi(type) {
    // 锦囊
    if (type == 1) {
      this.datiPage()
      this.addEvent()
    } else if (type == 2) {
      // 答错
      let listData = this.DataStore.get('dati')
      let data = {
        uuid: listData.uuid
      }
      Api.gameOver(data).then(res => {
        this.DataStore.put('user', res.data)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        const ResultPage = Result.getInstance()
        ResultPage.init()
        this.jieguoEvent()
      })
    } else if (type == 3) {
      // 时间到
    }
  }

  // 结果页面的事件
  jieguoEvent() {
    wx.onTouchStart((res) => {
      const touchesX = res.touches[0].clientX
      const touchesY = res.touches[0].clientY
      const canvasWidth = this.canvas.width / 2
      // 在玩一边按钮位置
      const x1 = [this.canvas.width / 2 - 438 / 4, this.canvas.width / 2 - 438 / 4 + 438 / 2]
      const y1 = [920 / 2, 98 / 2 + 920 / 2]

      // 返回按钮的位置
      const x2 = [18, 18 + 22]
      const y2 = [32, 32 + 18]

      if (touchesX >= x1[0] && touchesX <= x1[1] && touchesY >= y1[0] && touchesY <= y1[1]) {
        const IndexPage = Index.getInstance()
        IndexPage.init()
      } else if (touchesX >= x2[0] && touchesX <= x2[1] && touchesY >= y2[0] && touchesY <= y2[1]) {
        const IndexPage = Index.getInstance()
        IndexPage.init()
      }
    })
  }
}