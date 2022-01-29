import request from "../../Utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[],
    navId:'',
    videoList:[]
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
      navId:navId>>>0
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