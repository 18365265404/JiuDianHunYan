//搜索页面传来的参数
	var getHref = window.location.href;
	let getId=getHref.split("?")[1].split("=")[1];
	
//搜索框值

$(".searchV2").val(decodeURI(getId))


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
		likeName:decodeURI(getId)
	}, 

    success: function(data) {
    	if(data.status=='503'){
			window.location.href='error.html'
		}
		console.log("查询所有酒店",data.data)

		let JDSJList=data.data.list


		
		let JDSJStr=""
		    for(let i=0;i<JDSJList.length;i++){
		    	JDSJStr+=`
		    	
		    		<li onclick="(window.location.href='designCase.html?id=${JDSJList[i].id}')">
						<img src="${QiNiu}${JDSJList[i].caseUrl}"/>
						<p>${JDSJList[i].caseName}</p>
						<h1 style="margin-bottom:-40px">${JDSJList[i].merchantName}</h1>
						
						<h3>
							<span style="opacity:0">￥</span>
							<span style="opacity:0">${JDSJList[i].hotelsPrice}</span>
							<span style="font-size:12px">好评率100%</span>
							
						</h3>
					</li>

		    	`
		    }
		$(".search-list").html(JDSJStr)
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



	
//搜索跳转
function goSearch(){
	
		window.location.href=encodeURI('searchCase.html?id='+$(".searchV2").val());
	
}	