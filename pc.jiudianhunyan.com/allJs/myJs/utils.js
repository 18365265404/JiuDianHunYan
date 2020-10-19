//轮播图banner
	function swiperMove(list){
		
		//常规轮播
			if(list){
				console.log("================================",list.length)
			    if(list.length>1){
			      	
			      	var swiper = new Swiper('.swiper-container1',{
			      	pagination: {
				       el: '.swiper-pagination1',
				       clickable: true,
				    },
					loop: true,//图片无限转动
			        setWrapperSize :true,//自动轮播
			        autoplay: true, //轮播的时间
				    });

			    }
			}
		

		    
		    

		
	}
	
	function swiperMove2(list){

		
			//首页轮播  策划案例
			var swiper2 = new Swiper('.swiper-container3', {
		      slidesPerView: "4",
		      spaceBetween: 10,
			  centeredSlides: true,
			  slidesOffsetBefore : 100,

			  
			  
		      pagination: {
		        el: '.swiper-pagination',
		        clickable: true,
		      },
		      coverflowEffect: {
		        rotate: 0,
		        stretch: 0,
		        depth: 0,
		        modifier: 1,
		        slideShadows: false
		      },
		      loop: true,//图片无限转动


		      autoplay: {
		        delay: 3000,
		        stopOnLastSlide: false,
		        disableOnInteraction: false
		      },
		      loopAdditionalSlides: 100,
		      
		      
		    });
		    

			$('.swiper-slide').mouseenter(function(){ 
				swiper2.autoplay.start(); 
			})
			$('.swiper-slide').mouseleave(function(){ 
				swiper2.autoplay.start(); 
			})		    


		
	}	
	//策划详情轮播图
	function swiperMoveCHdetail(list){

		
			//婚礼策划轮播详情
			var swiper4 = new Swiper('.swiper-container4', {
		      pagination: {
		        el: '.swiper-pagination',
		        type: 'fraction',
		      },
		      loop: true,//图片无限转动
			        setWrapperSize :true,//自动轮播
			        autoplay: true, //轮播的时间
		      navigation: {
		        nextEl: '.swiper-button-next',
		        prevEl: '.swiper-button-prev',
		      },
		    });
		    

			$('.swiper-slide').mouseenter(function(){ 
				swiper4.autoplay.start(); 
			})
			$('.swiper-slide').mouseleave(function(){ 
				swiper4.autoplay.start(); 
			})		    


		
	}
	
	
/*************************距离顶部的距离****************************************/
	function getScrollTop(){  
    var scrollTop=0;  
    if(document.documentElement&&document.documentElement.scrollTop){  
        scrollTop=document.documentElement.scrollTop;  
    }else if(document.body){  
        scrollTop=document.body.scrollTop;  
    }  
    return scrollTop;  
}
	
/*************************首页价格选择****************************************/
	function getSelect(){  
		$(".home-selct-city li ").click(function(){
			$(".home-selct-city-value").html($(this).html())
			$(".home-selct-city").css({"display":"none"})
		})
		 	
		$(".home-selct-price li ").click(function(){
		 	$(".home-selct-price-value").html($(this).html())
		 	$(".home-selct-price").css({"display":"none"})
		})
		 	
		$('.home-form li').mouseenter(function(){ 
			$(this).children('ul').css({"display":"block"})
		})
		
		$('.home-form li').mouseleave(function(){ 
			$(this).children('ul').css({"display":"none"})
		})
}


/*************************城市点击锚点变色****************************************/
function getAnchor(){  
	$(".city-letter a").click(function(){
		$(this).each(function(){
        	var href = $(this).attr('href');
                
            $(".city-list-item span").css({'background':'#FAFAFA','color':'#666666'})
            $(href).css({'background':'#FF5165','color':'white'})
        })
	})
}

/************************自定义弹窗***********************************************/

function showDialog(){
	$(".pop").click(function(){
		$(".dialog").css({'display':'block'})
	})
	$(".pop-close").click(function(){
		$(".dialog").css({'display':'none'})
	})	
	
}

/************************热门酒店详情轮播图***************************************************/
function imgMouseEnter(){
	$(".hotHotel-content1-list img").mouseenter(function(){ 
				
		$(this).each(function(){
			var srcImg = $(this).attr('src');    
			$('.hotHotel-showImg').attr("src", srcImg);
		})	
	})
}
