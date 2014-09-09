/**
 * @fileOverview TopicCollecion provides a collection for the Topic object by way of Backbone.Collection.
 *
 * @requires Backbone.js
 * @requires Underscore.js
 * @requires Topic.js
 * @author <a href="mailto:pmsorhaindo@gmail.com">Paul-Michael Sorhaindo</a>
 * @version 0.0.1
 */

define([
    'underscore',
    'backbone',
    'models/topic'
], function (_, Backbone, TopicModel){
    
    /**
     * Creates an instance of TopicCollection.
     *
     * @constructor
     * @this {TopicCollection}
     */
    var TopicCollection = Backbone.Collection.extend({
        /**
         * Specifies the type of the collection.
         * 
         * @default
         * @instance
         */        
        model: TopicModel,    
        /**
         * Url pointing to where the collection should update from. 
         *
         * @default
         * @instance
         */
        url: '../res/topics.json',
        
        initialize: function(){
            console.log("Topics initialized");
        },
        /**
         * Parses the response when fetching a collection from URL
         *
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