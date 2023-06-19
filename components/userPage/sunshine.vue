<template>
	<view>
		<view class="container">
			<view class="front">
				<Cloud ></Cloud>
			</view>
			<text class="sun sunshine"></text>
			<text class="sun"></text>
			<view class="back">
				<Cloud ></Cloud>
			</view>
		</view>
	</view>
</template>

<script>
import Cloud from "@/components/userPage/cloud.vue"
export default {
	data() {
		return {};
	},
	components:{
		Cloud
	}
};
</script>

<style lang="scss" soped>
.container {
	width: 500rpx;
	height: 500rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.front {
	padding-top: 90rpx;
	margin-left: -300rpx;
	display: inline;
	position: absolute;
	z-index: 11;
	animation: clouds 8s infinite;
	animation-timing-function: ease-in-out;
}

.back {
	margin-top: -200rpx;
	margin-left: -100rpx;
	z-index: 12;
	animation: clouds 12s infinite;
	animation-timing-function: ease-in-out;
}
.sun {
	width: 200rpx;
	height: 200rpx;
	background: -webkit-linear-gradient(to right, #fcbb04, #fffc00);
	background: linear-gradient(to right, #fcbb04, #fffc00);
	opacity: .8;
	border-radius: 120rpx;
	display: inline;
	position: absolute;
}
@keyframes clouds {
	0% {
		transform: translateX(40rpx);
	}

	50% {
		transform: translateX(0rpx);
	}

	100% {
		transform: translateX(40rpx);
	}
}
</style>
