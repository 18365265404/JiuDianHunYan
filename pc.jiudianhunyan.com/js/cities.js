
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
		console.log("查询所有城市",data.data)
		let cityList=data.data
		let  cityStr1=""
		let  cityStr2=""
		cityList.map(function(value,key){
			
		    cityStr1+=`<a href="#${value.cityKey}">${value.cityKey}</a>`

		    return cityStr1
		})
		
		cityList.map(function(value,key){
			

		    cityStr2+=`
		    <div class="city-list-item">
				<span id="${value.cityKey}">${value.cityKey}</span>
				<div class="city-list-item-right">
					${cityFn(value.list)}
				</div>
			
			</div>
		    `

		    return cityStr2
		})
		$(".city-letter-list").html(cityStr1)
		$(".city-list").html(cityStr2)
		getAnchor()
		
		/***************热门城市************************/
		let hotCityList=[]
		let allcityStr='<span class="cityhot-name">热门城市：</span>'
		for(let i=0;i<cityList.length;i++){
			for(let j=0;j<cityList[i].list.length;j++){
				hotCityList.push(cityList[i].list[j])
			}
			
		}
		
		for(let i=0;i<hotCityList.length;i++){
			allcityStr+=`
				<a  onclick="goHome('${hotCityList[i].id}','${hotCityList[i].cityName}')">${hotCityList[i].cityName}</a>
				`
			
			
		}

		$(".city-hot").html(allcityStr)
		console.log("00000000000000000000",allcityStr)
		
	},
	error: function() {
		//请求出错处理
		}
	});
	
	function cityFn(lists){
		let str=''
		for(let i=0;i<lists.length;i++){
			str+=`<a  onclick="goHome('${lists[i].id}','${lists[i].cityName}')">${lists[i].cityName}</a>`
		}
		return str
	}
	
//点击城市跳转
function goHome(id,cityName){
	window.history.go(-1); 
	localStorage.setItem("city_id",id)
	localStorage.setItem("city_name",cityName)
//	window.location.href='index.html'
	
}
