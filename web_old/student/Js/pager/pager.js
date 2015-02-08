/**
 * JS分页
 * 
 * author：TonyJiang
 * 
 */
(function(){
    window.Pager = function(){
    
        var _this = this;
        
        this.linkMax = 5;
		
		this.label = {
			'firstPage' : '',
			'prevPage' : '',
			'nextPage' : '',
			'lastPage' : ''
		},
        
        this.style = {
            'default': '/js/pager/default.css'
        };
        
        
        this.paramName = 'offset';
        this.changeListener = false;
        
        //设置参数名称
        this.setParamName = function(name){
            this.paramName = name;
        };
        
        //获取分页个数
        this.getPageCount = function(){
            return Math.ceil(this.totalCount / this.step);
        }
        
        this.getPrevOffset = function(){
            var prevOffset = this.offset - this.step;
            return prevOffset >= 0 ? prevOffset : false;
        }
        
        this.getNextOffset = function(){
            var nextOffset = this.offset + this.step;
            return nextOffset < this.totalCount ? nextOffset : false;
        }
        
        this.getFirstOffset = function(){
            return 0;
        }
        
        this.getLastOffset = function(){
            return (this.getPageCount() - 1) * this.step;
        }
        
        this.getOffsetList = function(){
            var offsetList = [];
            var currentOffset = 0;
            for (var i = 0; i < this.getPageCount(); i++) {
                offsetList.push(currentOffset);
                currentOffset = currentOffset + this.step;
            }
            return offsetList;
        }
        
        
        this.showHTML = function(totalCount, offset, step , linkMax){
            this.totalCount = totalCount;
            this.offset = offset;
            this.step = step;
			this.linkMax = linkMax;
            
            var startPage = this.getFirstOffset();
            var prevPage = this.getPrevOffset();
            var pageList = this.getOffsetList();
            var nextPage = this.getNextOffset();
            var endPage = this.getLastOffset();
             
            var html = '<div class="pager_container paginator">';
            html += '<span class="page_item_first">';
            
            html += '<a class="pager_first tn-page-prev tn-page-thumb" href="javascript:void(0);" offset=' + startPage + ' >' + this.label.firstPage + '</a>&nbsp;';
            html += '<a class="pager_prev tn-page-prev tn-page-thumb" href="javascript:void(0);" offset=' + prevPage + ' >' + this.label.prevPage + '</a>';
            
            html += '</span>';
            
            html += '<span class="page_item_T">';
            
            var currentPage = parseInt(this.offset / this.step);
            var pageCount = this.getPageCount();
            
            var firstLink = currentPage > this.linkMax ? currentPage - this.linkMax : 0;
            var lastLink = currentPage + this.linkMax + 1 < pageCount ? currentPage + this.linkMax + 1 : pageCount;
            
            if (firstLink > 0) {
                html += '<a class="tn-page-number" href="javascript:void(0);" offset=' + pageList[0] + ' >' + (0 + 1) + '</a>';
                if (firstLink > 1) {
                    html += '<a>...</a>';
                }
            }
            
            if (pageCount > 1) {
                for (var link = firstLink; link < lastLink; link++) {
					
                    if (currentPage == link) {
						var flagsT = $('.pager_page[offset='+(pageList[link])+']').attr("flags");
                        html += '<a class="pager_current" " href="javascript:void(0);" offset=' + pageList[link] + ' flags='+flagsT+'><span class="tn-page-number tn-selected">' + (link + 1) + '</span></a>';
                    }
                    else {
                        html += '<a class="pager_page tn-page-number" href="javascript:void(0);" offset=' + pageList[link] + ' >' + (link + 1) + '</a>';
                    }
                }
            }
            
            if (lastLink < pageCount) {
                if (lastLink + 1 < pageCount) {
                    html += '<a>...</a>';
                }
                html += '<a class="pager_page tn-page-number"  href="javascript:void(0);" offset=' + pageList[pageCount - 1] + ' >' + (pageCount) + '</a>';
            }
            html += '</span>';
            
            html += '<span class="">';
            
            html += '<a class="pager_next tn-page-thumb tn-page-next" href="javascript:void(0);" offset=' + nextPage + ' >' + this.label.nextPage + '</a>&nbsp;';
            html += '<a class="pager_last tn-page-thumb tn-page-next" href="javascript:void(0);" offset=' + endPage + '  >' + this.label.lastPage + '</a>';
            
            html += '</span><span class="cleard"></span>';
            html += '</div>';
            
            return html;
            
        };
        
        this.addStyle = function(type , src){
			if(src){
				$('head').append('<link type="text/css" href="' + src + '" rel="stylesheet" />');
			}else{
	            type = type ? type : 'default';
	            $('head').append('<link type="text/css" href="' + this.style[type] + '" rel="stylesheet" />');
			}
        }
        
        this.bindEvent = function(){
            $('.pager_container .pager_first').click(function(){
                if (_this.offset > $(this).attr('offset')) {
                    $('.pager_container').replaceWith(_this.showHTML(_this.totalCount, 0, _this.step));
                    _this.bindEvent();
                    try {
                        _this.changeListener(_this.offset, _this.step);
                    } 
                    catch (e) {
                    }
                }
            });
            
            $('.pager_container .pager_prev').click(function(){
                if ($(this).attr('offset') != 'false') {
                    $('.pager_container').replaceWith(_this.showHTML(_this.totalCount, _this.offset - _this.step, _this.step));
                    _this.bindEvent();
                    try {
                        _this.changeListener(_this.offset, _this.step);
                    } 
                    catch (e) {
                    }
                }
            });
            
            $('.pager_container .pager_next').click(function(){
				
                if ($(this).attr('offset') != 'false') {
					
                    $('.pager_container').replaceWith(_this.showHTML(_this.totalCount, _this.offset + _this.step, _this.step));
                    _this.bindEvent();
                    try {
                        _this.changeListener(_this.offset, _this.step);
                    } 
                    catch (e) {
                    }
                }
            });
            
            $('.pager_container .pager_last').click(function(){
                if (_this.offset < $(this).attr('offset')) {
                    $('.pager_container').replaceWith(_this.showHTML(_this.totalCount, parseInt($(this).attr('offset')), _this.step));
                    _this.bindEvent();
                    try {
                        _this.changeListener(_this.offset, _this.step);
                    } 
                    catch (e) {
                    }
                }
            });
            
            $('.pager_container .pager_page').click(function(){
				//alert(_this.offset+'---'+$(this).attr('offset'));
                if (_this.offset != $(this).attr('offset')) {
                    $('.pager_container').replaceWith(_this.showHTML(_this.totalCount, parseInt($(this).attr('offset')), _this.step));
                    _this.bindEvent();
                    try {
                        _this.changeListener(_this.offset, _this.step);
                    } 
                    catch (e) {
                    }
                }
            });
        };
        
        this.change = function(func){
            this.changeListener = func;
        }
        
    };
})();