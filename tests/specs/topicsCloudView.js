define([
    'collections/topics',
    'models/topic',
    'views/topics/cloud'
], function(TopicCollection,Topic,TopicCloudView) {
    
    return describe("TopicCloudView", function() {

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
            
            this.detailsElem = document.createElement('div');
            this.detailsElem.id = "cloud";
            $( "body" ).append(this.detailsElem);
            
            this.fixture = this.fixtures.Topics.valid;
            this.fixtureTopics = this.fixture.response.topics;
            this.server = sinon.fakeServer.create();

            this.validResponse = function(responseText) {
                return [
                    200,
                    {"Content-Type": "application/json"},
                    JSON.stringify(responseText)
                ];
            };  

            this.server.respondWith(
                "GET",
                "../res/topics.json",
                this.validResponse(this.fixture)
            );
            
            this.topics = new TopicCollection({model:Topic});
            this.topics.fetch();
            this.server.respond();
            this.view = new TopicCloudView({el: $("#cloud"), collection: this.topics});
        });
        
        afterEach(function() {
            this.server.restore();
            $("#cloud").remove();
        });

        describe("Instantiation", function() {

            it("should be assigned to a div element", function() {
                expect(this.view.el.length).toEqual(1);
                expect(this.view.el[0].nodeName).toEqual("DIV");
            });

            it("should have model as an instance of topic", function() {
                expect(this.view.collection).toBeInstanceOf(TopicCollection);
            });

        });

    });
    
});