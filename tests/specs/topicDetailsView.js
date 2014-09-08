define([
    'collections/topics',
    'models/topic',
    'views/topic/details'
], function(TopicCollection,Topic,TopicDetailsView) {
    
    return describe("TopicDetailsView", function() {

        beforeEach(function() {
            this.addMatchers({
                toBeInstanceOf: function(expectedInstance) {
                    var actual = this.actual;
                    var notText = this.isNot ? " not" : "";
                    this.message = function() {
                        return "Expected " + actual.constructor.name + notText + " is instance of " + expectedInstance.name;
                    };
                    return actual instanceof expectedInstance;
                }		
            });
            
            this.tempTopic = new Topic({
                label: "Berlin",
                volume: 165,
                sentiment: {
                    "negative": 3,
                    "neutral": 133,
                    "positive": 29
                },
                sentimentScore: 65,
                burst: 13,
                days: [{
                    "date": "2014-06-06T00:00:00.000+0000",
                    "volume": 22
                }, {
                    "date": "2014-06-04T00:00:00.000+0000",
                    "volume": 43
                }],
                pageType: {
                    "facebook": 56,
                    "news": 26,
                    "twitter": 35
                },
                queries: [{
                    "id": 1751295897,
                    "name": "Berghain",
                    "volume": 165
                }]
            });
            this.detailsElem = document.createElement('div');
            this.detailsElem.id = "details";
            $( "body" ).append(this.detailsElem);
            this.view = new TopicDetailsView({el: $("#details"), model: this.tempTopic});
        });
        
        afterEach(function() {
            $("#details").remove();
        });

        describe("Instantiation", function() {

            it("should be assigned to a div element", function() {
                expect(this.view.el.length).toEqual(1);
                expect(this.view.el[0].nodeName).toEqual("DIV");
            });

            it("should have model as an instance of topic", function() {
                expect(this.view.model).toBeInstanceOf(Topic);
            });

        });

    });
    
});