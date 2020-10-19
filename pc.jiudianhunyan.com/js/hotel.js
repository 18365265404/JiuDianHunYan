/*********************************热门酒店******************************************/

/***************************城市列表**********************************************/


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
		getSelect2()
		console.log("00000000000000000000",allcityStr)
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
		getSelect2()

	},
	error: function() {
		//请求出错处理
		}
	});

/**********酒店类型**************/
selectListHotel("")
function selectListHotel(hotelsType){
	console.log("查询所有城市酒店参数",localStorage.getItem("city_id"),hotelsType)
	$.ajax({
	type:"post",    //请求方式
	url:myServer+jyj_detailsSelectAllHotels,
	dataType:"json",
	data:{
		cityId:localStorage.getItem("city_id"),
		hotelsType:hotelsType,
		pageNum:"1",
		likeName:""
	},    //请求参数		
	success: function(data) {
		if(data.status=='503'){
			window.location.href='error.html'
		}
		console.log("查询所有酒店111111",data.data)

		let JDSJList=data.data.JDSJ.list
		if(JDSJList.length>=8){
			JDSJList=JDSJList.slice(0,8)
		}

		
		let JDSJStr=""
		try{
			for(let i=0;i<JDSJList.length;i++){
		    	JDSJStr+=`
		    		<li onclick="(window.location.href='hotelDetail.html?id=${JDSJList[i].id}')">
						<img src="${QiNiu}${JDSJList[i].hotelsUrl}"/>
						<h1 style="width:195px" class="poins">${JDSJList[i].hotelsName}</h1>
						<h2>${JDSJList[i].hotelsType}</h2>
						<div class="hotel-kind-price">
							<h3 style="width:60px" class="poins">${JDSJList[i].hotelsAddress}</h3>
							<h4> 
								<span>￥</span>
								<span>${JDSJList[i].hotelsPrice}</span>
								<span>/桌</span>
							</h4>
						</div>
					</li>
		    	`
		    }
		}catch(e){
			
		}
		    
		$(".hotel-kind-content1").html(JDSJStr)

		
		


	},
	error: function() {
		//请求出错处理
		}
	});	
	
}

	
/**********酒店类型**************/
	$.ajax({
	type:"post",    //请求方式
	url:myServer+jyj_detailsSelectAllHotels,
	dataType:"json",
	data:{
		cityId:localStorage.getItem("city_id"),
		hotelsType:""
	},    //请求参数		
	success: function(data) {
		if(data.status=='503'){
			window.location.href='error.html'
		}
		console.log("查询所有酒店",data.data)

		let JDSJList=data.data.JDSJ.list
		
		if(JDSJList.length>=8){
			JDSJList=JDSJList.slice(0,8)
		}

		
		let JDSJStr=""
		    for(let i=0;i<JDSJList.length;i++){
		    	JDSJStr+=`
		    		<li onclick="(window.location.href='hotelDetail.html?id=${JDSJList[i].id}')">
						<img src="${QiNiu}${JDSJList[i].hotelsUrl}"/>
						<h1 style="width:195px" class="poins">${JDSJList[i].hotelsName}</h1>
						<h2>${JDSJList[i].hotelsType}</h2>
						<div class="hotel-kind-price">
							<h3 style="width:60px" class="poins">${JDSJList[i].hotelsAddress}</h3> 
							<h4> 
								<span>￥</span>
								<span>${JDSJList[i].hotelsPrice}</span>
								<span>/桌</span>
							</h4>
						</div>
					</li>
		    	`
		    }
		$(".hotel-kind-content2").html(JDSJStr)

		//城市tab
		let QyJList=data.data.QY
		let QYStr='<p class="hotel-title-active">全部</p>'
		    for(let i=0;i<QyJList.length;i++){
		    	QYStr+=`
		    		<p>${QyJList[i].cityName}</p>
		    	`
		    }
		$(".hotel-kind-title2").html(QYStr)
		


	},
	error: function() {
		//请求出错处理
		}
	});
	
