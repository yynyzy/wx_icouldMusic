import request from "../../Utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[],
    navId:'',
    videoList:[],
    videoId:"",
    videoUpdateTime:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoGroupListData()
  },
  async getVideoGroupListData(){
    let videoGroupListData = await request('/video/group/list')
    this.setData({
      videoGroupList:videoGroupListData.data.slice(0,14),
      navId:videoGroupListData.data[0].id
    })
    this.getVideoList(this.data.navId)
  },

  async getVideoList(navId){
    if (!navId){
      return 
    }
    let videoListData = await request('/video/group',{id:navId})
    wx.hideLoading()
    let index=0
    let videoList =  videoListData.datas.map(item=>{
      item.id = index++ 
      return item
    } )
    this.setData({
      videoList
    })
  },

  changeNav(event){
    let navId = event.currentTarget.id
    this.setData({
      navId:navId>>>0,
      videoList:[]
    })
    wx.showLoading({
      title: '正在加载',
    })
    this.getVideoList(this.data.navId)
  },

  handlePlay(event){
    let vid =event.currentTarget.id
    // this.vid!==vid && this.videoContext && this.videoContext.stop()
    // this.vid = vid 
    this.setData({videoId:vid})
    this.videoContext = wx.createVideoContext(vid)
    this.videoContext.play()
  },
  handleTimeUpdate(){
    let videoTimeObj={vid:event.currentTarget.id,currentTime:event.detail.currentTime}
    let {videoUpdateTime}=this.data
    let videoItem = videoUpdateTime.find(item=>item.vid===videoTimeObj.vid)
    if (videoItem){
      videoUpdateTime.currentTime=event.detail.currentTime
    }else{
      videoUpdateTime.push(videoTimeObj)
    }
    this.setData({
      videoUpdateTime
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})