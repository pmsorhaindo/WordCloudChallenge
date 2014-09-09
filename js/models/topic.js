/**
 * @fileOverview TopicModel provides a container for the information on a given Topic within the word cloud.
 * @class
 *
 * @requires Backbone.js
 * @requires Underscore.js
 * @author <a href="mailto:pmsorhaindo@gmail.com">Paul-Michael Sorhaindo</a>
 * @version 0.0.q
 */

define([
	'underscore',
	'backbone'
],function(_, Backbone){
    
    /**
     * Creates an instance of Topic.
     *
     * @constructor
     * @this {TopicModel}
     */
	var TopicModel = Backbone.Model.extend({
        
        /**
         *
         * @default
         */
        defaults: {
            "type": "topic"
        },
        /**
         * Parses the response when fetching a collection from URL
         *
         * @return{Object} An object hashing the values of a Topic.
         */
        parse: function(response) {
            var setHash = {};
            setHash.label = response.label;
            setHash.volume = response.volume;
            setHash.type = response.type;
            setHash.sentiment = response.sentiment;
            setHash.sentimentScore = response.sentimentScore;
            setHash.burst = response.burst;
            setHash.days = response.days;
            setHash.pageType = response.pageType;
            setHash.queries = response.queries;
            setHash.id = response.id.replace(/\//g,"")
                .replace(/'/g,"")
                .replace(/ /g,"");
            
            return setHash;
        }
	});
    
    /**
     * @return{TopicModel} 
     */    
	return TopicModel;
});