//滑動離開頂部時就取消at_top的class
// 修改explore和導覽列
$(window).scroll(function(e){
  //沒有滑動時加上   
  if ($(window).scrollTop()<=0)
    $(".explore,.navbar").addClass("at_top");
  //滑動時刪除   
  else
    $(".explore,.navbar").removeClass("at_top");
});

//緩慢滑動
$(document).on('click', 'a', function(event){
  //不執行預設動作     
  event.preventDefault();
  var target=$(this).attr('href');
  console.log(target);
    $('html, body').animate({
        //抓到目標後偏移上下左右的距離         
        scrollTop: $(target).offset().top
    }, 500);
});

// 當滑鼠移動時產生動作
$(window).mousemove(function(evt){
  //抓滑鼠x y的位置   
  var pagex=evt.pageX;
  var pagey=evt.pageY;
  
  $(".mountain").css("transform","translateX("+(pagex/-20+50)+"px)")
  
  //滑鼠的距離與about頁面   
  var x=pagex-$("#section_about").offset().left;
  var y=pagey-$("#section_about").offset().top;
  
  //about左上角為0   
  console.log(x+","+y)
  
  // 如果小於或大於section的y座標就隱藏  
  if (y<0 || y>$("#section_about").outerHeight())
    $("#cross").css("opacity",0);
  else
    $("#cross").css("opacity",1);
  
  $("#cross").css("left",x+"px");
  $("#cross").css("top",y+"px");
  // 偵測貓的位置
  var catplace=$("#cat").offset().left+$("#cat").width()/2;
  //貓的上方   
  var cattop=$("#cat").offset().top;
  //網址前綴   
  var img_url="https://awiclass.monoame.com/catpic/";
  
  if (pagex<catplace-50)
    $("#cat").attr("src",img_url+"cat_left.png")
  else if (pagex>catplace+50)
    $("#cat").attr("src",img_url+"cat_right.png")
  else
    $("#cat").attr("src",img_url+"cat_top.png")
  
  if (pagex<catplace-50 && pagey<cattop)
    $("#cat").attr("src",img_url+"cat_lefttop.png")
  if (pagex>catplace+50 && pagey<cattop)
    $("#cat").attr("src",img_url+"cat_righttop.png")
// 旋轉喵喵

// 三隻喵喵
 //偵測進入貓咪範圍就站起來
function detect_cat(cat_id,x){
  var catplace = $(cat_id).offset().left+$(cat_id).width()/2;
  if (Math.abs(x-catplace)<80)
    $(cat_id).css("bottom","0px");
  else
    $(cat_id).css("bottom","-50px");
} 
  
  detect_cat("#cat_yellow",pagex);
  detect_cat("#cat_blue",pagex);
  detect_cat("#cat_grey",pagex);
// -三隻喵喵
  
  
  
// about  
//文字 
  $(".r1text").css("transform","translateX("+(y/-5)+"px)")
  $(".r1text_job").css("transform","translateX("+(y/-10)+"px)")
  $(".r2text").css("transform","translateX("+(y/-15)+"px)")
  $(".r3text").css("transform","translateX("+(y/-15)+"px)")
  
  //三角形-5 -10 -12 移動越來越慢   
  $(".tri1").css("transform","translateX("+(x/-5)+"px)")
  $(".tri2").css("transform","translateX("+(x/-10)+"px)")
  $(".tri3").css("transform","translateX("+(x/-12)+"px)")
  $(".tri4").css("transform","translateX("+(x/-14)+"px)")
  $(".tri5").css("transform","translateX("+(x/-16)+"px)")
 
  
});



//vue監看物件，用vue 2.0以上版本
var vm = new Vue({
  el: "#app",
  data: {
    works: []
  },
  mounted: function(){
    var vobj=this;
    $.ajax({
      type: "get",
      url: "./workapi.txt",
      success: function(res){
        vobj.works=JSON.parse(res);
      }
    });
  }
  
});