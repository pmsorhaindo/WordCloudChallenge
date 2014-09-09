/**
 * @fileOverview TopicCloudView implements a d3 layout - word cloud library developed by Jason Davies (opensource - see libs/d3/layouts for license information).
 * It collates information from all topics provided in a TopicsCollection object and declares rules as to how the cloud should be displayed.
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
    'collections/topics',
    'text!templates/cloud/cloud.html',
    'd3',
    'd3cloud'
    
], function($, _, Backbone, TopicsCollection, topicCloudTemplate, d3, d3cloud){
    
    /**
     * TopicCloudView, Multiple topic view definition (the word cloud).
     * @namespace TopicCloudView
     * @constructor
     */
    var TopicCloudView = Backbone.View.extend({
        
        /**
         * Scaling the font sizes used for each word size in the word cloud.
         * @private
         */
        fontSizeScale: 12, // increase font size from 1pt ... 6pt by this factor.
        
        /**
         * Width of word cloud.
         * @private
         */
        width: 500, // width of cloud.
        
        /**
         * Height of word cloud.
         * @private
         */        
        height: 500, // height of cloud.
        
        /**
         * A lower bound on the sentiment score value for a word to be considered positive when rendering the word cloud.
         * At which point higher values will be green. ("#3adf00")
         * @private
         */
        posSentimentLowerBound: 60, 
        
        /**
         * An upper bound on the sentiment score value for a word to be considered negative when rendering the word cloud.
         * At which point lower values will be red. ("#ff0000")
         * @private
         */        
        negSentimentUpperBound: 40, // at which point lower values will be red.
        
        /**
         * Marshall data for use by the d3.layout.cloud library.
         * @private
         */
        prepareCloud: function(w,h,posSentLower,negSentUpper){
            // Min and max Volumes from the TopicCollection
            var minVolume = this.collection.min(function(model) {
                return model.get("volume")}).get("volume");
            var maxVolume = this.collection.max(function(model) {
                return model.get("volume")}).get("volume");
            
            /**
             * Using the d3 library - scales a font size between the mnimum and maximum to one of 6 discrete values.
             * 1 - 6 (handles values outside this sensibly).
             */
            var fontScale = d3.scale.quantile().domain([minVolume,maxVolume])
                .range([1,2,3,4,5,6]); // TODO fix scale to ensure 6 are chosen.
            
            /**
             * Marshalls Topic objects into temporary wordCloudObject list created via a map across the TopicCollection.
             * WordCloudObject's are suitable for the d3 library to process.
             * @private
             */
            wordCloudObjects = _.map(this.collection.models,function(model){
                var label = model.get("label");
                var size = fontScale(model.get("volume"));
                var sentimentScore = model.get("sentimentScore");
                var identifier = model.get("id");
                return {text: label, size: size*this.fontSizeScale,
                        sentimentScore: sentimentScore, id: identifier};},this);
            
            /**
             * Colours wordCloudObject depending on its sentimentScore.
             * @priavte
             */
            var colourFunc = function(d) {
                        if (d.sentimentScore > posSentLower) return "#3adf00"; // green
                        else if (d.sentimentScore < negSentUpper) return "#ff0000"; // red
                        else return "#848484"; // grey
                    }
            
            /**
             * Renders cloud through the d3 library, requires a list of wordCloudObjects.
             * @param {Object} - WordCloudObject
             * @private
             */
            var draw = function (words) {
                d3.select("#cloud").append("svg")
                    .attr("width", w)
                    .attr("height", h)
                    .append("g")
                    // move to center half of  width and height.
                    .attr("transform", "translate(" + [w >> 1, h >> 1] + ")")
                    .selectAll("text")
                    .data(words)
                    .enter().append("text")
                    .style("font-size", function(d) { return d.size + "px"; })
                    .style("font-family", "Impact")
                    .style("fill", colourFunc)
                    .attr("text-anchor", "middle")
                    .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    // Load breakdown of topic information on click.
                    .on("click", function(d) {window.location.hash = '#topic/'+d.id;})
                    .text(function(d) { return d.text; });
                }

            // Set up cloud library, call draw function once setup.
            d3.layout.cloud().size([w, h])
                .words(wordCloudObjects)
                .padding(5)
                // How many rotational positions should be used. - currently set to 1 (not exposed).
                .rotate(function() { return ~~(Math.random() * 1) * 90; })
                .font("Impact")
                // Font size taken from the wordCloudObject attribute.
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();
            
        },
        
        /**
         * Renders view - if more than two words are present in the topic model.
         * @public
         */
        render: function(){
            if(this.collection.models.length >  2)
            {
                this.prepareCloud(this.width,this.height,
                                  this.posSentimentLowerBound,
                                  this.negSentimentUpperBound);
            }
        },
        
        /**
         * Initialize.
         * Assigns DOM element and colletion and collection reset callback.
         * @param {Object} - el: DOM element and collection: TopicCollection. 
         */        
        initialize: function(options){
            this.el = options.el;
            this.collection = options.collection;
            this.collection.on("reset", this.render, this);
        }
    });
    
    /**
     * Returning TopicCloudView
     * @returns {TopicCloudView}
     */
    return TopicCloudView;

});