/*! sir-trevor-gmaps-block 2015-06-05 */
/* global define:true module:true window: true */
(function(global, factory) {
    if (typeof define === 'function' && define['amd']) {
        define(['sir-trevor-js', 'jquery'], factory);
    } else if (typeof module !== 'undefined' && module['exports']) {
        var SirTrevor = require('sir-trevor-js');
        var jQuery = require('jquery');
        module['exports'] = factory(SirTrevor, jQuery);
    } else if (typeof this !== 'undefined') {
        global.SirTrevor.Blocks.Columns = factory(global.SirTrevor, global.jQuery);
    }
})(typeof window !== 'undefined' ? window : this, function factory(SirTrevor, $) {
	"use strict";
    /*
     Columns Layout Block
     */
	 return SirTrevor.Blocks.Maps = SirTrevor.Block.extend({
		providers: {
			googlemaps: {
				//regex: /(?:http[s]?:\/\/)?(?:www.)?vimeo.com\/(.+)/,
				regex: /<iframe.*? src='(?:http[s]?:\/\/)?(?:www)?google.com\/maps\/embed(.*?)'/,
				html: "<iframe src=\"<%= protocol %>//www.google.com/maps/embed<%= remote_id %>\" width=\"580\" height=\"320\" frameborder=\"0\" style=\"border\:0\"><\/iframe>"
				//html: "<iframe src=\"<%= protocol %>//player.vimeo.com/video/<%= remote_id %>?title=0&byline=0\" width=\"580\" height=\"320\" frameborder=\"0\"></iframe>"
			}
		},
		type: 'maps',
		title: function() { return i18n.t('blocks:maps:title')|| 'Maps';},
		icon_name: 'iframe',
		
		droppable: true,
        pastable: true,
	  
		
		loadData: function(data){
			if (!this.providers.hasOwnProperty(data.source)) { return; }

			var source = this.providers[data.source];

			var protocol = window.location.protocol === "file:" ? 
				"http:" : window.location.protocol;

			this.$editor
			.addClass('st-block__editor--with-sixteen-by-nine-media')
			.html(_.template(source.html, {
				protocol: protocol,
				remote_id: data.remote_id
			}));
		},
		onContentPasted: function(event){
			this.handleDropPaste(event.target.value);
		},
		matchMapProvider: function(provider, index, url) {
			var match = provider.regex.exec(url);
			if(match == null || _.isUndefined(match[1])) { return {}; }

			return {
				source: index,
				remote_id: match[1]
			};
		},
		handleDropPaste: function(url){
		if (!utils.isURI(url)) { return; }

			for(var key in this.providers) { 
				if (!this.providers.hasOwnProperty(key)) { continue; }
				this.setAndLoadData(
					this.matchMapProvider(this.providers[key], key, url)
				);
			}
		  },
		onDrop: function(transferData){
			var url = transferData.getData('text/plain');
			this.handleDropPaste(url);
		}
	 });
});

