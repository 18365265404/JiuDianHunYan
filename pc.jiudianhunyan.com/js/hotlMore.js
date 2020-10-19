/*************************************** 查询所有酒店带分页*************************************************************************/
//分页酒店
demo();
function demo(curr){
	$.ajax({
	type:"post",    //请求方式
	url:myServer+jyj_detailsSelectAllHotels,
	dataType:"json",
	data:{
		cityId:localStorage.getItem("city_id"),

		pageNum: curr || 1,
		likeName:""
	}, 

    success: function(data) {
    	if(data.status=='503'){
			window.location.href='error.html'
		}
		console.log("查询所有酒店111111",data.data)

		let JDSJList=data.data.JDSJ.list
		let JDSJStr=""

		
		
		    for(let i=0;i<JDSJList.length;i++){
		    	JDSJStr+=`
		    	
		    		<li  onclick="(window.location.href='hotelDetail.html?id=${JDSJList[i].id}')">
					<img src="${QiNiu}${JDSJList[i].hotelsUrl}"/>
					<div class="more-content1">
						<h1>${JDSJList[i].hotelsName}</h1>
						<h2>
							
						
							<span>区域</span>
							<i>${JDSJList[i].hotelsArea}</i>	
							<em>|</em>
							<span>类型</span>
							<i>${JDSJList[i].hotelsType}</i>
							
							<!--
								
								
								<em>|</em>
								<span>宴会厅</span>
								<i>1000-1300m²</i>
								<em>|</em>
								<span>层高</span>
								<i>4-9 m</i>		
										
									-->
							
						</h2>
						<h3 style="opacity:0">
							<span>186</span>
							<i>人预订过</i>
							<em>|</em>
							<span>0</span>
							<i>条评论</i>
						</h3>
						<h4>
							<span class="glyphicon glyphicon-map-marker"></span>
							<span>${JDSJList[i].hotelsAddress}</span>
						</h4>
					</div>
					<div class="more-content2">
						<div class="more-content2-top">
							<div class="more-des">
								<h1>
									<i>${JDSJList[i].hallNum}</i>
									<span>个</span>
								</h1>
								<h2>宴会厅</h2>
							
							</div>
	
							<div class="more-des">
								<h1>
									<i>${JDSJList[i].menuNum}</i>
									<span>套</span>
								</h1>
								<h2>婚宴菜单</h2>
							
							</div>
													
							<div class="more-des">
								<h1>
									<i>${JDSJList[i].tableNumber}</i>
									<span>桌</span>
								</h1>
								<h2>婚宴席</h2>
							
							</div>
						</div>
						
						
						<div class="more-content2-bottom">
							<h1>
								<i>￥</i>
								<span>${JDSJList[i].hotelsPrice}</span>
								<i>/桌</i>
							</h1>
							<h2 onclick="showCustomer()">查询档期</h2>
						</div>
						
					</div>
				</li>

		    	`
		    }
		    
		$(".more-list").html(JDSJStr)
		$("body,html").animate({/*scrollTop對象一般都是body和html*/
            "scrollTop":0
        },300)

        //显示分页
        laypage({
            cont: 'biuuu_city', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
            pages: data.data.JDSJ.pages, //通过后台拿到的总页数
            curr: curr || 1, //当前页
            skip: true, //是否开启跳页
    		skin: '#AF0000',
            jump: function(obj, first){ //触发分页后的回调
                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                    demo(obj.curr);
                }
            },
        });
        
    },
	error: function() {
		//请求出错处理
		}
	});	
    
};

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
		console.log("查询热门酒店",data.data)
		
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
									<p>${hotHotel[i].tableNumber}</p>
									<p>${hotHotel[i].hotelsArea}</p>
									<p>${hotHotel[i].hotelsAddress}</p>
										
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
	

/****************************************************JS特效**********************************************************************/

		
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
		
		//跳转客服
		function showCustomer(){
			
			window.open('http://p.qiao.baidu.com/cps/chat?siteId=12777208&userId=26759148', '_blank')
			event.stopPropagation();
		}

//搜索跳转
function goSearch(){
	
		window.location.href=encodeURI('searchHotel.html?id='+$(".serachV").val());
	
}		