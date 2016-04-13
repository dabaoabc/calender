window.onload = function(){
	var time = document.querySelector("#time_now span");
	var year = document.querySelector(".year_now span");
	var month = document.querySelector(".month_now span");
	var year_bar = document.querySelector(".year_bar");
	var year_list = document.querySelector(".year_list");

	var month_bar = document.querySelector(".month_bar");
	var month_list = document.querySelector(".month_list");

	var date = new Date();
    var dayNow = date.getDate();
    var monthNow = date.getMonth()+1;
    var yearNow = date.getFullYear();

	var add = 'add',
	sub = 'sub',
	next_year = 'next_year',
	pre_year = 'pre_year',
	next_month = 'next_month',
	pre_month = 'pre_month',
	year_bar = 'year_bar',
	month_bar = 'month_bar',
	year_list = 'year_list',
	month_list = 'month_list',
	holiday_bar = 'holiday_bar',
	holiday_list = 'holiday_list',
	monthValue = 'monthValue',
    yearValue = 'yearValue',
    holidayValue = 'holidayValue';


    //同步时间
	returntoday();
	setInterval(function(){
		time.innerHTML = currentTime();
	},500);

	//实现了顶部年月点击的手动切换
	change(add,next_year,year);
	change(sub,pre_year,year);
	change(add,next_month,month,year);
	change(sub,pre_month,month,year);
	//显示或隐藏下拉框
	show_bar(year_bar,year_list);
	show_bar(month_bar,month_list);
	show_bar(holiday_bar,holiday_list);

	//手动选择年月日函数
    chooseYM(year_list,yearValue);               
    chooseYM(month_list,monthValue);               
    chooseYM(holiday_list,holidayValue);               
 	
 	//监听头部是否发生变化
	listen(pre_month,next_month,pre_year,next_year,month_list,year_list,holiday_list)
	
	dayDetail();
	changeLeft(yearNow,monthNow,dayNow)
}