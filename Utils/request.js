//处理ajax请求
import config from "./config.js"

export default (url,data={},method="GET")=>{
 return new Promise((resolve,reject)=>{
   wx.request({
     url:config.HOST+url,
     data,
     method,
     success: (res) => {
       resolve(res.data)
     },
     fail: (err) => {
       reject(err)
     }
   })
 })
}