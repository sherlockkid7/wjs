$(function(){
    /*初始化工具提示*/
    $('[data-toggle="tooltip"]').tooltip();
    // 提示状态一直显示
    // $('.tooltip-show').tooltip('show');
    /*获取当前所有item*/
    var bannerItems= $('.carousel-inner .carousel-item');
    /*监听屏幕的大小改变*/
    $(window).on('resize',function(){
        /*1.获取当前屏幕的宽度*/
        var width = $(window).width();
        /*2.判断屏幕的宽度*/
        if(width >= 768){/*说明非移动端*/
            /*为每一个item添加子元素--遍历*/
            $(bannerItems).each(function(){  
                var item=$(this);
                /*当前自定义属性中 存储的图片路径*/
                var imgSrc=item.data("largeImage");
                /*添加非移动端的子元素*/
                item.html($('<a href="javascript:;" class="pcImg"></a>').css("backgroundImage","url('"+imgSrc+"')"))
            });
        }else{
            $(bannerItems).each(function(){
                var item=$(this);
                var imgSrc=item.data("smallImage");
                item.html($('<a href="javascript:;" class="phoneImg"><img class="d-block w-100" src="'+imgSrc+'" alt="..."></a>'))
            });
        }
    }).trigger('resize');
    // trigger 定义事件的时候，立刻触发一次

    /*添加移动端的滑动操作*/
    var startX,endX;
    var carousel =$('.carousel');
    var banner_box=$('.carousel-inner')[0];
    /*为banner_box添加触摸事件--触摸开始*/
    banner_box.addEventListener("touchstart",function(e){
        /*获取当前手指的起始位置*/
        startX=e.targetTouches[0].clientX;
    });
    banner_box.addEventListener("touchend",function(e){
        /*获取当前手指的结束位置*/
        endX=e.changedTouches[0].clientX;
        if(endX-startX>0){
            // 上一张
            carousel.carousel('prev');//bootstarp定义的方法
        }else if(endX-startX<0){
            // 下一张
            carousel.carousel('next');
        }
    });
    
    // 计算产品栏导航项原始宽度
    var ulBox = $('.wjs_product .nav-tabs');
    var list = ulBox.find('li');
    var totalWidth = 0;//总宽度
    list.each(function(index,value){
        totalWidth = totalWidth + $(value).innerWidth();
        /*获取宽度的方法的说明：
        * width():它只能得到当前元素的内容的宽度
        * innerWidth():它能获取当前元素的内容的宽度+padding
        * outerWidth():获取当前元素的内容的宽度+padding+border
        * outerWidth(true):获取元素的内容的宽度+padding+border+margin*/
        
    });
    ulBox.width(totalWidth);
    /*使用插件实现导航条的滑动操作*/
    var myScroll = new IScroll('.tab_box',{
        /*设置水平滑动，不允许垂直滑动*/
        scrollX: true, scrollY: false
    });
    var navli = $(".mr-auto li"),
        navliLength=navli.length,
        index = 0;
   function changeStyel(){
        $(".mr-auto li").siblings().removeClass("active");
        navli[index].className="nav-item active";
   }
       
    for(var i = 0; i < navliLength ;i++){
        (function(j){
            navli[j].onclick=function(){
                index = j;
                changeStyel();
            }
        })(i);    
    }
    
    var  tabsli = $("#nav-tabs li"),
         tabsliLength = tabsli.length;
        function changeTabsli(){
            $("#nav-tabs li").siblings().removeClass("active");
            tabsli[index].className="active";
       }
    for(var i = 0; i < tabsliLength ;i++){
            (function(j){
                tabsli[j].onclick=function(){
                    index = j;
                    changeTabsli();
                }
            })(i);    
        }
    var  newsli = $("#news-tabs li"),
        newsliLength = newsli.length;
       function changeNewsli(){
           $("#news-tabs li").siblings().removeClass("active");
           newsli[index].className="active";
      }
   for(var i = 0; i < newsliLength ;i++){
           (function(j){
               newsli[j].onclick=function(){
                   index = j;
                   changeNewsli();
               }
           })(i);    
       }
})