$(document).ready(function(){
    matchAction();

    themaDetailFunction();
    videoDetailFunction();
    detailBG('.videoDetailContainer div h2','detailBG','.videoDetailContainer','.png');

    videoTimeFunction();
    videoControl();
    themaSlider();
    
    archiveFunction();
    archiveBG();
});

$(window).on('resize orientationchange', function(){
    matchAction();
});

function matchAction(){
    if(window.matchMedia('(min-width:1280px)').matches){
        detailBG('.cityContainer div h2','cityBG','.cityContainer','.jpg');
        cityDetailFunction();
    }
}

function detailBG(tagH, frontN, targetS, fileExtension){
    var backgroundIMG = "";
    var pageTitle = $(tagH);
    var imageName = $(pageTitle).text();

    imageName = imageName.replace(' / ','');
    backgroundIMG = "url('images/"+frontN+"_"+imageName+fileExtension+"')";
    $(targetS).css('background-image',backgroundIMG);
}
 
function cityDetailFunction(){ 
    var contentH = 0;
    contentH = $('.cityContainer>div:nth-of-type(2)').height();
    
    $('.cityContainer').css('padding-top',window.innerHeight - $('.cityContainer>div:first-of-type').height()-180);
    $('.cityContainer>div:last-of-type').css('height',contentH);

    window.addEventListener('wheel', function(e){
        if(e.deltaY>0){
            $('.cityContainer>div:first-of-type').addClass('active');

            $(".cityContainer").animate({
                scrollTop : 0,
                padding : 0
            },1000);
            
            $('.cityContainer').css({
                'overflow-y' : 'scroll'
            });
        }
    },{ once : true});

    $('.cityContainer').on('touchend', function(e){
        $('.cityContainer>div:first-of-type').addClass('active');

        $(".cityContainer").animate({
            scrollTop : 0,
            padding : 0
        },1000);
        
        $('.cityContainer').css({
            'overflow-y' : 'scroll'
        });
    });
}

function themaDetailFunction(){
    var tagN = $('.themaDetailContainer div ol li');
    var tagU = $('.themaDetailContainer>ul');
    var tagL = $('.themaDetailContainer>ul li');
    var marginL = parseInt(tagL.css('margin-bottom'));
    var actvieN = 0;

    var minusH = 0;
    var sumH = 0;

    var themaS = '';
    for(var i=1; i<4; i++){
        themaS = $('.themaDetailContainer div ul li:nth-of-type('+i+') a').attr('href')+'';
        themaS = themaS.replace(/[^0-9]/g,"");
        $('.themaDetailContainer div ul li:nth-of-type('+i+')').css('background-image',"url('images/thumbnail_thema"+themaS+".png')");
    }

    if(window.matchMedia('(min-width:1280px)').matches){
        // * 숫자를 클릭하면 해당 li로 이동 
        $(tagN).click(function(){
            $(tagN).removeClass('active');
            $(this).addClass('active');
    
            actvieN = parseInt($(this).text());
            for(var i=0; i<actvieN-1; i++){
                minusH = minusH + $(tagL[i]).height()+marginL;
            }
    
            $(tagU).animate({scrollTop : 0+minusH},600);
            minusH = 0;
        });
    
        // * wheel 하면 scrollTop 에 따라 숫자의 active 가 변함 
        document.addEventListener('wheel',function(e){
            for(var i=0; i<tagL.length; i++){
                for(var j=0; j<i; j++){
                    sumH = sumH + $(tagL[j]).height()+marginL;
                    console.log("i="+i+'일때 j ='+j+'일때'+sumH);
                }
                if($(tagU).scrollTop() > sumH-300 && $(tagU).scrollTop() < sumH + $(tagL[i]).height()){
                    $(tagN).removeClass('active');
                    $(tagN[i]).addClass('active');
                }
                console.log("i="+i+'일때 합'+sumH);
                console.log('최대값'+(sumH + $(tagL[i]).height()+marginL));
                
                sumH = 0;
            }
        });

        $(tagU).on('touchstart',function(){
            for(var i=0; i<tagL.length; i++){
                for(var j=0; j<i; j++){
                    sumH = sumH + $(tagL[j]).height()+marginL;
                    console.log("i="+i+'일때 j ='+j+'일때'+sumH);
                }
                if($(tagU).scrollTop() > sumH-300 && $(tagU).scrollTop() < sumH + $(tagL[i]).height()){
                    $(tagN).removeClass('active');
                    $(tagN[i]).addClass('active');
                }
                console.log("i="+i+'일때 합'+sumH);
                console.log('최대값'+(sumH + $(tagL[i]).height()+marginL));
                
                sumH = 0;
            }
        });

    }else if(window.matchMedia('(max-width:1279px)').matches){
        $(tagN).click(function(){
            $(tagN).removeClass('active');
            $(this).addClass('active');
    
            actvieN = parseInt($(this).text());
    
            $(tagL).removeClass('active');
            $(tagL[actvieN-1]).addClass('active');
        });
    }

}

