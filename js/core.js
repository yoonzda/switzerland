$(document).ready(function(){
    matchAction();

    themaDetailFunction();
    videoDetailFunction();
    detailBG('.videoDetailContainer div h2','detailBG','.videoDetailContainer','.png');

    videoFunction();
    themaSlider();
    
    archiveFunction();
    archiveBG();

    snsIconBG();
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
    $('.cityContainer>div').css('top',window.innerHeight - $('.cityContainer div.titleBox').height()-180);

    window.addEventListener('wheel', function(e){
        if(e.deltaY>0){
            $('.cityContainer>div').addClass('active');
        }
    });

    $('.cityContainer').on('touchend', function(e){
        $('.cityContainer>div').addClass('active');
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
                }
                if($(tagU).scrollTop() > sumH-300 && $(tagU).scrollTop() < sumH + $(tagL[i]).height()){
                    $(tagN).removeClass('active');
                    $(tagN[i]).addClass('active');
                }
                
                sumH = 0;
            }
        });

        $(tagU).on('touchstart',function(){
            for(var i=0; i<tagL.length; i++){
                for(var j=0; j<i; j++){
                    sumH = sumH + $(tagL[j]).height()+marginL;
                }
                if($(tagU).scrollTop() > sumH-300 && $(tagU).scrollTop() < sumH + $(tagL[i]).height()){
                    $(tagN).removeClass('active');
                    $(tagN[i]).addClass('active');
                }
                
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

var activeMonth = todayMonth;
var timeLabel = 1;

function videoFunction(){
    var videoContent = document.querySelector('.videoContainer video');
    var btnMonth = $('.videoContainer>ol li');
    var playBtn = '';
    var soundBtn = '';
    var playBtnValue = ['pause_circle', 'play_circle'];
    var soundBtnValue = ['brand_awareness' , 'no_sound'];
    var videoPop = $('.videoContainer div.pop');

    var testNumb = 0;
    var testLabel = 0;
    
    $(btnMonth[activeMonth]).addClass('active');
    videoFileChange(activeMonth);

    if(videoContent != null){
        videoContent.ontimeupdate = function(){
            if(videoContent.currentTime==videoContent.duration){
                activeMonth+=1;
                videoFileChange(activeMonth);
            }

            testNumb = activeMonth*4;
            testLabel = parseInt(videoContent.currentTime / 15);
    
            $(videoPop).removeClass('active');
            $(videoPop[testNumb+testLabel]).addClass('active');
    
            if(parseInt(videoContent.currentTime)==testLabel*15+14){
                $(videoPop).removeClass('active');
            }
        };
    }

    $(btnMonth).click(function(){
        $(btnMonth).removeClass('active');
        $(this).addClass('active');
        
        activeMonth = $(this).index();

        videoFileChange(activeMonth);
    });

    $(videoContent).click(function(e){
        timeLabel = parseInt(videoContent.currentTime / 15)*15;

        if(window.innerWidth/2>e.pageX && !videoContent.paused){
            if(timeLabel==0){
                switch(activeMonth){
                    case 0:
                        activeMonth=11;
                        break;
                    default:
                        activeMonth-=1;
                        break;
                }
                videoFileChange(activeMonth);
                return false;
            }else{
                moveTime = -14.8;
            }
        }else if(!videoContent.paused){
            moveTime = 15.2;
        }else{
            return false
        }
        videoContent.currentTime = timeLabel + moveTime;
    });

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
    
    if(videoContent != null){
        var contentH = videoContent.offsetHeight;
        var contentT = videoContent.offsetTop;
    }
    
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
}

function videoFileChange(){
    var videoFileName = '';
    var videoContent = document.querySelector('.videoContainer video');
    var btnMonth = $('.videoContainer>ol li');
    var monthArray = [];

    for(var i=0; i<12; i++){
        monthArray[i] = $(btnMonth[i]).text();
    }
    
    if(activeMonth==12){
        activeMonth=0;
    }

    $(btnMonth).removeClass('active');
    $(btnMonth[activeMonth]).addClass('active');

    videoFileName = 'mp4/video_'+monthArray[activeMonth]+'.mp4';
    $(videoContent).attr('src',videoFileName);
    
    if(timeLabel==0){
        videoContent.currentTime = 45.2;
    }
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
var toggeStauts = true;

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
        if(toggeStauts==true){
            $(this).removeClass('clicky');
            toggeStauts = !toggeStauts;
        }else{
            $(this).addClass('clicky');
            toggeStauts = !toggeStauts;
        }
    });

    $('.archiveContainer ol.fiR30 li').click(function(e){
        e.stopPropagation();
        if(toggeStauts==true){
            $(this).parent('ol').removeClass('clicky');
            toggeStauts = !toggeStauts;
        }else{
            $(this).parent('ol').addClass('clicky');
            toggeStauts = !toggeStauts;
        }
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

    var totalImage = '';
    var addImage = '';

    for(var i=1; i<13; i++){
        if(i==12){
            addData = (i-activeNumb)*100+'vw top';
            addImage = 'url("images/archive'+i+'_tab.png")';
        }else{
            addData = (i-activeNumb)*100+'vw top,';
            addImage = 'url("images/archive'+i+'_tab.png"),';
        }
        positionData = positionData + addData;
        totalImage = totalImage + addImage;
    }

    $('.archiveContainer').css('background-position',positionData);
    $('.archiveContainer').css('background-image',totalImage);
}

function snsIconBG(){
    var className = $('footer').attr('class');
    var snsIcon = $('footer ul li a');
    var snsName = '';
    var imageName = '';

    for(var i=0; i<snsIcon.length; i++){
        snsName = $(snsIcon[i]).text();
        if(className == 'modeWhite'){
            imageName = 'url("images/icon_sns_'+snsName+'_W.png")';
        }else{
            imageName = 'url("images/icon_sns_'+snsName+'.png")';
        }
        $(snsIcon[i]).css('background-image',imageName);
    }
}