/***************************查询热门酒店  右侧的列表**********************************************/
$.ajax({
	type:"post",    //请求方式
	url:myServer+jyj_indexSelectHotHotels,
	dataType:"json",
	data:{

	},    //请求参数		
	success: function(data) {
		if(data.status=='503'){
			window.location.href='error.html'
		}
		console.log("查询热门酒店1111111",data.data)
		
		let hotHotel=data.data

		let str=`<h1 class="hotel-kind-right-title">热门婚宴酒店</h1>`
		for(let i=0;i<hotHotel.length;i++){
			 str+=`
		    		<li onclick="(window.location.href='hotelDetail.html?id=${hotHotel[i].id}')">
						<h2>
							<span class="No1">${i+1}.</span>
							<span>${hotHotel[i].hotelsName}</span>
							
						</h2>
						<ul class="hotel-hot hotel-hot-gone">
							<li>
								<img src="${QiNiu}${hotHotel[i].hotelsUrl}"/>
								<div class="hotel-hot-detail">
									<p>桌数:${hotHotel[i].tableNumber}</p>
									<p style="margin-top:-5px">面积:${hotHotel[i].hotelsArea}</p>
									<p  class="poins" style="width:85px;margin-top:-5px">地址:${hotHotel[i].hotelsAddress}</p>
										
								</div>
							</li>
						</ul>
					</li>
		    `
		}
	
		
//		$(".hotel-kind-right").html('<h1 class="hotel-kind-right-title">热门婚宴酒店</h1>')
		
		$(".hotel-kind-right").html(str)

		hotelHover()
	},
	error: function() {
		//请求出错处理
		}
	});	
	
	
/***************************酒店三步查提交**********************************************/
$(".home-form-submit").click(function(){
$(".dialog1").css({"display":"block"})
//alert()
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
		
	
/************************************点击事件（切换酒店类型）**************************************************/
			$(".hotel-kind-title1 p").click(function(){
				$(".hotel-kind-title1 p").removeClass("hotel-title-active")
				$(this).addClass("hotel-title-active")
				//查找酒店
				let hotelsType=$(this).html()
				if(hotelsType=="全部"){
					hotelsType=""
				}

				selectListHotel(hotelsType)
			})
			
			$(".hotel-kind-right li").mouseenter(function(){
//				$(".hotel-kind-right li").find(".hotel-hot").removeClass("hotel-hot-gone")
//				$(this).find("ul").addClass("hotel-hot-gone")
				$(".hotel-kind-right li").find(".hotel-hot").css({"display":"none"})
				$(this).find(".hotel-hot").css({"display":"block"})
//				alert()
			}).mousemove(function (){  
            	$(this).find(".hotel-hot").css({"display":"block"})
        });  
        
/***************************************右边热门酒店推荐列表特效***************************************************/
		//鼠标移入特效
		function hotelHover(){
			$(".hotel-kind-right li").find(".hotel-hot").css({"display":"none"})
			$(".hotel-kind-right li").eq(0).find(".hotel-hot").css({"display":"block"})
			$(".hotel-kind-title1 p").click(function(){
				$(".hotel-kind-title1 p").removeClass("hotel-title-active")
				$(this).addClass("hotel-title-active")
			})
			
			$(".hotel-kind-right li").mouseenter(function(){

				$(".hotel-kind-right li").find(".hotel-hot").css({"display":"none"})
				$(this).find(".hotel-hot").css({"display":"block"})

			}).mousemove(function (){  
            	$(this).find(".hotel-hot").css({"display":"block"})
        	});  
		}
/*************************选择城市和价格****************************************/
	function getSelect2(){  
		$(".home-selct-city li ").click(function(){
			$(".home-selct-city-value").html($(this).html())
			$(".hotel-banner-content1").css({"display":"none"})
		})
		 	
		$(".home-selct-price li ").click(function(){
		 	$(".home-selct-price-value").html($(this).html())
		 	$(".hotel-banner-content2").css({"display":"none"})
		})
		 	

		
}		

//验证手机号
function checkPhone(){ 
    var phone = $(".tel-phone").val()
    if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){ 

        return false; 
    }else{
    	return true
    }
}


//搜索跳转
function goSearch(){
	
	window.location.href=encodeURI('searchHotel.html?id='+$(".serachV").val());
	
}