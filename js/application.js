var users = [
    {
        "name":"赵大"
    },
    {
        "name":"钱二"
    },
    {
        "name":"张三"
    },
    {
        "name":"李四"
    },
    {
        "name":"王五"
    },
    {
        "name":"刘六"
    }
];

var restaurants = [
    {
        "name": "KFC"
    },
    {
        "name": "7-11"
    },
    {
        "name": "成都小吃"
    }
];

var foods = {
  "KFC":[
      {
          "name":"田园脆鸡堡",
          "price":10.00
      },
      {
          "name":"黄金咖喱猪扒饭",
          "price":23.50
      },
      {
          "name":"意式肉酱肉丸饭",
          "price":16.00
      },
      {
          "name":"老北京鸡肉卷",
          "price":14.00
      },
      {
          "name":"劲脆鸡腿堡",
          "price":15.00
      }
  ],
  "7-11":[
      {
          "name":"全素",
          "price":9.00
      },
      {
          "name":"半素半荤",
          "price":11.50
      },
      {
          "name":"全荤",
          "price":13.00
      }
  ],
  "成都小吃":[
      {
          "name":"西红柿鸡蛋盖饭",
          "price":10.00
      },
      {
          "name":"木须肉盖饭",
          "price":10.00
      },
      {
          "name":"尖椒肉丝盖饭",
          "price":12.00
      },
      {
          "name":"京酱肉丝盖饭",
          "price":12.00
      },
      {
          "name":"地三鲜盖饭",
          "price":9.00
      }
  ]
};

   

$(function()　{

   var hitusers=[];
   var hitrestuarent=[];
   var hitpackage=[];
   var hitprice=[];
 
$('#chosePerson').on( "pagecreate", function( event ) { 
    var htmlStr="";
  for(var i=0;i<users.length;i++){
	  htmlStr+= "<li><a class='chosepersions'>"+users[i].name+"</a></li>";	
	}
	 document.getElementById("personlist").innerHTML=htmlStr; 
     
     $(".chosepersions").click(function(){
        var newuser=$(this).text();
        hitusers.push(newuser);
        document.getElementById("persion").value=newuser;
       $('.ui-dialog').dialog('close');  
        });
     });     
 
   
      
     $('#choseRestuarent').on( "pagecreate", function( event ) { 
    var htmlres="";
	for(var i=0;i< restaurants.length;i++){
	  htmlres+= "<li><a class='choserestaurants'>"+restaurants[i].name+"</a></li>";	
	}
	  document.getElementById("reslist").innerHTML=htmlres; 
       
     var  newrest="";
      $(".choserestaurants").click(function(){
       newrest=$(this).text();
        hitrestuarent.push(newrest);
         document.getElementById("restaurent").value=newrest;
          $('.ui-dialog').dialog('close');  
       
        var htmlpes="";   
	    for(var i=0;i<foods[newrest].length;i++){
	       htmlpes+= "<li><a class='chosepackage'>"+foods[newrest][i].name+"<p class='ui-li-aside'>￥"+foods[newrest][i].price+"</p></a></li>";	
	     }
	       document.getElementById("packagelist").innerHTML=htmlpes;
         $("#packagelist").listview("refresh"); 
        });        
     }) ;
     
   $('#chosePackage').on( "pagecreate", function( event ) {
	   $(".chosepackage").click(function(){
         var newpack=$(this).text();
         var price=newpack.match(/\d+\.?\d+/ig);
         var name=(newpack.substring(1)).match(/[^\d\.]+/g);
         hitpackage.push(name);
         hitprice.push(price);
         document.getElementById("package").value=name;
          $('.ui-dialog').dialog('close');  
        });
     });

   $("#submit").click(function(){
     document.getElementById("package").value="";
      document.getElementById("persion").value="";
   });

     $('#order').on( "pagecreate", function( event ) {
        var htmlorder="";
        var nonorder=[];
        htmlorder+="<li data-role=list-divider>"+hitusers.length+"人已定</li>";
        
       for(var i=0;i<hitusers.length;i++){
       var color;
       if(parseFloat(hitprice[i])>12) color="RED";
       htmlorder+="<li>"+hitusers[i]+"<p>"+hitrestuarent[i]+" "+hitpackage[i]+"</p><p class='ui-li-aside'><font color="+color+">￥"+hitprice[i]+"</font></p></li>";	       
       }

       for(var j=0;j<users.length;j++){
       var index=0;
        for(var i=0;i<hitusers.length;i++){
           if(users[j].name!=hitusers[i]) index+=1;       
          }
          if(index==hitusers.length){
           nonorder.push(users[j].name);
           }
          }
       var number=6-hitusers.length;
       htmlorder+="<li data-role=list-divider>"+number+"人未定</li>";
       for(var i=0;i<nonorder.length;i++){
         htmlorder+="<li>"+nonorder[i]+"</li>";
       }
       document.getElementById("readyorder").innerHTML=htmlorder;
       var totalprice=0;
       for(var i=0;i<hitprice.length;i++)  totalprice+=parseFloat(hitprice[i]);
       var htmlfooter="<p>"+hitusers.length+"人已定，"+number+"人未定，总计"+totalprice+"元</p>";
        document.getElementById("total").innerHTML=htmlfooter;
     });
      
  }); 
