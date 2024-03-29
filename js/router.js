/**
 * @fileOverview AppRouter handles the navigation logic of the application. 
 * @class
 *
 * @requires Backbone.js
 * @requires Underscore.js
 * @requires Topic.js
 * @requires d3.js
 * @require d3.layout.cloud.js
 * @require TopicsCollection.js
 * @author Paul-Michael Sorhaindo
 * @version 0.0.1
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'views/topics/cloud',
    'views/topic/details',
    'collections/topics'
], function($, _, Backbone, TopicCloud, TopicDetails, TopicsCollection){

    /**
     * Constructs the AppRouter object.
     * @namespace AppRouter
     * @constructor
     */
    var AppRouter = Backbone.Router.extend({
        routes:{
            // route details
            "topic/:label": 'details',
            // route return (close) to just cloud
            "cloud": 'cloud',
			// Default
			'*actions': 'defaultAction'
		}
	});
    
    /**
     * Initializes the app Router object, creating a new TopicCollection and fetching the data from default location.
     * Events are then set to handle routes for the TopicDetailsView as well as the TopicCloudView.
     * A default route is also created to handle erroneous URLs.
     * History is maintained using Backbone.history and the initialized TopicCloud is rendered once the TopicCollection data is recieved.
     *
     * @public
     */
	var initialize = function(){
        var app_router = new AppRouter;
        var topicsList = new TopicsCollection();
        // Grab JSON topics data 
        topicsList.fetch({reset: true});
        
        topicsList.on("reset", this.render, this);
        
		// Pass details label via param.
		app_router.on('route:details',function(id){ // TODO change to id.
            // Show details view for a selected topic
            console.log('Show details: '+id);
            var model = topicsList.get(id);
            var topicDetailsView = new TopicDetails({el: $("#details"), model: model});
            
		});
        
        app_router.on('route:cloud',function(){
            // Hide details view
            console.log('Close details view.');
            $("#details").html("");
		});
        
        // catch illegal routes.
		app_router.on('route:defaultAction', function(actions) {
			// No matching route - print URL
			console.log('No route:',actions);
		});
        
        // Begin recording history for Router's back functionality
		Backbone.history.start();
        
        // Display Topic Cloud
        var topicCloudView = new TopicCloud({el: $("#cloud"), collection: topicsList});
        topicCloudView.render();
        
	};
    
    /**
     * @returns{function} - The initialize function for the Router object.
     */
	return {
		initialize: initialize
	};
    
});