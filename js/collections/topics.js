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
            return response.topics;
        }
        
    });
    
    return TopicCollection;
});