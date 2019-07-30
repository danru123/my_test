// 1.服务器地址
// var urls = 'http://192.168.199.210:8006' // 本地服务器
// var urls = 'http://test.interface.carmanclub.com.cn/cym_back/' // 测试服务器06.19
var urls = 'http://api-518aic.bankft.com'  //线上地址
// 2.时间转化
function get_str_time(time) {
    var datetime = new Date()
    datetime.setTime(time*1000);
    var year = datetime.getFullYear()
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    // var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
    // var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    // var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    // return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
    return year + "-" + month + "-" + date;
}

// 3.post请求
/*-----------------ajax-post请求: 地址，参数，返回函数-------------------*/
function post_ajax(url,args,fn){
    $.ajax({
        type: 'POST',
        url: urls + url,
        data: args,
        success: function (json){
            fn(json)
        },
        error: function (err){
            // console.log('error',err);
            // try {
            //     if(err.responseJSON.code == 4){
            //         layer.msg('令牌失效，请从新登录')
            //         setTimeout(function(){
            //             var login_address = sessionStorage.getItem('login_address')
            //             if(login_address){
            //                 window.location.href = login_address // 令牌token失效，跳回登录页面
            //             }
            //         }, 1000)
            //     }else{
            //         layer.msg("异常错误请联网后重试");
            //     }
            // }
            // catch(err) {
            //     layer.msg("异常错误请联网后重试");
            // }
        }
    })
}

//设置过期时间
function getLocalStorage(key,exp) {
    var time=localStorage.getItem('time');
       if(localStorage.getItem(key)) {
             var isTimed = (new Date().getTime() - time) > exp;
             if(isTimed) {
                 console.log("存储已过期");
                 localStorage.clear();
             }
         } else {
             return null;
         }
     }


//啦啦啦啦啦啦啦

//axios的Get方法封装
function GET(url, data, fn) {
    // var tk = getCookie('token');
    // if (tk) {
        axios({
            url: url,
            method: 'get',
            data: data,
            headers: { 'token': tk }
        }).then(function (response) {
            if (response.data.ret == -2)//没有访问权限
            {
                location.href = '/';
            }
            else if (response.data.ret == -1) {//程序错误
                console.log(response.data.msg);
            }
            else {
                fn(response.data);
            }
        }).catch(function (error) {
            console.log(error);
        })
    // }
}


//判断时间过去多长时间
timeago(dateTimeStamp){
    var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();   //获取当前时间毫秒
    // console.log(now);
    var diffValue = now - dateTimeStamp;//时间差
    // console.log(diffValue);
    var result='';
    if(diffValue < 0){
        return;
    }
    var minC = diffValue/minute;  //计算时间差的分，时，天，周，月
    var hourC = diffValue/hour;
    var dayC = diffValue/day;
    var weekC = diffValue/week;
    var monthC = diffValue/month;
    if(monthC >= 1 && monthC <= 3){
        // result = " " + parseInt(monthC) + "月前"
        restule = get_str_time3(dateTimeStamp);
    }else if(weekC >= 1 && weekC <= 3){
        result = " " + parseInt(weekC) + "周前"
    }else if(dayC >= 1 && dayC <= 6){
        result = " " + parseInt(dayC) + "天前"
    }else if(hourC >= 1 && hourC <= 23){
        result = " " + parseInt(hourC) + "小时前"
    }else if(minC >= 1 && minC <= 59){
        result =" " + parseInt(minC) + "分钟前"
    }else if(diffValue >= 0 && diffValue <= minute){
        result = "刚刚"
    }else {
        var datetime = new Date();
        datetime.setTime(dateTimeStamp);
        var Nyear = datetime.getFullYear();
        var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        result = Nyear + "-" + Nmonth + "-" + Ndate
    }
    return result;
}