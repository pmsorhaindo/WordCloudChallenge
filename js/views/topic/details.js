/**
 * @fileOverview TopicDetailsView arranges the information about a particular topic visually, providing a breakdown on sentiment distribution.
 *
 * @class
 * @requires Backbone.js
 * @requires Underscore.js
 * @requires Topic.js
 * @author <a href="mailto:pmsorhaindo@gmail.com">Paul-Michael Sorhaindo</a>
 * @version 0.0.1
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'models/topic',
  'text!templates/details/list.html'
], function($, _, Backbone, Topic, topicDetailsTemplate){
    
    // Single Topic details view
    var TopicDetailsView = Backbone.View.extend({
        
        /**
         * Render's the details view by compiling a HTML template using underscore.js
         */
        render: function(){
            // Compile the template using Underscores micro-templating
            var compiledTemplate = _.template( topicDetailsTemplate, { pageType: this.model.get("pageType") });
            this.$el.html(compiledTemplate({label: this.model.get("label"),
                                            volume: this.model.get("volume"),
                                            types: this.model.get("pageType"),
                                            sentiments: this.model.get("sentiment")
                                           }));
        },
        /**
         * Initializes the model providing it with a DOM element to hook on to,
         * and a model from which to retrieve data.
         * Reloads the index.html if the supplied model is null.
         * @param {Object} - el: DOM element and model: Topic. 
         */
        initialize: function(options){
            this.el = options.el;
            this.model = options.model;
            if (!this.model){
                window.location = 'index.html';
            }
            this.render();
            this.listenTo(this.model, "change", this.render);
        }
    });
  
    /**
     * 
     * @return Returning TopicDetailsView.
     */
    return TopicDetailsView;
    
});