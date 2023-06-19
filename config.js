let baseUrl = ''
if(process.env.NODE_ENV=="development"){
	baseUrl = 'http://localhost:8090'
}else{
	baseUrl = '/prod'
}
export default baseUrl;