/*************************************** 查询所有酒店带分页*************************************************************************/
//分页酒店
demo();
function demo(curr){
	$.ajax({
	type:"post",    //请求方式
	url:myServer+jyj_indexSelectAllPlanCase,
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
		console.log("查询所有策划案例111111",data.data)

		let JDSJList=data.data.list
		let JDSJStr=""

		
		
		    for(let i=0;i<JDSJList.length;i++){
		    	JDSJStr+=`
		    	
		    		<li onclick="(window.location.href='designCase.html?id=${JDSJList[i].id}')">
						<img src="${QiNiu}${JDSJList[i].caseUrl}"/>
						<div class="more-list-des">
							<h1>${JDSJList[i].caseName}</h1>
							<h2>
								<span>${JDSJList[i].merchantName}</span>
								<span>收藏率99%</span>
							</h2>
						</div>
						
					</li>

		    	`
		    }
		$(".more-list-Case").html(JDSJStr)
		$("body,html").animate({/*scrollTop對象一般都是body和html*/
            "scrollTop":0
        },300)

        //显示分页
        laypage({
            cont: 'biuuu_city', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
            pages: data.data.pages, //通过后台拿到的总页数
            curr: curr || 1, //当前页
            skip: true, //是否开启跳页
    		skin: '#AF0000',
            jump: function(obj, first){ //触发分页后的回调
                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                    demo(obj.curr);
                }
            }
        });
    },
	error: function() {
		//请求出错处理
		}
	});	
    
};



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

//搜索跳转
function goSearch(){
	
		window.location.href=encodeURI('searchCase.html?id='+$(".serachV").val());
	
}		