import {request} from "@/http/request.js"

export const login = (data)=>{
	return request({
		url:'/login',
		method:'post',
		data
	})
}
export const getCaptcha = ()=>{
	return request({
		url:'/getCaptcha',
		method:'get',
		responseType:'arraybuffer'
	})
}