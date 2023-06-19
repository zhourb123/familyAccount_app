<template>
	<view>
		<u-navbar title="设置性别" border autoBack>
			<!-- block相当于template标签 -->
			<block slot="right">
				<button :class="['saveBtn','active']" size="mini" @click="saveInfo">完成</button>
			</block>
		</u-navbar> 
		<view class="inputBox">
			<u-radio-group v-model="sex" iconPlacement="right" placement="column" borderBottom>
				<u-radio :customStyle="{marginBottom: '16px'}" name="0"  label="男"></u-radio>
				<u-radio :customStyle="{marginBottom: '16px'}" name="1"  label="女"></u-radio>
			</u-radio-group>
		</view>
	</view>
</template>

<script>
	import { updateUserInfo } from "@/api/user/user.js"
	export default {
		data() {
			return {
				id:'',
				sex:'',
			}
		},
		methods: {
			//保存信息
			saveInfo(){
				updateUserInfo({id:this.id,sex:this.sex}).then(res=>{
					if(res.code=="200"){
						uni.navigateTo({
							url: "/pages/selfInfo/selfInfo"
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		},
		onLoad(params){
			this.sex = params.sex
			this.id = params.id
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
</style>


