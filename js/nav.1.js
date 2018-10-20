//  function fixed(ele){
//      var $nav = document.createElement("ul");
//      $nav.className = "fixed_nav";
//      var pos = [];
//      for(var i = 0; i < ele.length; i++){
//          var $li = document.createElement("li");
//          $li.innerText = "文章列表" + i;
//          $li.setAttribute("attr-index",i);
//          $nav.appendChild($li);
//          pos.push(ele[i].offsetTop);
//      }
//      document.body.appendChild($nav);
//      $nav.onclick = function(e){
//          e = e || window.event;
//          var target = e.target || e.srcElement;
//          if(target.nodeName === "LI"){
//              var index = target.getAttribute("attr-index");
//             console.log(target.getAttribute("index"),pos[target.getAttribute("index")])
//             document.documentElement.scrollTop = pos[index];
//         }
//      }
//  }
 var fixed_nav = (function(){
     return {
         init:function(ele){
            this.$nav = document.createElement("ul");
            this.$nav.className = "fixed_nav";
            this.createList(ele);
            this.event();
         },
         event:function(){
            var _this = this;
            this.$nav.onclick = function(e){
                e = e || window.event;
                var target = e.target || e.srcElement;
                if(target.nodeName === "LI"){
                    var index = target.getAttribute("attr-index");
                   document.documentElement.scrollTop = _this.pos[index];
               }
            }
         },
         createList:function(ele){
            this.pos = [];
            for(var i = 0; i < ele.length; i++){
                var $li = document.createElement("li");
                $li.innerText = "文章列表" + (i + 1);
                $li.setAttribute("attr-index",i);
                this.$nav.appendChild($li);
                this.pos.push(ele[i].offsetTop);
            }
            document.body.appendChild(this.$nav);
         }
     }
 }());
 var $p = document.querySelectorAll("p");
//  fixed($p);
fixed_nav.init($p)