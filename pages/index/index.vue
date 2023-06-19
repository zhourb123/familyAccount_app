<template>
	<view class="container">
		<uni-title type="h1" align="center" title="家庭记账管理App" class="app_title" color="rgba(255,255,255,.8)"></uni-title>
		<u-form ref="loginForm" :model="userInfo" :rules="rules" class="loginForm">
			<u-form-item prop="username">
				<u-input
					v-model.trim="userInfo.username"
					placeholder="用户名"
					customStyle="{width:250px !important;}"
					color="#fff"
					clearable
					border="bottom"
					prefixIcon="account"
					:prefixIconStyle="prefixIconStyle"
				></u-input>
			</u-form-item>
			<u-form-item prop="password">
				<u-input
					v-model.trim="userInfo.password"
					type="password"
					color="#fff"
					placeholder="密码"
					border="bottom"
					clearable
					prefixIcon="lock"
					:prefixIconStyle="prefixIconStyle"
				></u-input>
			</u-form-item>
			<u-form-item prop="code">
				<u-input
					v-model.trim="userInfo.code"
					color="#fff"
					placeholder="验证码"
					border="bottom"
					clearable
					prefixIcon="checkmark-circle"
					:prefixIconStyle="prefixIconStyle">
					<template slot="suffix">
						<image :src="codeImage" style="width:60px;height:25px;cursor:pointer" @click="getPicCode"></image>
					</template>
				</u-input>
			</u-form-item>
		</u-form>
		<u-button type="primary" text="登录" shape="circle" class="loginBtn" @click="submit"></u-button>
		<u-loading-page
			bg-color="rgba(0,0,0,.5)"
			loading-text="loading..."
			:loading="loading"
			loading-mode="spinner"
			loading-color="rgba(122, 201, 242,.8)"
			color="rgba(122, 201, 242,.8)"
		></u-loading-page>
	</view>
</template>

<script>
import { login, getCaptcha } from '@/api/login/login.js';
const cityRows = require('@/utils/data.json')
export default {
	data() {
		return {
			loading: false,
			codeImage:'',
			userInfo: {
				username: '',
				password: '',
				code:''
			},
			prefixIconStyle: 'font-size: 22px;color: #fff;margin-right:20px',
			rules: {
				username: {
					type: 'string',
					required: true,
					message: '请输入姓名',
					trigger: ['blur', 'change']
				},
				password: {
					type: 'string',
					required: true,
					message: '请输入密码',
					trigger: ['blur', 'change']
				},
				code: {
					type: 'string',
					required: true,
					message: '请输入验证码',
					trigger: ['blur', 'change']
				}
			}
		};
	},
	methods: {
		submit() {
			this.$refs.loginForm.validate().then(()=> {
				login(this.userInfo).then(res=>{
					if(res.code=='200'){
						uni.$u.toast('登录成功！');
						uni.setStorageSync('token', res.data.token);
						console.log("token"+res.data.token)
						this.loading = true;
						setTimeout(() => {
							this.loading = false;
							uni.switchTab({ url: '/pages/detail/detail' });
						}, 2000);
					}else{
						this.getPicCode()
					}
				}).catch(err=>{
					console.log(err)
				})
			}).catch(err => {console.log(err)});
		},
		//获取图形验证码
		getPicCode() {
			getCaptcha()
				.then(res => {
					if (res) {
						// uni.$u.toast('验证码获取成功！');
						//h5端 浏览器端 获取图形验证码的方式
						// let binaryData = [];
						// binaryData.push(res);
						// this.codeImage = window.URL.createObjectURL(new Blob(binaryData))
						
						//将 ArrayBuffer 对象转成 Base64 字符串（app,小程序获取图形验证码的方式）
						const arrayBuffer = new Uint8Array(res);
						this.codeImage = "data:image/png;base64,"+uni.arrayBufferToBase64(arrayBuffer)  
				
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		// 省市区数据树生成
		get_city_tree () {
			let res = []
			if (cityRows.length) {
				// 递归生成
				res = this.handleTree(cityRows)
			}
			return res
		},
		handleTree (data, parent_code = null) {
		    let res = []
		    let keys = {
		        id: 'code',
		        pid: 'parent_code',
		        children: 'children',
		        
		        text: 'name',
		        value: 'code'
		    }
		    let oneItemDEMO = {
		        text: '',
		        value: '',
		        children: []
		    }
		    let oneItem = {}
		    // 循环
		    for (let index in data) {
		        // 判断
		        if (parent_code === null) {
		            // 顶级菜单 - 省
		            if (!data[index].hasOwnProperty( keys.pid ) || data[index][keys.pid] == parent_code) {
		                // 不存在parent_code，或者已匹配
		                oneItem = JSON.parse(JSON.stringify(oneItemDEMO))
		                oneItem.text = data[index][keys.text]
		                oneItem.value = data[index][keys.value]
		                // 递归下去
		                oneItem.children = this.handleTree(data, data[index][keys.id])
		                res.push(oneItem)
		            } 
		            
		        } else {
		            // 非顶级菜单 - 市、区、街道
		            if (data[index].hasOwnProperty( keys.pid ) && data[index][keys.pid] == parent_code) {
		                // 已匹配
		                oneItem = JSON.parse(JSON.stringify(oneItemDEMO))
		                oneItem.text = data[index][keys.text]
		                oneItem.value = data[index][keys.value]
		                // 递归下去
		                oneItem.children = this.handleTree(data, data[index][keys.id])
		                res.push(oneItem)
		            }
		        }
		    }
		    return res
		}
	},
	mounted() {
		this.getPicCode();
		const localData = this.get_city_tree()
		uni.setStorageSync("localData",localData)  
	}
};
</script>

<style lang="scss" scoped>
.container {
	height: 100vh;
	background: url('~@/static/login.jpeg') no-repeat;
	background-size: 100% 100%;
	overflow-y: hidden;
	font-size: 28rpx;
	.loginForm {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.loginBtn {
		width: 520rpx;
		margin-top: 40rpx;
		
	}
	.app_title {
		margin-top: 300rpx;
	}
}
.uni-input-placeholder {
	color: #fff !important;
}
.u-form-item {
	width: 600rpx !important;
}
.u-input {
	border-color: #fff !important;
}
</style>
