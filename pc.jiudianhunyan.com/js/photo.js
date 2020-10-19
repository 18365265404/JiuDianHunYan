/*********************************热门旅拍详情******************************************/
	$.ajax({
	type:"post",    //请求方式
	url:myServer+jyj_detailsSelectHotelsDetails,
	dataType:"json",
	data:{
		hotelsId:'13d9f88ab5f647e68f775f6408d268a2'
	},    //请求参数		
	success: function(data) {
		if(data.status=='503'){
			window.location.href='error.html'
		}
		console.log("热门旅拍详情",data.data)

		let bannerList=data.data.JDXQT
		if(bannerList.length>=5){
			bannerList=bannerList.slice(0,5)
		}

		//轮播图显示图
		$(".hotHotel-showImg-content").html(`<img class="hotHotel-showImg" src="${QiNiu}${bannerList[0].pictureUrl}"/>`)	
		
		let bannerStr=""
		    for(let i=0;i<bannerList.length;i++){
		    	bannerStr+=`
		    		<img src="${QiNiu}${bannerList[i].pictureUrl}"/>
		    	`
		    }
		$(".hotHotel-content1-list").html(bannerStr)
		imgMouseEnter()
		
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
				<h3 class="dCase-banner-des2">发布日期 : ${data.data.CHALXQT.createTime}</h3>
				`			
		$(".dCase-banner-des").html(descriptStr)
		
		
		//右侧信息查询——————————————————————————————————————————————————————————————————————————
			
		$(".dCase-nickName").html(data.data.SHXX.nickName)
		$(".dCase-phone-num").html(data.data.SHXX.phone)
		
		//商家案例——————————————————————————————————————————————————————————————————————————
		let caseStr=''
		let caseList=data.data.SJAL.slice(0,4)
		caseList.map(function(value,key){
			
		    caseStr+=`
		    
		    	<li>
					<img src="${QiNiu+value.caseUrl}"/>
					<p>Bonniebride 案例 | 紫之庇佑者</p>
					<h2>
						<span>伯妮婚礼策划机构</span>
						<span>收藏 24</a>
					</h2>
				</li>
		    `

		    return caseStr
		})
		$(".dCase-case1").html(caseStr)
		
		//相关推荐——————————————————————————————————————————————————————————————————————————
		let aboutStr=''
		let caseList2=data.data.SJAL
		caseList2.map(function(value,key){
			
		    aboutStr+=`
		    
		    	<li>
					<img src="${QiNiu+value.caseUrl}"/>
					<p>Bonniebride 案例 | 紫之庇佑者</p>
					<h2>
						<span>伯妮婚礼策划机构</span>
						<span>收藏 24</a>
					</h2>
				</li>
		    `

		    return aboutStr
		})
		$(".dCase-case2").html(aboutStr)
	},
	error: function() {
		//请求出错处理
		}
	});