function videoDetailFunction(){
    var tagS = $('.videoDetailContainer');
    var tagAR = $('.videoDetailContainer article');
    var tagB = $(".videoDetailContainer input[type='button']");
    var tagH = $('.videoDetailContainer article h2');
    var tagAN = $('.videoDetailContainer article div>a');

    var bookmarkButton = $(tagB);
    var buttonValue = bookmarkButton.attr('value')+"";
    var addH = 0;

    bookmarkButton.click(function(){
        $(tagS).toggleClass('active');
        $(tagAR).toggleClass('active');
        $(this).toggleClass('clicky');
    });

    if(window.matchMedia('(max-width:1279px)').matches){
        if(window.matchMedia('(min-width:768px)').matches){addH = 210;}
        else{addH = 150;}

        var heightContent = $(tagH).height()+$(tagAN).height()+parseInt($(tagAN).css('margin-bottom'))+addH;
        $(tagAR).css('top',window.innerHeight - heightContent);
        
        buttonValue = buttonValue.replace('left','up');
        bookmarkButton.attr('value',buttonValue);
    }
}

var monthOfVideoFile = 12;
const date = new Date();
const todayMonth = date.getMonth();

function videoTimeFunction(){
    var timeData = 0;
    var monthTabBtn = $('.videoContainer ol li');
    var videoContent = document.querySelector('.videoContainer video');
    var videoPop = $('.videoContainer div.pop');
    var timeLabel = 0;

    // cloneTabBtn = monthTabBtn;

    // ? todayMonth 부터 순서대로 data 넣기
    for(var i=0; i<12; i++){
        if((monthOfVideoFile-1)+i < 12){
            $(monthTabBtn[(monthOfVideoFile-1)+i]).attr('data-timeline',i*60);
        }else{
            $(monthTabBtn[(monthOfVideoFile-1)+i-12]).attr('data-timeline',i*60);
        }
    }

    // ? todayMonth 에 active class 넣기
    $(monthTabBtn).removeClass('active');
    $(monthTabBtn[todayMonth]).addClass('active');
    
    if(videoContent != null){
        timeData = parseInt($(monthTabBtn[todayMonth]).attr('data-timeline'));
        videoContent.currentTime = timeData+0.2;

        videoContent.ontimeupdate = function(){
            console.log(videoContent.currentTime);
    
            //  ? 동영상 시간에 따라 monthTabBtn active
            for(var i=0; i<12; i++){
                timeData = parseInt($(monthTabBtn[i]).attr('data-timeline'));
    
                if(timeData<=videoContent.currentTime && videoContent.currentTime <timeData+60){
                    $(monthTabBtn).removeClass('active');
                    $(monthTabBtn[i]).addClass('active');
                }
            }
    
            // ? 동영상 시간에 따라 pop active
            if(parseInt(videoContent.currentTime / 15)<48-(monthOfVideoFile-1)*4){
                timeLabel = parseInt(videoContent.currentTime / 15)+(monthOfVideoFile-1)*4;
            }else{
                timeLabel = parseInt(videoContent.currentTime / 15)+(monthOfVideoFile-1)*4-48;
            }
            $(videoPop).removeClass('active');
            $(videoPop[timeLabel]).addClass('active');
    
            if(parseInt(videoContent.currentTime)==timeLabel*15+14){
                $(videoPop).removeClass('active');
            }
        };
    }
}

