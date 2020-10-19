
/***************************悬浮框内的城市**************************************/
	let localCityVs=localStorage.getItem("city_name")
	let localCityId=localStorage.getItem("city_id")
	$(".headCityV").html(localCityVs)
/***************************轮播图**********************************************/
$.ajax({
	type:"post",    //请求方式
	url:myServer+jyj_indexSelectBanner,
	dataType:"json",
	data:{

	},    //请求参数		
	success: function(data) {
		if(data.status=='503'){
			window.location.href='error.html'
		}
		console.log("首页banner",data.data)
		let bannerList=data.data
		let bannerStr=""
		    for(let i=0;i<bannerList.length;i++){
		    	bannerStr+=`
		    		<div onclick="window.open('${bannerList[i].bannerLink}', '_blank')" class="swiper-slide" style=" background: url(${QiNiu}${bannerList[i].bannerUrl}); background-position:center center ; background-size:100% 100% ;"></div>
		    	`
		    }
		    $(".swiper-wrapper1").html(bannerStr)
		    swiperMove(bannerList)

	},
	error: function() {
		//请求出错处理
		}
	});

/***************************首页广告图**********************************************/
$.ajax({
	type:"post",    //请求方式
	url:myServer+jyj_indexSelectHomepageAds,
	dataType:"json",
	data:{

	},    //请求参数		
	success: function(data) {
		if(data.status=='503'){
			window.location.href='error.html'
		}
		console.log("首页广告图",data.data)
		let adList=data.data
			console.log('adList',adList)
			if(adList.length>0){
				$(".home-form-layout-center").html(`
		    	<img onclick="window.open('${adList[0].bannerLink}', '_blank')" src="${QiNiu}${adList[0].url}" style="width: 100%; height: 100%;"/>	
		    	`)
			}
		    
		    try{
		    	$(".home-form-layout-right").html(`
		    	<img onclick="window.open('${adList[1].bannerLink}', '_blank')" src="${QiNiu}${adList[1].url}" style="width: 100%; height: 100%;"/>	
		    `)
		    }catch(e){
		    	
		    }
		    
		    
		    
		

	},
	error: function() {
		//请求出错处理
		}
	});

	

/***************************价格列表**********************************************/
$.ajax({
	type:"post",    //请求方式
	url:myServer+jyj_indexSelectPriceRange,
	dataType:"json",
	data:{

	},    //请求参数		
	success: function(data) {
		if(data.status=='503'){
			window.location.href='error.html'
		}
		console.log("查询价格",data.data)

		let  priceStr=""
		data.data.map(function(value,key){
			
		    priceStr+=`<li>${value.dictionaryConent}</li>`

		    return priceStr
		})
		$(".home-selct-price").html(priceStr)
		//选择价格
		getSelect()

	},
	error: function() {
		//请求出错处理
		}
	});
	
/***************************查询热门酒店**********************************************/
$.ajax({
	type:"post",    //请求方式
	url:myServer+jyj_indexSelectHotHotels,
	dataType:"json",
	data:{
		cityId:localCityId
	},    //请求参数		
	success: function(data) {
		if(data.status=='503'){
			window.location.href='error.html'
		}
		console.log("查询热门酒店",data.data)
		
		let arr1=data.data.slice(0,3)
		let arr2=data.data.slice(3,7)
		console.log("arr1",arr1)
		let str=""
		arr1.map(function(value,key){
			
		    str+=`
		    	<li onclick="(window.location.href='hotelDetail.html?id=${value.id}')">
		 			<img src="${QiNiu+value.hotelsUrl}"/>
		 			<h4>${value.hotelsArea}</h4>
		 			<h5 style="opacity:0"><p>收到附件士大夫士大夫阿斯顿JFK士大夫阿斯顿撒旦发</p></h5>
		 			<p class="home-hotel-price">
		 				<span><span style="line-height:35px">￥</span><span class="price-home1" style="width:260px ;font-size:26px">${value.hotelsPrice}</span></span> 
		 				<span class="poins" style="width:100px;">${value.hotelsName}</span>
		 			</p>
		 			<h6>→</h6>
		 		</li>
		    `

		    return str
		})
		
		arr2.map(function(value,key){
			
		    str+=`
		    	<li onclick="(window.location.href='hotelDetail.html?id=${value.id}')">
		 			<img src="${QiNiu+value.hotelsUrl}"/>
		 			<div class="hot-second">
		 				<h1>${value.hotelsName} </h1>
		 				<h2>${value.hotelsArea}</h2>
		 				<h3><span>￥</span><span style="font-size:26px">${value.hotelsPrice}</span></h3>
		 			</div>
		 		</li>
		    `

		    return str
		})
		$(".home-hotel-list").html(str)
		//选择价格
		getSelect()

	},
	error: function() {
		//请求出错处理
		}
	});	
	
