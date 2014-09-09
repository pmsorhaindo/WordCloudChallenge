/**
 * @fileOverview App provides an entry point into the Wordcloud app intializing the Backbone Router.
 *
 * @requires jQuery.js
 * @requires Backbone.js
 * @requires Underscore.js
 * @author <a href="mailto:pmsorhaindo@gmail.com">Paul-Michael Sorhaindo</a>
 * @version 0.0.1
 */

define([
	'jquery',
	'underscore',
	'backbone',
	'router',
    'd3'
],function($, _, Backbone, Router,d3){
	
    /**
     * Intializes the app.
     */
	var initialize = function(){
		Router.initialize();
	}
	
    /**
     * @return{function()} The initialize function of Router.js 
     */    
	return{
		initialize: initialize
	};
});