function videoControl(){
    var timeData = 0;
    var monthTabBtn = $('.videoContainer ol li');
    var videoPop = $('.videoContainer div.pop');
    var videoContent = document.querySelector('.videoContainer video');
    var playBtn = '';
    var soundBtn = '';
    var playBtnValue = ['pause_circle', 'play_circle'];
    var soundBtnValue = ['brand_awareness' , 'no_sound'];

    if(videoContent != null){
        var contentH = videoContent.offsetHeight;
        var contentT = videoContent.offsetTop;
    }


    // ? li 를 누르면 해당 li 가 active & data-timeline 으로 동영상 시간 이동 
    $(monthTabBtn).click(function(e){
        e.stopPropagation();
        $(videoPop).removeClass('clicky');
        $(monthTabBtn).removeClass('active');
        $(this).addClass('active');
        timeData = parseInt($(this).attr('data-timeline'));
        videoContent.currentTime = timeData+0.2;
    });

    // ? 첫번째 button 소리 켜고 끄기 / 처음 상태는 mute
    $('.videoContainer>div:first-of-type input:first-of-type').click(function(e){
        e.stopPropagation();
        soundBtn = $(this).attr('value');
        if(soundBtn==soundBtnValue[1]){
            videoContent.muted = false;
            $(this).attr('value',soundBtnValue[0]);
        }else{
            videoContent.muted = true;
            $(this).attr('value',soundBtnValue[1]);
        }
    });
    
    // ? 두번째 button 동영상 시작 멈춤 / 처음 상태는 자동재생 (ios)
    $('.videoContainer>div:first-of-type input:last-of-type').click(function(e){
        e.stopPropagation();
        playBtn = $(this).attr('value');
        if(playBtn==playBtnValue[1]){
            videoContent.play();
            $(this).attr('value',playBtnValue[0]);
        }else{
            videoContent.pause();
            $(this).attr('value',playBtnValue[1]);
        }
    });
    
    // ? DESK div circle hover 동영상 시작 멈춤 
    $('.videoContainer>span').mouseover(function(){
        playBtn = $('.videoContainer>div:first-of-type input:last-of-type').attr('value');
        if(playBtn==playBtnValue[0]){
            videoContent.pause();
        }
        $('.videoContainer div').addClass('clicky');
        $('.videoContainer>span').addClass('active');
    });
    $('.videoContainer div.pop').mouseleave(function(){
        if(playBtn==playBtnValue[0]){
            videoContent.play();
        }
        $('.videoContainer div').removeClass('clicky');
        $('.videoContainer>span').removeClass('active');
    });

    
    // ? TAB / MOB 
    if(window.matchMedia('(max-width:1279px)').matches){
        $('.videoContainer>span').click(function(){
            playBtn = $('.videoContainer>div:first-of-type input:last-of-type').attr('value');
            if(playBtn==playBtnValue[0]){
                videoContent.pause();
            }
            $('.videoContainer div').addClass('clicky');
            $('.videoContainer>span').addClass('active');
        });
        $('.videoContainer div>input[type="button"]').click(function(e){
            playBtn = $('.videoContainer>div:first-of-type input:last-of-type').attr('value');
            if(playBtn==playBtnValue[0]){
                videoContent.play();
            }
            e.stopPropagation();
            $('.videoContainer div').removeClass('clicky');
            $('.videoContainer>span').removeClass('active');
        });

        $('.videoContainer div.pop').css('top',contentT+contentH/2);
        $('.videoContainer>span').css('top',contentT+contentH/2);
    }

    // ? left & right 구분해서 15초 이동하기
    $(videoContent).click(function(e){
        var timeLabel = 0;
        var moveTime = 0;

        timeLabel = parseInt(videoContent.currentTime / 15)*15;

        if(window.innerWidth/2>e.pageX && !videoContent.paused){
            if(timeLabel == 0){
                moveTime = 705.2;
            }else{
                moveTime = -14.8;
            }
        }else if(!videoContent.paused){
            if(timeLabel == 705){
                moveTime = -705;
            }else{
                moveTime = 15.2;
            }
        }else{
            return false
        }
        videoContent.currentTime = timeLabel + moveTime;
        $(videoPop).removeClass('active');
        $('.videoContainer div').removeClass('clicky');
    });
}

function themaSlider(){
    var themaSlide = $('.themaSlider li');

    var mainSlider = $('.themaSlider').bxSlider({
        speed: 1000,
        pager: true,
        prevSelector: '.prev',
        nextSelector: '.next',
        nextText:'keyboard_double_arrow_right',
        prevText: 'keyboard_double_arrow_left',
        infiniteLoop: true,
        onSlideBefore: function ($slideElement, oldIndex, newIndex){
            var current_index = parseInt(newIndex + 1);
            $('.currentPage').text('0' + current_index);
        
            $('.themaContainer .titleBox h2').text($(themaSlide[newIndex]).children('div').children('span').text());
            $('.themaContainer .titleBox p').text($(themaSlide[newIndex]).children('div').children('p').text());
            $('.themaContainer .titleBox a').attr('href',$(themaSlide[newIndex]).attr('data-href'));
            $('.bx-pager.bx-default-pager').removeClass('page0'+(oldIndex+1));
            $('.bx-pager.bx-default-pager').addClass('page0'+(newIndex+1));
        }
    });
}

var currentBoxNumb = 0;
var activeNumb = 1;
var beforeClass = '';

