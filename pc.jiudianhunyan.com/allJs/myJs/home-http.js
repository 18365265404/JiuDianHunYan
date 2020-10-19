$.ajax({
		    type:"post",    //请求方式
		    url:myServer+homeBanner,
		    dataType:"json",
			data:{
//		    	"cityCode":Pcity
				"cityCode":"110100",
				"type":"1"
		    	},    //请求参数		
		    success: function(data) {
		    if(data.status=='503'){
					window.location.href='error.html'
				}
		    console.log("宝宝宴banner",data)
		    
		    let bannerList=data.data.LUNBOTUJI
			let bannerStr=""
		    for(let i=0;i<bannerList.length;i++){
		    	bannerStr+=`
		    				<div class="swiper-slide" style=" background: url(${QiNiu}${bannerList[i].url});"></div>
		    				`
		    				
		    }
		    $(".swiper-wrapper1").html(bannerStr)
//		    swiper-wrapper
		    swiperMove(bannerList)
		    },
		    error: function() {
		        //请求出错处理
		    	}
			});