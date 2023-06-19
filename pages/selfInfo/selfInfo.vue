<template>
	<view>
		<uni-nav-bar @clickLeft="navigateBack" left-icon="left" background-color="#579af8" color="#fff" :border="false" title="个人信息" />
		<u-cell-group>
			<u-cell title="头像" :isLink="true" @click="uploadAvatar">
				<view slot="value" @click.stop="previewImage">
					<crop-avatar
					  selWidth="600upx" @upload="myUpload" selHeight="600upx" :avatarSrc="selfInfo.avatarSrc"
					  ref="avatar" avatarStyle="width: 80upx; height: 80upx; border-radius:5px" inner>
					</crop-avatar>
				</view>
			</u-cell>
			<u-cell title="名字" :isLink="true" :value="selfInfo.usernick" :url="`/pages/selfInfo/usernick/usernick?id=${selfInfo.id}&usernick=${selfInfo.usernick}`"></u-cell>
			<u-cell title="账号" :isLink="true" :value="selfInfo.username" :url="`/pages/selfInfo/username/username?id=${selfInfo.id}&username=${selfInfo.username}`"></u-cell>
			<u-cell title="性别" :isLink="true" :value="selfInfo.sex" :url="`/pages/selfInfo/sex/sex?id=${selfInfo.id}&sex=${originData.sex}`"></u-cell>
			<u-cell title="手机号" :isLink="true" :value="selfInfo.phone" :url="`/pages/selfInfo/phone/phone?id=${selfInfo.id}&phone=${selfInfo.phone}`"></u-cell>
			<u-cell title="生日" :isLink="true" :value="selfInfo.birthday" @click="showPicker"></u-cell>
			<u-cell title="地区" >
				<view slot="value">
					<uni-data-picker :border="false" :clear-icon="false" :localdata="localData" popup-title="请选择省市区" @change="changeAddress" v-model="selfInfo.address"></uni-data-picker>
				</view>
			</u-cell>
		</u-cell-group>
		<!-- 后台返回数据回显时需要加v-if 但是加上的话this.$refs.datePicker就获取不到了 formatter就不能兼容小程序了-->
		<u-datetime-picker v-if="originData.birthday" ref="datePicker" closeOnClickOverlay :formatter="formatter" v-model="originData.birthday"  :show="showDatePicker" :minDate="minDate" :maxDate="maxDate"
		  itemHeight="50" mode="date" @close="closePicker" @cancel="cancel" @confirm="changeBirthday">
		</u-datetime-picker>
		
	</view>
	
</template> 

<script>
	import baseUrl from "@/config.js"
	import cropAvatar from "@/components/yq-avatar/yq-avatar.vue"
	import { currentUser,updateUserInfo } from "@/api/user/user.js"
	export default {
		data() {
			return {
				selfInfo:{
					id:'',
					avatar:'',
					username:'',
					usernick:'',
					password:'',
					sex:'',
					birthday:'',
					address:'',
					avatarSrc:''
				},
				minDate:null,
				maxDate:Number(new Date()),
				//展示日期选择器
				showDatePicker:false,
				formatter(type, value) {
					if (type === 'year') {
						return `${value}年`
					}
					if (type === 'month') {
						return `${value}月`
					}
					if (type === 'day') {
						return `${value}日`
					}
					return value
				},
				originData:{},
				// 省市区
				localData: []
			};
		},
		onReady(){
			this.getCurrentUser()
			// 兼容微信小程序需要用此写法 这里是使用会报错 因为后台回显数据时v-if 无法获取到datePicker uview的bug
			// this.$refs.datePicker.setFormatter(this.formatter)
		},
	  components:{
			cropAvatar
		},
		mounted() {
			this.sexMinDate()
			// 省市区数据树生成
			this.localData = uni.getStorageSync("localData")
		},
		methods:{
			navigateBack(){
				uni.navigateBack()
			},
			//预览图片
			previewImage(){
				uni.previewImage({
					urls:[this.selfInfo.avatarSrc]
				})
			},
			getCurrentUser(){
				currentUser().then(res=>{
					if(res.code=='200'){
						//深拷贝数据
						this.originData = Object.assign({},res.data)
						let message = res.data
						message.sex=='0' ? message.sex='男' : message.sex='女';
						this.originData.birthday = this.originData.birthday ? Number(new Date(message.birthday)): Number(new Date());
						this.selfInfo = message;
					}
				}).catch(err=>{
					console.log(err)
				}) 
			},
			//设置最小日期为当前日期的前一百年 1月1日
			sexMinDate(){
				let date = new Date()
				date.setFullYear(new Date().getFullYear() - 100,0,1)
				this.minDate = Number(date)
			},
			showPicker(){
				this.showDatePicker = true
			},
			closePicker(){
				this.showDatePicker = false
			},
			cancel(){
				this.showDatePicker = false
			},
			changeBirthday(e){
				this.selfInfo.birthday = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				updateUserInfo({id:this.selfInfo.id,birthday:this.selfInfo.birthday}).then(res=>{
					if(res.code=="200"){
						this.getCurrentUser()
						this.showDatePicker = false
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			changeAddress(e) {
				const value = e.detail.value
				console.log(this.selfInfo.address)
				updateUserInfo({id:this.selfInfo.id,address:this.selfInfo.address}).then(res=>{
					if(res.code=="200"){
						this.getCurrentUser()
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			myUpload(rsp) {
				//裁剪完图片之后 点击上传的回调
				//将本地资源上传到开发者服务器，客户端发起一个 POST 请求，其中 content-type 为 multipart/form-data
				uni.uploadFile({
					url: baseUrl+"/sys/user/uploadAvatar", 
					filePath: rsp.path,
					//multipart 提交时，表单的项目名，默认为 file
					name: 'avatar',
					header:{
						'Authorization':'Bearer ' + uni.getStorageSync('token')
					},
					formData: {
						'id': this.selfInfo.id
					},
					success: (res) => {
						if(res.statusCode=="200"){
							this.getCurrentUser()
						}
					},
					fail:(err)=>{
						uni.$u.toast("上传失败！")
					}
				});
			},
			uploadAvatar(){
				this.$refs.avatar.fChooseImg();
			}
			
		}
	}
</script>

<style lang="scss" scoped>
 ::v-deep .input-value{
	 height: 24px;
}
 ::v-deep .uni-nav-bar-text{
	 font-size:16px;
 }
</style>
