<template>
	<view>
		<view :class="['avatarBg',{'dark':toggle}]"  :style="{height:pageHeight+'px'}">
			<Cloud class="cloud" v-if="!toggle"></Cloud>
			<Sunshine class="sunshine" v-if="!toggle"></Sunshine>
			<Dark v-if="toggle"></Dark>
			<view class="userInfo" @click="showDetail">
				<u-avatar shape="square" size="60" :src="userInfo.avatarSrc" fontSize="18" class="avatar"></u-avatar>
				<text class="username">{{userInfo.usernick}}</text>
				<u-icon name="arrow-right" color="#fff" size="18" class="arrow"></u-icon>
			</view> 
			<view class="overview">
				<view class="account">
					<u-count-to :startVal="0" :endVal="25" bold color="#fff" fontSize="22" separator=","></u-count-to>
					<text class="desc">记账天数</text>
				</view>
				<view class="account">
					<u-count-to :startVal="0" :endVal="26351" bold color="#fff" fontSize="22" separator=","></u-count-to>
					<text class="desc">记账总金额</text>
				</view>
				<view class="account">
					<u-count-to :startVal="0" :endVal="321" bold color="#fff" fontSize="22" separator=","></u-count-to>
					<text class="desc">记账总共笔</text>
				</view>
			</view>
			<view class="function">
				<view class="function-item">
					<view class="list-item">
						<image class="icon" src="~@/static/account.png"></image>
						<text class="message">账本管理</text>
						<u-icon name="arrow-right" color="#666" size="12" class="right-arrow"></u-icon>
					</view>
				</view>
				<view class="function-item">
					<view class="list-item">
						<image class="icon" src="~@/static/share.png"></image>
						<text class="message">分享</text>
						<u-icon name="arrow-right" color="#666" size="12" class="right-arrow"></u-icon>
					</view>
				</view>
				<view class="function-item" >
					<view class="list-item">
						<image class="icon" src="~@/static/transform.png"></image>
						<text class="message">切换模式</text>
						<view class="switch-btn" @click="toggleFormat">
							<switch-button :toggle="toggle" ></switch-button>
						</view>
					</view>
				</view>
				<view class="function-item" @click="logout">
					<view class="list-item">
						<image class="icon" src="~@/static/setting.png"></image>
						<text class="message">退出</text>
						<u-icon name="arrow-right" color="#666" size="12" class="right-arrow"></u-icon>
					</view>
				</view>
			</view>
			<!-- 退出模态框 -->
			<view >
				<u-modal :show="isExit" content='您确定退出吗？' showCancelButton @cancel="isExit=false" @confirm="confirmExit"></u-modal>
			</view>
		</view>
	</view>
</template>

<script >
	import Sunshine from "@/components/userPage/sunshine.vue"
	import Cloud from "@/components/userPage/cloud.vue"
	import SwitchButton from "@/components/userPage/switchButton.vue"
	import Dark from "@/components/userPage/dark.vue"
	import { currentUser } from "@/api/user/user.js"
	export default {
		data() {
			return {
				userInfo:{
					 avatarSrc:'',
					 usernick:''
				},
				isExit:false,
				pageHeight:0,
				//用于切换模式
				toggle:false
			}
		},
		methods: {
			toggleFormat(){
				this.toggle = !this.toggle
			},
			getCurrentUser(){
				currentUser().then(res=>{
					if(res.code=='200'){
						//得这样写 不然监听不到值的变化 之前指的对象相同
						this.userInfo = Object.assign({},res.data);
					}
				}).catch(err=>{
					console.log(err)
				}) 
			},
			showDetail(){
				uni.navigateTo({
					url:`/pages/selfInfo/selfInfo`,
				})
			},
			showTest(){
				console.log(11111)
			},
			//退出登录
			logout(){
				this.isExit = true;
			},
			//确定退出
			confirmExit(){
				this.isExit = false;
				uni.setStorageSync("token",'');
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}
		},
		components:{
			Sunshine,
			Cloud,
			SwitchButton,
			Dark
		},
		onShow(){
			this.getCurrentUser();
		},
		mounted(){
			//获取除去tabbar的高度
			this.pageHeight = uni.getSystemInfoSync().windowHeight;
		}
	}
</script>

<style lang="scss" scoped>
	.dark{
		background: #000 !important;
	}
  .avatarBg{
		position: relative;
		width: 100%;
		height: calc(100vh - 50px);
		overflow-y: hidden;
		background: lightskyblue;
		.sunshine{
			position: absolute;
			transform: scale(0.8);
			top:-120rpx;
			right:-40rpx;
		}
		.cloud{
			animation: clouds 12s infinite;
			animation-timing-function: ease-in-out;
		}
		.userInfo{
			position: absolute;
			top:240rpx;
			left:80rpx;
			display: flex;
			align-items: center;
			.username{
				margin-left:40rpx;
			  font-weight:700;
				font-size:40rpx;
				color:#fff;
			}
			.arrow{
				position: absolute;
				left:600rpx;
			}
		}
		.overview{
			position: absolute;
			top:360rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 100%;
			height: 200rpx;
			.account{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color:#fff;
				.desc{
					margin-top: 10rpx;
				}
			}
		}
		.function{
			position: absolute;
			display: flex;
			flex-direction: column;
			justify-content: center;
      align-items: center;
			opacity: 0.9;
			top:540rpx;
			width: calc(100% - 80rpx);
			margin:40rpx;
			.function-item{
				background-color: #fff;
				padding:0 10px;
				width: calc(100% - 40rpx);
				.list-item{
					display: flex;
					align-items: center;
					justify-content: flex-start;
					border-bottom:2rpx solid #eee;
					height:80rpx;
					.icon{
						width:36rpx;
						height: 36rpx;
						margin-right:20rpx;
					}
					.right-arrow,.switch-btn{
						position: absolute;
						right:20rpx;
					}
					.switch-btn{
						line-height: 100%;
						transform: scale(0.8);
					}
				}	
				&:first-of-type{
					border-top-left-radius: 10px;
					border-top-right-radius: 10px;
				}
				&:last-of-type{
					border-bottom-left-radius: 10px;
					border-bottom-right-radius: 10px;
					.list-item{
						border:none;
					}
				}
			}
		}
		
	}
	@keyframes clouds {
		0% {
			transform: scale(0.5) translateX(150rpx);
		}
	
		50% {
			transform: scale(0.5) translateX(0px);
		}
	
		100% {
			transform: scale(0.5) translateX(150rpx);
		}
	}
</style>
