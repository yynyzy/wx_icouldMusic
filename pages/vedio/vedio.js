import request from "../../Utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[],
    navId:'',
    videoList:[],
    videoId:'',
    videoUpdateTime:[],
    isTriggered:false
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
      videoList,
      isTriggered:false
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
    this.setData({
      videoId:vid
      })
    this.videoContext = wx.createVideoContext(vid)
    let { videoUpdateTime } = this.data
    let videoItem = videoUpdateTime.find(item => item.vid === vid)
    if (videoItem) {
      this.videoContext.seek(videoItem.currentTime)
    }
    this.videoContext.play()
  },
  handleTimeUpdate(event){
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
  handleEnded(event){
    let {videoUpdateTime}=this.data
    videoUpdateTime.splice(videoUpdateTime.findIndex(item=>item.vid === event.currentTarget.id),1)
    this.setData({
      videoUpdateTime
    })
  },
  handleRefresh(){
    this.getVideoList(this.data.navId)
  },
  handleToLower(){

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
  onShareAppMessage: function ({from}) {
    if(from === 'button'){
      return {
        title:'来自以诺的分享~',
        page:'/page/vedio/vedio',
        imgeUrl:'/static/images/nvsheng.jpg'
      }
    }else{
      return {
        title: '来自致远的分享~',
        page: '/page/vedio/vedio',
        imgeUrl: '/static/images/nvsheng.jpg'
      }
    }
  }
})