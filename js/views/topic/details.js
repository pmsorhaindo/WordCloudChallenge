// views/topic/details.js

define([
  'jquery',
  'underscore',
  'backbone',
  'models/topic',
  'text!templates/details/list.html'
], function($, _, Backbone, Topic, topicDetailsTemplate){
    
    // Single Topic details view
    var TopicDetailsView = Backbone.View.extend({
        
        render: function(){
            // Compile the template using Underscores micro-templating
            var compiledTemplate = _.template( topicDetailsTemplate, { pageType: this.model.get("pageType") });
            this.$el.html(compiledTemplate({label: this.model.get("label"),
                                            volume: this.model.get("volume"),
                                            types: this.model.get("pageType"),
                                            sentiments: this.model.get("sentiment")
                                           }));
        },
        
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
  
    // Returning view data.
    return TopicDetailsView;
    
});