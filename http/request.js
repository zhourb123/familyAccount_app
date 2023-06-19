import baseUrl from "@/config.js"

export const request = (params)=>{
	let header = {
		'Content-Type': 'application/json;charset=utf-8'
	}
	params.header ? header = params.header : null;
	let token = uni.getStorageSync('token');
	token ? header['Authorization'] = 'Bearer ' + token : null;
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + params.url,
			//method有效值必须大写
			method: (params.method).toUpperCase(),
			data: params.data || {},
			responseType: params.responseType || null,
			header,
			timeout:6000,
			success:(res)=>{
				if(res.data && res.data.code){
			     if(res.data.code!='200'){
						 //处理出错的请求
						 uni.$u.toast(res.data.message)
						 resolve(res.data)
						 //token过期或未授权
						 if (res.data.code == 401) {
						 	 uni.setStorageSync('token', "");
						 	 uni.reLaunch({
						 		url: '/pages/index/index'
						 	})
						 }
					 }else{
						 resolve(res.data)
					 }
				}else{
					//处理图形验证码
					resolve(res.data)
				}
			},
			fail:(err)=>{
				uni.$u.toast(err.errMsg)
				reject(err.errMsg)
			}
		})
	})
}