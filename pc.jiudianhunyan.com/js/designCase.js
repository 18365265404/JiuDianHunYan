
//上级传递过来的参数
	var getHref = window.location.href;
	let getId=getHref.split("?")[1].split("=")[1];

/***************************策划案例详情**********************************************/
	$.ajax({
	type:"post",    //请求方式
	url:myServer+jyj_detailsSelectPlanCaseDetails,
	dataType:"json",
	data:{
		planCaseId:getId
	},    //请求参数		
	success: function(data) {
		if(data.status=='503'){
			window.location.href='error.html'
		}
		console.log("详情轮播图",data.data)
		let bannerList=data.data.CHALXQT.casePictureVOS
		let bannerStr=""
		    for(let i=0;i<bannerList.length;i++){
		    	bannerStr+=`
		    		<div class="swiper-slide" style=" background: url(${QiNiu}${bannerList[i].pictureUrl}); background-position:center center ; background-size:100% 100% ;"></div>
		    	`
		    }
		$(".swiper-wrapper1").html(bannerStr)
//		alert(data.data.CHALXQT.caseName)
		$(".case-name").html(data.data.CHALXQT.caseName)
		swiperMoveCHdetail(bannerList)
		
		//轮播图下面的数据——————————————————————————————————————————————————————————————————————————
		
		let descriptStr=`
				<div class="dCase-banner-des1">
					<h1>${data.data.CHALXQT.caseName}</h1>
					<h2 style="opacity:0">
						<span>收藏110</span>
						<a href="#">
						<span class="glyphicon glyphicon-share"></span>
						<span>分享</span>
						caseName
						</a>
					</h2>
				</div>
				<h3 class="dCase-banner-des2">发布日期 : ${getLocalTime(data.data.CHALXQT.createTime)}</h3>
				`			
		$(".dCase-banner-des").html(descriptStr)
		
		
		//右侧信息查询——————————————————————————————————————————————————————————————————————————
			
//		$(".dCase-nickName").html(data.data.SHXX.nickName)
		$(".dCase-phone-num").html(data.data.SHXX.phone)
		
		//商家案例——————————————————————————————————————————————————————————————————————————
		let caseStr=''
		let caseList=data.data.SJAL.slice(0,4)
		caseList.map(function(value,key){
			
		    caseStr+=`
		    
		    	<li onclick="(window.location.href='designCase.html?id=${value.id}')">
					<img src="${QiNiu+value.caseUrl}"/>
					<p>${value.caseName}</p>
					<h2>
						<span>${value.merchantName}</span>
						<span>收藏率 99%</a>
					</h2>
				</li>
		    `

		    return caseStr
		})
		$(".dCase-case1").html(caseStr)
		
		//相关推荐——————————————————————————————————————————————————————————————————————————
		let aboutStr=''
		let caseList2=data.data.XGTJ
		caseList2.map(function(value,key){
			
		    aboutStr+=`
		    
		    	<li onclick="(window.location.href='designCase.html?id=${value.id}')">
					<img src="${QiNiu+value.caseUrl}"/>
					<p>${value.caseName}</p>
					<h2>
						<span>${value.merchantName}</span>
						<span>收藏率 99%</a>
					</h2>
				</li>
		    `

		    return aboutStr
		})
		$(".dCase-case2").html(aboutStr)
		$("#shopName").html(caseList2[0].merchantName)
	},
	error: function() {
		//请求出错处理
		}
	});
	

//搜索跳转
function goSearch(){
	
	window.location.href=encodeURI('searchCase.html?id='+$(".serachV").val());
	
}		
//时间戳转时间格式
function getLocalTime(nS) {  
 	return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');  
}