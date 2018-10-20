var fixed_nav = (function () {
    return {
        init: function (options) {
            // 没有锚点目标，无法实现，直接返回
            if (!options.ele) return;
            this.options = options;
            this.speed = options.speed || "";
            this.$navWrap = $(`<div class="fixed_nav_wrap"></div>`);
            this.$nav = $(`<ul class="fixed_nav"></ul>`);
            this.createList($(options.ele), options.texts);
            this.event();
        },
        event: function () {
            var _this = this;
            // 点击对应的锚点滚动到对应的坐标位置
            this.$nav.on("click", "li", function () {
                $(this).addClass("tar_show").siblings().removeClass("tar_show");
                var index = this.getAttribute("attr-index");
                $(document.documentElement).stop();
                $(document.documentElement).animate({"scrollTop":_this.pos[index]},_this.speed);
            });
            $(window).on("scroll",function(){
                if(document.documentElement.scrollTop>_this.pos[0] - 300){
                    _this.$navWrap.show();
                }else{
                    _this.$navWrap.hide();
                }
            });
        },
        createList: function (ele, texts) {
            // 如果没有传列表内容，就默认用text
            if (!texts) {
                texts = [];
                for (var i = 0; i < ele.length; i++) {
                    texts.push("text" + i);
                }
            }
            // 储存锚点坐标
            this.pos = [];
            for (var i = 0; i < ele.length; i++) {
                var $li = $(`<li attr-index=${i}>${texts[i] || "text" + i}</li>`);
                this.$nav.append($li);
                this.pos.push(this.getScrollTop(ele[i]));
            }
            this.$nav.css("width",i * 80 + "px");
            this.$navWrap.append(this.$nav);
            $("body").append(this.$navWrap);
            console.log(this.pos)
        },
        // 获取锚点目标距离顶部的位置
        getScrollTop: function (tar) {
            var h = 0;
            while(tar.offsetParent){
                h += tar.offsetTop;
                tar = tar.offsetParent;
            }
            return h;
        }
    }
}());
