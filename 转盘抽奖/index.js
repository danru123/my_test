$(function(){
    var turnplate={
        startAngle:0,
        randomRate:[],
        bRotate:false
    };
    var sum;
    turnplate.randomRate=["0%",'0%','0%','0%','0%','0%','0%','0%'];
    var rotateTimeOut=function(){
        $('.awardGift').rotate({
            angle:0,
            animateTo:2160,
            duration:8000,
            callback:function(){
                alert('缃戠粶瓒呮椂锛岃妫€鏌ユ偍鐨勭綉缁滆缃紒');
            }});
        };
    var rotateFn=function(item,txt){
        var angles=item*(360/turnplate.randomRate.length)-(360/(turnplate.randomRate.length*2));
        if(angles<270){
            angles=270-angles;
        }else{
            angles=360-angles+270;
        }
    $('.awardGift').stopRotate();$('.awardGift').rotate({
        angle:0,
        animateTo:angles+1800,
        duration:8000,
        callback:function(){
            alert(txt.giftCode);
            turnplate.bRotate=!turnplate.bRotate;
            }
        });};
        $('.start').click(function(){
            if(turnplate.bRotate)return;
            turnplate.bRotate=!turnplate.bRotate;
            $.get('json/award.json',function(data){
                turnplate.randomRate=["0%",'0%','0%','0%','0%','0%','0%','0%'];
                turnplate.randomRate[data.giftCode]="100%";
                var item=rnd(turnplate.randomRate);
                rotateFn(item,data);
            })
        });
    });
    function rnd(rate){
        var random=Math.floor(Math.random()*100);
        var myRandom=[];
        var randomList=[];
        var randomParent=[];
        for(var i=0;i<100;i++){
                myRandom.push(parseInt([i])+1);
            }
        for(var i=0;i<rate.length;i++){
            var temp=[];
            var start=0;
            var end=0;
            randomList.push(parseInt(rate[i].split('%')[0]));
            for(var j=0;j<randomList.length;j++){
                start+=randomList[j-1]||0
                end+=randomList[j]
            }
                temp=myRandom.slice(start,end);randomParent.push(temp)
            }
        for(var i=0;i<randomParent.length;i++){
            if($.inArray(random,randomParent[i])>0){
                return(i+1)
            }
        }
    }