// views/topics/cloud.js

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/topics',
    'text!templates/cloud/cloud.html',
    'd3',
    'd3cloud'
    
], function($, _, Backbone, TopicsCollection, topicCloudTemplate, d3, d3cloud){
    
    // Multiple project view definition
    var TopicCloudView = Backbone.View.extend({
        
        fontSizeScale: 12,
        width: 500,
        height: 500,
        
        load: function(id){
            window.location.hash = '#topic/'+id;
        },
        
        prepareCloud: function(){
            // sort topics by volume.
            var sortedTopics = this.collection.sortBy(function(topic) {
              return topic.get("volume");
            });
            
            var minVolume = this.collection.min(function(model) {
                return model.get("volume")}).get("volume");
            var maxVolume = this.collection.max(function(model) {
                return model.get("volume")}).get("volume");
            
            console.log("min:",minVolume,"max:",maxVolume);
            var fontScale = d3.scale.quantile().domain([minVolume,maxVolume])
                .range([1,2,3,4,5,6]); // TODO fix scale to ensure 6 are chosen.
            
            wordCloudObjects = _.map(this.collection.models,function(model){
                var label = model.get("label");
                var size = fontScale(model.get("volume"));
                var sentimentScore = model.get("sentimentScore");
                var identifier = model.get("id");
                return {text: label, size: size*this.fontSizeScale,
                        sentimentScore: sentimentScore, id: identifier};},this);
            
            var draw = function (words) {
                var w = this.width;
                var h = this.height;
                d3.select("#cloud").append("svg")
                    .attr("width", 400)
                    .attr("height", 400)
                    .append("g")
                    // move to center half of  width and height.
                    .attr("transform", "translate(" + [400 >> 1, 400 >> 1] + ")")
                    .selectAll("text")
                    .data(words)
                    .enter().append("text")
                    .style("font-size", function(d) { return d.size + "px"; })
                    .style("font-family", "Impact")
                    .style("fill", function(d, i) {
                        if (d.sentimentScore > 60) return "#3adf00"; // green
                        else if (d.sentimentScore < 40) return "#ff0000"; // red
                        else return "#848484"; // grey
                    })
                    .attr("text-anchor", "middle")
                    .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .on("click", function(d) {window.location.hash = '#topic/'+d.id;})
                    .text(function(d) { return d.text; });
                console.log(this.w,this.h,this.w >> 1,this.h >> 1,w,h)
                }
            
            d3.layout.cloud().size([500, 500])
                .words(wordCloudObjects)
                .padding(0)
                .rotate(function() { return ~~(Math.random() * 1) * 90; })
                .font("Impact")
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();
            
        },
        
        render: function(){
            // Compile the template using Underscores micro-templating
            //var compiledTemplate = _.template( topicCloudTemplate );
            //this.$el.html(compiledTemplate({ topics: this.collection.models }));
            
            if(this.collection.models.length >  1)
            {
                // sort topics by volume.
                //var sortedTopics = this.collection.sortBy(function(topic) {
                //  return topic.get("volume");
                //});
                //var compiledTemplate = _.template( topicCloudTemplate );
                //this.$el.html(compiledTemplate({ topics: sortedTopics }));
                this.prepareCloud();
            }
        },
        
        initialize: function(options){
            this.el = options.el;
            this.collection = options.collection;
            this.collection.on("reset", this.render, this);
        }
    });
    
    // Returning Cloud View
    return TopicCloudView;

});