function archiveFunction(){
    var tagM = $('.archiveContainer ol:last-of-type>li');
    
    if(window.matchMedia('(min-width:1280px)').matches){
        for(var i=0; i<tagM.length; i++){
            if(i>8){
                $(tagM[i]).css('background-image','url("images/archive'+(i+1)+'.jpg")');
            }else{
                $(tagM[i]).css('background-image','url("images/archive0'+(i+1)+'.jpg")');
            }
        }
        deskArchive();
    }else{
        tabArchive();
    }
    
    window.matchMedia("(min-width:1280px)").onchange = (e) => {
        if(e.matches){
            for(var i=0; i<tagM.length; i++){
                if(i>8){
                    $(tagM[i]).css('background-image','url("images/archive'+(i+1)+'.jpg")');
                }else{
                    $(tagM[i]).css('background-image','url("images/archive0'+(i+1)+'.jpg")');
                }
            }
        }else{
            $(tagM).css('background-image','none');
        }
    }
}

function deskArchive(){
    var oldI = 0;
    var newI = 0;
    var currentL = 0;

    var tagM = $('.archiveContainer ol:last-of-type>li');
    $('.archiveContainer ol.fiR30').click(function(){
        $(this).toggleClass('clicky');
    });

    $('.archiveContainer ol.fiR30 li').click(function(e){
        e.stopPropagation();
        $(this).parent('ol').toggleClass('clicky');
        oldI = $('.archiveContainer ol.fiR30 li.active').index();
        newI = $(this).index();
        
        $('.archiveContainer ol.fiR30 li').removeClass('active');
        $(this).addClass('active');

        currentL = $('.archiveContainer ol:last-of-type').scrollLeft();
        $('.archiveContainer ol:last-of-type').scrollLeft($(tagM).width()*newI);
    });
}

function tabArchive(){
    var archiveButton = $('.archiveContainer ol.fiR30 li');

    $(archiveButton).on('touchstart click',function(e){
        $(archiveButton).removeClass('active');
        $(this).addClass('active');
        
        archiveButtonIndex = $(this).index();
        currentBoxNumb = 4*archiveButtonIndex;
        activeNumb = (currentBoxNumb/4)+1;

        return moveArchive(currentBoxNumb, activeNumb), archiveBG(activeNumb);
    }); 

    var beforeX = 0;
    
    document.addEventListener('touchstart',function(e){
        console.log(e.target + 'target');
        console.log(e.currenttarget+'current');
        beforeX = e.touches[0].pageX;
        return beforeX;
    });

    document.addEventListener('touchend',function(e){
        afterX = e.changedTouches[0].pageX;
        
        moveWidth = beforeX - afterX;

        if(moveWidth>30){
            if(currentBoxNumb == 47){
                return false;
            }else{
                currentBoxNumb++;
            }
            if(currentBoxNumb%4 == 0){
                activeNumb = (currentBoxNumb/4)+1;
                $(archiveButton).removeClass('active');
                $('.archiveContainer ol.fiR30 li:nth-of-type('+activeNumb+')').addClass('active');
            }
        }else if(moveWidth<-30){
            if(currentBoxNumb == 0){
                return false;
            }else{
                currentBoxNumb--;
            }
            if(currentBoxNumb%4 == 3){
                activeNumb = (currentBoxNumb/4)+0.25;
                $(archiveButton).removeClass('active');
                $('.archiveContainer ol.fiR30 li:nth-of-type('+activeNumb+')').addClass('active');
            }
        }
        return moveArchive(currentBoxNumb, activeNumb), archiveBG(activeNumb);
    });
}

function moveArchive(){
    var archiveSlider = $('.archiveContainer ol:last-of-type');
    var archiveBox = $('.archiveContainer ol:last-of-type li:first-of-type ul li:first-of-type');
    var archiveBoxWidth = archiveBox.width();
    var archiveBoxPadding = parseInt(archiveBox.css('margin-left'));

    currentScrollLeft = $(archiveSlider).scrollLeft();
    $(archiveSlider).scrollLeft((archiveBoxWidth + archiveBoxPadding)*currentBoxNumb);
    
    $('.archiveContainer').removeClass(beforeClass);
    $('.archiveContainer').addClass('test'+activeNumb);

    beforeClass =  'test'+activeNumb;
}

function archiveBG(){
    var positionData = '';
    var addData = '';

    for(var i=1; i<13; i++){
        if(i==12){
            addData = (i-activeNumb)*100+'vw top';
        }else{
            addData = (i-activeNumb)*100+'vw top,';
        }
        positionData = positionData + addData;
    }

    $('.archiveContainer').css('background-position',positionData);
}