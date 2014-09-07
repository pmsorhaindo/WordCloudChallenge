// models/topic.js

define([
	'underscore',
	'backbone'
],function(_, Backbone){
    
    // Topic model definition
	var TopicModel = Backbone.Model.extend({
        
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
    
	return TopicModel;
});