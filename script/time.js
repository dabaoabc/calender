function currentTime() {
    var date = new Date();
    var seperator = ":";
    var currentTime = date.getHours() + seperator + date.getMinutes()+ seperator + date.getSeconds();
    return currentTime;
}

function currentDate(){
    var date = new Date();
    var seperator = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentDate = date.getFullYear() + seperator + month + seperator + strDate;
    return currentDate;
}

// var current = (function(){
//     var date = new Date();
//     var seperator = ":";
//     var seperator = "-";
//     var month = date.getMonth() + 1;
//     var strDate = date.getDate();
//     if (month >= 1 && month <= 9) {
//         month = "0" + month;
//     }
//     if (strDate >= 0 && strDate <= 9) {
//         strDate = "0" + strDate;
//     }
//     var currentDate = date.getFullYear() + seperator + month + seperator + strDate;
//     var currentTime = date.getHours() + seperator + date.getMinutes()+ seperator + date.getSeconds();
//     return {
//         currentDate:currentDate,
//         currentTime:currentTime
//     }
// })();

//实现了顶部年月点击的手动切换
function change(val,obj,text,year){
    var obj = document.querySelector("."+obj);    
    if (obj) {
        if (val == 'add') {
            if (text.className == 'monthValue') {
                obj.addEventListener("click",function(){
                    if (parseInt(text.innerHTML)>=12) {
                        text.innerHTML = 1;
                        year.innerHTML = parseInt(year.innerHTML) + 1; 
                    }else{
                        text.innerHTML = parseInt(text.innerHTML) + 1;
                    }          
                });
            }else{
                obj.addEventListener("click",function(){
                    text.innerHTML = parseInt(text.innerHTML) + 1;  
                    // listenChange(yearValue);
                });
            }       
        }else if (val == 'sub') {
            if (text.className == 'monthValue') {
                obj.addEventListener("click",function(){
                    if (parseInt(text.innerHTML)<=1) {
                        text.innerHTML = 12;
                        year.innerHTML = parseInt(year.innerHTML) - 1;
                        // listenChange(yearValue);
                    }else{
                        text.innerHTML = parseInt(text.innerHTML) - 1;
                    } 
                    // listenChange(monthValue);  
                });
            }else{
                obj.addEventListener("click",function(){
                    text.innerHTML = parseInt(text.innerHTML) - 1;
                    // listenChange(yearValue);
                });
            }
        }
    }else{
        console.log("未找到DOM元素");
    }
}

//显示或隐藏下拉框
function show_bar(bar,list){
    var bar = document.querySelector("."+bar);
    var list = document.querySelector("."+list);
    if (bar && list) {
        bar.addEventListener("click",function(){
            if (list.style.display == 'none') {
                list.style.display = 'block';
            }else{
                list.style.display = 'none';
            }
        });
    }
}


//获取顶部页面的年月，动态刷新页面
function Changedate(yearV,monthV,dayV){
    var yearV = document.querySelector("."+yearV);
    var monthV = document.querySelector("."+monthV);
    // var dayV = document.querySelector("."+dayV);
    // console.log(yearV.innerHTML);
    // console.log(monthV.innerHTML);
    var date = new Date();
    var dayNow = date.getDate();
    showdays(yearV.innerHTML,monthV.innerHTML,dayNow);
    changeLeft(yearV.innerHTML,monthV.innerHTML,dayNow);
    dayDetail();//当页面重新刷新时，重新给一天绑定事件
}

//监听当改变月份和年份时，出现变化
function listen(){
    var yearValue = 'yearValue',
        monthValue = 'monthValue';

    for(var i=0;i<arguments.length-1;i++){
        var obj = document.querySelector("."+arguments[i]);
        obj.addEventListener("click",function(){
            Changedate(yearValue,monthValue);
        });
    }
    var holiday = document.querySelector('.holiday_list');
    holiday.addEventListener("click",function(){
        dayDetail();//当页面重新刷新时，重新给一天绑定事件
    });
}


