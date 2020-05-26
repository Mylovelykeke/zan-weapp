// components/skeleton/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bgcolor: {
      type: String,
      value: '#FFF'
    },
    selector: {
      type: String,
      value: 'skeleton'
    },
    loading: {
      type: String,
      value: 'spin'
    },
    flag: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    loadingAni: ['spin', 'chiaroscuro'],
    systemInfo: {},
    skeletonRectLists: [{
      "id": "",
      "dataset": {},
      "left": 0,
      "right": 414,
      "top": 0,
      "bottom": 264,
      "width": 414,
      "height": 264
    }, {
      "id": "",
      "dataset": {},
      "left": 11,
      "right": 55,
      "top": 269.5,
      "bottom": 313.5,
      "width": 44,
      "height": 44
    }, {
      "id": "",
      "dataset": {},
      "left": 66,
      "right": 100,
      "top": 280.5,
      "bottom": 302.5,
      "width": 34,
      "height": 22
    }, {
      "id": "",
      "dataset": {},
      "left": 111,
      "right": 136.125,
      "top": 279.5,
      "bottom": 303.5,
      "width": 25.125,
      "height": 24
    }, {
      "id": "",
      "dataset": {},
      "left": 11,
      "right": 403,
      "top": 335,
      "bottom": 382,
      "width": 392,
      "height": 47
    }, {
      "id": "",
      "dataset": {},
      "left": 11,
      "right": 403,
      "top": 408,
      "bottom": 474,
      "width": 392,
      "height": 66
    }],
    skeletonCircleLists: [],
  },

  created: function () {
    //默认的首屏宽高，防止内容闪现
    const that = this;
    const systemInfo = wx.getSystemInfoSync();
    (this.systemInfo = {
      width: systemInfo.windowWidth,
      height: systemInfo.windowHeight,
    }),
      (this.loading = this.loadingAni.includes(this.loading) ? this.loading : 'spin');
    //绘制背景
    wx.createSelectorQuery()
      .selectAll(`.${this.selector}`)
      .boundingClientRect()
      .exec(function (res) {
        console.log(res)
        if (res[0].length > 0) {
          that.systemInfo.height = res[0][0].height + res[0][0].top || 0;
        }
      });
    this.rectHandle()
    this.radiusHandle()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    rectHandle: function () {
      const that = this;
      console.log(wx.createSelectorQuery()
        .selectAll(`.${this.selector}-rect`), '????')
      //绘制不带样式的节点
      wx.createSelectorQuery()
        .selectAll(`.${this.selector}-rect`)
        .boundingClientRect()
        .exec(function (res) {
          that.setData({
            skeletonRectLists: res[0]
          })
        });
    },

    radiusHandle: function () {
      const that = this;
      wx.createSelectorQuery()
        .selectAll(`.${this.selector}-radius`)
        .boundingClientRect()
        .exec(function (res) {
          that.setData({
            skeletonCircleLists: res[0]
          })
        });
    },
  }
})