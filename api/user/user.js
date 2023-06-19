import {request} from "@/http/request.js"
 
 //获取当前登录的用户
export const currentUser = ()=>{
	return request({
		url:'/sys/user/currentUser',
		method:'get',
	})
}
//修改当前用户信息
export const updateUserInfo = (data)=>{
	return request({
		url:'/sys/user/edit',
		method:'put',
		data
	})
}
