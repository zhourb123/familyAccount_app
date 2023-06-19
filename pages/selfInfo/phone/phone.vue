<template>
	<view>
		<u-navbar title="设置手机号" border autoBack>
			<!-- block相当于template标签 -->
			<block slot="right">
				<button :class="['saveBtn',{'active':!disabled}]" size="mini" :disabled="disabled" @click="saveInfo(params)">保存</button>
			</block>
		</u-navbar> 
		<view class="inputBox">
			<u-form ref="uForm" :model="userInfo" :rules="rules">
				<u-form-item prop="phone">
					<u-input placeholder="请输入手机号" border="bottom" v-model.trim="userInfo.phone" @change="changeName" :class="{'input-active':focused}" @focus="focus" @blur="blur"></u-input>
				</u-form-item>
			</u-form>
		</view>
		<u-toast ref="uToast"></u-toast>
		
	</view>
</template>

<script>
	import { updateUserInfo } from "@/api/user/user.js"
	export default {
		data() {
			return {
				userInfo:{
					id:'',
					phone:'',
				},
				disabled:true, //未修改状态按钮禁用
				focused:false,//输入框是否聚焦
				//展示toast提示框需要传递的参数
				params:{
					type: 'loading',
					message: "正在保存",
					duration:1000,
					url:"/pages/selfInfo/selfInfo"
				},
				rules: {
					phone: [
						{
							type: 'string',
							required: true,
							message: '请输入手机号',
							trigger: ['blur', 'change']
						},
						{
							pattern: /^1[3-9]\d{9}$/,
							message: '手机号格式不正确',
							trigger: ['blur', 'change']
						},
					]
				}
			}
		},
		methods: {
			changeName(){
				this.disabled = false
			},
			focus(){
				this.focused = true
			},
			blur(){
				this.focused = false
			},
			//保存信息
			saveInfo(params){
				const that = this;
				this.$refs.uForm.validate().then(()=>{
					this.$refs.uToast.show({
						...params,
						complete() {
							updateUserInfo(that.userInfo).then(res=>{
								if(res.code=="200"){
									params.url && uni.navigateTo({
										url: params.url
									})
								}
							}).catch(err=>{
								console.log(err)
							})
						}
					})
				}).catch(err=>console.log(err))
				
			}
		},
		onLoad(params){
			this.userInfo.phone = params.phone
			this.userInfo.id = params.id
		}
	}
</script>

<style lang="scss" scoped>
	.saveBtn{
		border:none;
		&::after{
		 border:none;
	  }
	}
	.active{
		background-color: limegreen;
		color:#fff;
	}
	.inputBox{
		margin-top:120rpx;
		margin-bottom: 20rpx;
		padding:0 20rpx;
  }
	.input-active{
		border-bottom:1px solid greenyellow !important;
	}
</style>

