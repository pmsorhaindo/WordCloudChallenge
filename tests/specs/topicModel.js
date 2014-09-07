define(['models/topic'], function(Topic) {

    return describe('Topic Model', function() {

        beforeEach(function() {
            this.topic = new Topic({
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
            var collection = {
                url: "/collection"
            };
            this.topic.collection = collection;
        });

        describe("when instantiated", function() {

            it("should exhibit attributes", function() {
                expect(this.topic.get("label")).toEqual("Berlin");
                expect(this.topic.get("volume")).toEqual(165);
                expect(this.topic.get("sentimentScore")).toEqual(65);
                expect(this.topic.get("burst")).toEqual(13);
            });

            it("should set the type property to default value", function() {
                expect(this.topic.get("type")).toEqual("topic");
            });

        });
        
        describe("urls", function() {

            describe("when no id is set", function() {
                it("should return the collection URL", function() {
                    expect(this.topic.url()).toEqual("/collection");
                });
            });

            describe("when id is set", function() {
                it("should return the collection URL and id", function() {
                    this.topic.set({id: 1});
                    expect(this.topic.url()).toEqual("/collection/1");
                });
            });

        });

    });

});