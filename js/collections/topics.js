/**
 * @fileOverview TopicCollecion provides a collection for the Topic object by way of Backbone.Collection.
 * @class
 *
 * @requires Backbone.js
 * @requires Underscore.js
 * @requires Topic.js
 * @author Paul-Michael Sorhaindo
 * @version 0.0.1
 */

define([
    'underscore',
    'backbone',
    'models/topic'
], function (_, Backbone, TopicModel){
    
    /**
     * Creates an instance of TopicCollection.
     * @namespace TopicCollection
     * @constructor
     * @this {TopicCollection}
     */
    var TopicCollection = Backbone.Collection.extend({
        
        /**
         * Specifies the type of the collection.
         * 
         * @default
         * @instance
         * @private
         */        
        model: TopicModel,    
        
        /**
         * URL pointing to where the collection should update from. 
         *
         * @default
         * @instance
         * @private
         */
        url: '../res/topics.json',
        
        /**
         * Initialize TopicCollection
         * @public
         */
        initialize: function(){
            console.log("Topics initialized");
        },
        
        /**
         * Parses the response when fetching a collection from URL
         * @public
         * @return{Topic[]} Array of topics parsed.
         */
        parse: function(response){
            // from file.
            if(response.topics) return response.topics;
            // from server
            else return response.response.topics;
        }
        
    });
    
    /**
     * @return{TopicCollection} 
     */    
    return TopicCollection;
});