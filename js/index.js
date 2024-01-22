$(document).ready(function(){
    cityBG();
    cityBefore();
    actionFunction();
    cityAfter();
});

var activeN = 2;
var moveWidth = 0;
var currentState = 'before';
var marginTop = 0;
var multiplier = 0;

if(window.matchMedia('(min-width:1280px)').matches){
    marginTop = 30;
    multiplier = 2;
}else if(window.matchMedia('(max-width:1279px)').matches && window.matchMedia('(min-width:768px)').matches){
    marginTop = 20;
    multiplier = 1.8;
}else{
    marginTop = 15;
    multiplier = 1.8;
}

$(window).on('resize orientationchange', function(){
    cityBefore();
});

function cityBG(){
    var backgroundIMG = "";
    var cityA = $('.citySlider li');

    for(var i=1; i<cityA.length+1; i++){
        if(i<10){
            backgroundIMG = "url('images/city0"+i+"_after.jpg')";
        }else{
            backgroundIMG = "url('images/city"+i+"_after.jpg')";
        }
        $(cityA[(i-1)]).css('background-image',backgroundIMG);
    }

    setTimeout(() => {
        $('.preinfo').css('display','none');
    }, 6000);
}

function colorChange(beforeClass,afterClass){
    $('header').removeClass(beforeClass);
    $('footer').removeClass(beforeClass);
    $('header').addClass(afterClass);
    $('footer').addClass(afterClass);
}

function cityBefore(){
    var cityA = $('.citySlider li');
    var centerW = $(cityA[activeN]).width();
    var centerH = $(cityA[activeN]).height();
    var centerT = (window.innerHeight-centerH)/multiplier;
    var centerL = (window.innerWidth-centerW)/2;
    var totalH = centerH + marginTop*5;

    $('.indexContainer div h2').text($(cityA[activeN]).children('span').text());
    $('.indexContainer div>small').text($(cityA[activeN]).children('b').text());
    
    $('.indexContainer>div h2').css('margin-bottom',totalH);

    $(cityA).removeClass('active');
    for(var i=1; i<cityA.length; i++){
        $(cityA[activeN]).addClass('active');
        $(cityA[activeN]).css({
            top: centerT,
            left: centerL
        });
        $(cityA[activeN+i]).css({
            top: centerT+(marginTop*i),
            left: centerL+(10+centerW)*i
        });
        $(cityA[activeN-i]).css({
            top: centerT+(marginTop*i),
            left: centerL-(10+centerW)*i
        });
    }
}

function actionFunction(){
    var cityA = $('.citySlider li');

    window.addEventListener('wheel', function(e){
        $('.indexContainer>div>span').css('opacity','0');
        $(cityA).removeClass('clicky');

        if(e.deltaY>0 && activeN!=28){
            activeN++;
        }else if(e.deltaY<0 && activeN!=0){
            activeN--;
        }
        cityBefore();
    });
}

function cityAfter(){
    var cityA = $('.citySlider li');
    var centerW = $(cityA[activeN]).width();
    var centerH = $(cityA[activeN]).height();
    var centerT = (window.innerHeight-centerH)/multiplier;
    var centerL = (window.innerWidth-centerW)/2;

    $(cityA).click(function(e){

        if(currentState == 'before'){
            console.log('click posible');
        }else{
            console.log('cant click');
            return false;
        }

        $(this).addClass('active clicky');
        $('body').on('wheel',function(){
            return false;
        });

        colorChange('modeDefalut','modeWhite');
        return currentState = 'after';
    });

    $(".citySlider input.fiR24").on('click touch',function(e){
        e.stopPropagation();
        $('body').off('wheel');
        $(cityA).removeClass('active clicky');

        colorChange('modeWhite','modeDefalut');
        
        for(var i=1; i<29; i++){
            $(cityA[activeN]).addClass('active');
            $(cityA[activeN]).css({
                top: centerT,
                left: centerL
            });
            $(cityA[activeN+i]).css({
                top: centerT+(marginTop*i),
                left: centerL+(10+centerW)*i
            });
            $(cityA[activeN-i]).css({
                top: centerT+(marginTop*i),
                left: centerL-(10+centerW)*i
            });
        }

        return currentState = 'before';
    });
    $(".citySlider a").on('click touch',function(e){
        e.stopPropagation();
    });

    window.addEventListener('touchstart',function(e){
        beforeX = e.touches[0].pageX;
        return beforeX;
    });
    window.addEventListener('touchend',function(e){
        afterX = e.changedTouches[0].pageX;
        
        moveWidth = beforeX - afterX;

        if(Math.abs(moveWidth)>30){
            $('.preinfo').css('opacity','0');
            setTimeout(() => {
                $('.preinfo').css('display','none');
            }, 500);
        }
        
        if(currentState == 'after'){
            return false;
        }else{
            if(moveWidth>30 && activeN!=28){
                activeN++;
            }else if(moveWidth<-30 && activeN!=0){
                activeN--;
            }
            cityBefore();
        }
    });
}