<template>
	<view>
		<view class="wrap">
		  <view class="moon"></view>
			<view class="star star1"></view>
			<view class="star star2"></view>
			<view class="star star3"></view>
			<view class="star star4"></view>
			<view class="star star5"></view>
			<view class="star star6"></view>
			<view class="star star7"></view>
			<view class="meteor"></view>
			<view class="meteor meteor1"></view>
			<view class="meteor meteor2"></view>
			<view class="meteor meteor3"></view>
			<view class="meteor meteor4"></view>
			<view class="meteor meteor5"></view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
  .wrap {
    // background: #000000;
    width: 100vw;
    height: 100vh;
    position: relative;
  }
  .moon {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-image: linear-gradient(40deg, #f9fabe, #fffd3b);
    position: absolute;
    top: 6%;
    right: 20%;
    box-shadow: 0 0 30px 0px #fffd3b, 0 0 80px 0 #ffffff;
		animation: moonflashing 3s infinite;
  }
	.star {
	  width: 2px;
	  height: 2px;
	  border-radius: 50%;
	  background: #ffffff;
	  position: absolute;
	  animation: starflashing 2s infinite;
	}
	.star1 {
	  top: 50%;
	  right: 20%;
	}
	.star2 {
	  top: 70%;
	  right: 30%;
	}
	.star3 {
	  top: 40%;
	  left: 20%;
	}
	.star4 {
	  top: 60%;
	  right: 10%;
	}
	.star5 {
	  top: 55%;
	  right: 44%;
	}
	.star6 {
	  top: 10%;
	  left: 30%;
	}
	.star7 {
	  top: 15%;
	  left: 20%;
	}
	.meteor {
	  position: absolute;
	  width: 4px;
	  height: 4px;
	  top: 30%;
	  left: 30%;
	  background: #ffffff;
	  border-radius: 50%;
	  box-shadow: 0 0 5px 5px #636262;
	  animation: meteorflashing 3s infinite linear ;
	}
	.meteor:after {
	  content: "";
	  display: block;
	  border: 0px solid #fff;
	  border-width: 2px 100px;
	  border-color: transparent transparent transparent rgba(255, 255, 255, 0.3);
		transform: rotate(-45deg) translate3d(1px, 1px, 0);
		transform-origin: 0% 0%;
	}
	.meteor1 {
    top: 2vh;
    left: 30vw;
    animation: meteorflashing 2s infinite linear ;
  }
  .meteor2 {
    top: 22vh;
    left: 80vw;
    background: rgb(234, 0, 255);
    animation: meteorflashing 2s infinite linear ;
  }
  .meteor3 {
    top: 30vh;
    left: 40vw;
    animation: meteorflashing 3s infinite linear ;
  }
  .meteor4 {
    top: 10vh;
    left: 50vw;
    animation: meteorflashing 3s infinite linear ;
  }
  .meteor5 {
    top: 50vh;
    right: 2vw;
    animation: meteorflashing 3s infinite linear ;
  }
  @keyframes moonflashing {
    0% {
      filter: brightness(0.8);
    }
    50% {
      filter: brightness(1.3);
    }
    100% {
      filter: brightness(0.8);
    }
  }
	@keyframes starflashing {
    0% {
      filter: brightness(0.3);
    }
    50% {
      filter: brightness(1);
    }
    100% {
      filter: brightness(0.3);
    }
  }
	@keyframes meteorflashing {
    0% {
      opacity: 0;
      transform: scale(0) translate3d(0, 0, 0);
    }
    50% {
      opacity: 1;
      transform: scale(1) translate3d(-200px, 200px, 0);
    }
    100% {
      opacity: 0;
      transform: scale(1) translate3d(-500px, 500px, 0);
    }
  }

</style>
