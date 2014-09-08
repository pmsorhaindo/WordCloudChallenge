// collections/topics.js

define([
    'underscore',
    'backbone',
    'models/topic'
], function (_, Backbone, TopicModel){
    
    var TopicCollection = Backbone.Collection.extend({
        
        model: TopicModel,    
        url: '../res/topics.json',
        
        initialize: function(){
            console.log("Topics initialized");
        },

        parse: function(response){
            // from file.
            if(response.topics) return response.topics;
            // from server
            else return response.response.topics;
        }
        
    });
    
    return TopicCollection;
});