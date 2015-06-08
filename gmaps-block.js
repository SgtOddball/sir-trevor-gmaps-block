SirTrevor.Blocks.Iframe = (function() {

	return SirTrevor.Block.extend({

        type : 'iframe',

		icon_name : 'iframe',

		title : function() {
			return "Iframe";
		},

		toolbarEnabled : true,

		droppable : false,

		pastable : true,

		paste_options : {
			html : '<input type="text" placeholder="<iframe>" class="st-block__paste-input st-paste-block">'
		},

		onContentPasted : function(event) {
			this.loading();

			obj = {};

			val = $(event.target).val();

            iframeObj = $.parseHTML(val);
            
            $.each(iframeObj, function(i, el)
            {
                if(el.nodeName=='IFRAME')
                {
                    if(el.attributes.src.value){
                        obj.src = el.attributes.src.value
                        if(el.attributes.width)
                        {
                            obj.width = el.attributes.width.value
                        }
                        if(el.attributes.height)
                        {
                            obj.height = el.attributes.height.value
                        }
                        if(el.attributes.style)
                        {
                            obj.style = el.attributes.style.value
                        }
                        if(el.attributes.sandbox)
                        {
                            obj.sandbox = el.attributes.sandbox.value
                        }
                        if(el.attributes.seamless)
                        {
                            obj.seamless = el.attributes.seamless
                        }
                        if(el.attributes.lang)
                        {
                            obj.lang = el.attributes.lang.value
                        }
                        if(el.attributes.title)
                        {
                            obj.title = el.attributes.title.value
                        }
                        if(el.attributes.frameborder)
                        {
                            obj.frameborder = el.attributes.frameborder.value
                        }
                    }
                }
			});

            if(obj)
            {
                this.setAndLoadData(obj);
            }
		},

		uploadable : false,

		formattable : false,

		loadData : function(data) {
			data.width = (typeof data.width == undefined || !data.width) ? '100%' : data.width;
			data.height = (typeof data.height == undefined || !data.height) ? '100%' : data.height;
            data.style = (typeof data.style == undefined || !data.style) ? '' : data.style;
            data.frameborder = (typeof data.frameborder == undefined || !data.frameborder) ? '0' : data.frameborder;
            
			this.$inner.prepend(
				$('<iframe>')
					.attr('src', data.src)
					.attr('class', 'st-block-embed')
					.attr('width', data.width)
					.attr('height', data.height)
                    .attr('frameborder', data.frameborder)
			);
            if(typeof data.style != undefined){
                $('<iframe>')
					.attr('style', data.style)
            }
            if(typeof data.sandbox != undefined)
            {
                $('<iframe>')
                    .attr('sandbox', data.sandbox)
            }
            if(typeof data.seamless != undefined)
            {
                $('<iframe>')
                    .attr('seamless')
            }
            if(typeof data.lang != undefined)
            {
                $('<iframe>')
                    .attr('lang', data.lang)
            }
            if(typeof data.title != undefined)
            {
                $('<iframe>')
                    .attr('title', data.title)
            }
            

            this.$inner.addClass('text-center');

			this.ready();
		},
	});

})();
