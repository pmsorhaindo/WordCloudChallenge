define([
    'collections/topics',
    'models/topic'
], function(TopicCollection,Topic) {

    return describe('Topic Collection', function() {
        beforeEach(function() {
            this.topic1 = new Backbone.Model({
                id: 1,
                label: 'Coffee',
                volume: 3
            });
            this.topic2 = new Backbone.Model({
                id: 2,
                label: 'Tea',
                volume: 2
            });
            this.topic3 = new Backbone.Model({
                id: 3,
                label: 'Cake',
                volume: 1
            });
            this.topic4 = new Backbone.Model({
                id: 4,
                label: 'Friedrichstraße',
                volume: 2
            });

            this.topics = new TopicCollection();
            this.topicStub = sinon.createStubInstance(Topic)
        });
        
        afterEach(function() {
            this.topicStub.values.restore();
        });
        
        describe("When instantiated with model literal", function() {

            beforeEach(function() {
                this.model = new Backbone.Model({id: 5,
                                                 label: "Berlin",
                                                 volume: 80
                                                });
                this.topicStub.values.returns(this.model);
                this.topics.model = Topic;
                this.topics.add({id:5, label:"Berlin", volumes: 80});
            });

            it("should have 1 Topic model", function() {
                expect(this.topics.length).toEqual(1);
                expect(this.topicStub.constructor.called);
                
            });

            it("should find a model by id using .get", function() {
                expect(this.topics.get(5).get("id")).toEqual(this.model.get("id"));
            });

            it("should find a model by index", function() {
                expect(this.topics.at(0).get("id")).toEqual(this.model.get("id"));
            });

            it("should have called the Topic constructor", function() {
                expect(this.topicStub.constructor.calledOnce);
                expect(this.topicStub.constructor.calledWith({id:5, label:"Berlin", volumes: 80}));
            });

        });
        
        describe("When adding models", function() {

            it("should remain in order", function() {
                this.topics.model = Topic;
                this.topics.add([this.topic2, this.topic1, this.topic3]);
                expect(this.topics.at(0)).toBe(this.topic2);
                expect(this.topics.at(1)).toBe(this.topic1);
                expect(this.topics.at(2)).toBe(this.topic3);
            });

        });
        

    });

});