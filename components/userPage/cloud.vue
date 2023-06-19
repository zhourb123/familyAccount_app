<template>
	<view class="cloud">
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.cloud{
		 position: absolute;
		 background: white;
		 border-radius: 50%;
		 box-shadow: white 130rpx -30rpx 0 -8rpx,   /*阴影1*/
		             white 50rpx -50rpx,          /*阴影2*/
		             white 60rpx 20rpx,           /*阴影3*/
		             white 120rpx 30rpx 0 -20rpx,   /*阴影4*/
		             white 170rpx 10rpx 0 -10rpx;     /*阴影5*/
		 height: 100rpx;
		 width: 100rpx;
		 top:60rpx;
		 left:60rpx;
		 transform: scale(.5);
		
	}
</style>