//手动选择年月日函数
function chooseYM(obj,targ){
    var obj = document.querySelector("."+obj);
    var targ = document.querySelector("."+targ);
    obj.addEventListener("click",function(e){
        if(e.target && e.target.nodeName.toLowerCase() == "li") {
            if (obj.className == 'holiday_list') {
                var day = e.target.getAttribute("value").slice(3,5);
                var month = e.target.getAttribute("value").slice(0,2);
                var monthValue = document.querySelector(".monthValue");
                monthValue.innerHTML = month;
                // console.log(day);
                // console.log(month);
                showdays(2016,month,day);
                changeLeft(2016,month,day);
            }   
            targ.innerHTML = e.target.getAttribute("val");
        }
        hidelist(obj);
    });
}

function hidelist(obj){
    obj.style.display = 'none';
}
//点击日历的某个日期，出现日期信息
function dayDetail(){
    var li = document.querySelectorAll(".main_dates ol li");   
    for(var i=0;i<li.length;i++){
        li[i].addEventListener('click',function(){
            // console.log(this.querySelector("div").innerHTML)
            for(var i=0;i<li.length;i++){
                li[i].className = '';   
            }
            if (this.querySelector("div").innerHTML !== '&nbsp;') {
                this.className = 'libg';
                var day = this.getAttribute("value");
                //console.log(day);
                var array = day.split("/");
                changeLeft(array[0],array[1],array[2]);
            }
        });
    }
    
}

//左边信息展示,接口是输入的日期
function changeLeft(y,m,d){
    var cur = getCurrentDateTime(y,m,d);
    var lunner = showCal(y,m,d);
    var nac_date = document.querySelector(".nac_date");
    var nac_weekday = document.querySelector(".nac_weekday");
    var date_show_panel = document.querySelector(".date_show_panel");
    var lunar = document.querySelector(".lunar");
    var ganzi = document.querySelector(".ganzi");
    var animal_year = document.querySelector(".animal_year");

    nac_date.innerHTML = cur.curYear+"-"+cur.curMonth+"-"+cur.curDay;
    nac_weekday.innerHTML = cur.weekday;
    date_show_panel.innerHTML = parseInt(cur.curDay);
    lunar.innerHTML = "农历"+lunner.monDayString+lunner.cDay;
    ganzi.innerHTML = lunner.tgdzString+"年";
    animal_year.innerHTML = lunner.sx+"年";
    suitvoid()
}


//返回今天的功能
function returntoday(){
    var back_today_now = document.querySelector(".back_today_now");
    var date = new Date();
    var dayNow = date.getDate();
    var monthNow = date.getMonth()+1;
    var yearNow = date.getFullYear();
    showdays(yearNow,monthNow,dayNow);
    back_today_now.addEventListener("click",function(){
        showdays(yearNow,monthNow,dayNow);//显示阳历和农历
        changeLeft(yearNow,monthNow,dayNow);
        dayDetail();
    });

}
//宜和忌 
function suitvoid(){
    var suitVoid = ["祈福","开市","立券","挂匾","祭祀","开仓","纳采","订盟","嫁娶","入宅"]; 
    var suit = [];
    var avoid = [];
    for(var i=0;i<suitVoid.length;i++){
        var a = suitVoid[Math.floor(Math.random()*suitVoid.length)];
        if (i%2 == 0) {
            suit.push(a);
        }else{
            avoid.push(a);
        }
    } 
    //宜
    content = '';
    var suitfix = document.querySelector(".suit ul");
    for(var j = 0;j<suit.length;j++){
        content += "<li>"+suit[j]+"</li>" 
    }
    suitfix.innerHTML = content;

    //忌
    content1 = '';
    var avoidfix = document.querySelector(".avoid ul");
    for(var j = 0;j<avoid.length;j++){
        content1 += "<li>"+avoid[j]+"</li>" 
    }
    avoidfix.innerHTML = content1;

}