/***************************策划案例**********************************************/
var finished = true;

	$(document).scroll(function() {
		if(finished&&getScrollTop()>100){
			finished = false;
			showCehua()
		}
	
	});


function showCehua(){
	$.ajax({
	type:"post",    //请求方式
	url:myServer+jyj_indexSelectPlanCase,
	dataType:"json",
	data:{
		cityId:localCityId
	},    //请求参数		
	success: function(data) {
		if(data.status=='503'){
			window.location.href='error.html'
		}
		if(data.data.length==0){
			return
		}
		console.log("策划案例",data.data)
		let bannerList=data.data
		let bannerStr=""
		    for(let i=0;i<bannerList.length;i++){
		    	bannerStr+=`
				<div class="swiper-slide" onclick="(window.location.href='designCase.html?id=${bannerList[i].id}')">

			      	<img src="${QiNiu}${bannerList[i].caseUrl}"/>
			      	<div class="home-banner2">
			      		<div>
			      			<p>${bannerList[i].caseName}</p>
			      			<p><span></span><span>${bannerList[i].merchantName}</span></p>
			      		</div>
			      			
			      		<h6>→</h6>
			      	</div>
			      </div>
		    	`
		    }
		    $(".swiper-wrapper3").html(bannerStr)
		    swiperMove2(bannerList)

	},
	error: function() {
		//请求出错处理
		}
	});
	
}

	


	
/***************************热门酒店城市列表**********************************************/


	$.ajax({
	type:"post",    //请求方式
	url:myServer+jyj_indexSelectCity,
	dataType:"json",
	data:{

	},    //请求参数		
	success: function(data) {
		if(data.status=='503'){
			window.location.href='error.html'
		}
		if(data.data.length==0){
			return
		}
		console.log("查询所有城市",data.data)
		let cityList=data.data
		let hotCityList=[]
		let allcityStr=''
		for(let i=0;i<cityList.length;i++){
			for(let j=0;j<cityList[i].list.length;j++){
				hotCityList.push(cityList[i].list[j])
			}
			
		}
		
		for(let i=0;i<hotCityList.length;i++){
			allcityStr+=`
				<li>${hotCityList[i].cityName}</li>

				`
			
			
		}

		$(".home-selct-city").html(allcityStr)
		getSelect()
		console.log("00000000000000000000",allcityStr)
	},
	error: function() {
		//请求出错处理
		}
	});

/***************************酒店三步查提交**********************************************/
$(".home-form-submit").click(function(){
$(".dialog1").css({"display":"block"})

})

//三步查点击提交
$(".sub-comment").click(function(){

	if(checkPhone()){
		$(".ifPhone").css({"display":"none"})
//      $(".ifPhone").html("请输入真确的手机号码")
	}else{
		$(".ifPhone").css({"display":"block"})
        $(".ifPhone").html("请输入真确的手机号码")
        return
	}
	
	console.log("=========================",$(".home-selct-city-value").html(),$(".city-write-city input").val(),$(".home-selct-price-value").html(),$(".tel-phone").val())

	$.ajax({
	type:"post",    //请求方式
	url:myServer+jyj_indexInsertConsultationData,
	dataType:"json",
	data:{
		cityName:$(".home-selct-city-value").html(),
		regionName:$(".regionName").val(),
		priceRange:$(".home-selct-price-value").html(),
		phone:$(".tel-phone").val(),
	},    //请求参数		
	success: function(data) {
		if(data.status=='503'){
			window.location.href='error.html'
		}

		console.log("三步查提交",data)
		if(data.code==200){
			$(".dialog1").css({"display":"none"})
			$(".dialog2").css({"display":"block"})
			$(".sub-message").html("提交成功")
		}else{
			$(".dialog1").css({"display":"none"})
			$(".dialog2").css({"display":"block"})
			$(".sub-message").html("提交失败")
		}
			
	},
	error: function() {
		//请求出错处理
		}
	});
})
//验证手机号
function checkPhone(){ 
    var phone = $(".tel-phone").val()
    if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){ 

        return false; 
    }else{
    	return true
    }
}

//首页数据搜索
function goSearchP(){
	
		window.location.href=encodeURI('searchHotel.html?id='+$(".serachVP").val());
	
}
