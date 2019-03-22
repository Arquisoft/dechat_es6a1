require('chai');
var assert = require('assert');
const SemanticChat = require('../src/lib/semanticchat');
const chat = new SemanticChat({ url: "http://prueba:8080", chatBaseUrl: "hola", interlocutorWebId: 123 });

const Loaderjs = require('../src/lib/loader');
const loader = new Loaderjs();

describe('Simple test', function () {
  it('2 + 2 = 4', function () {
    assert.equal(2+2, 4);
  })
})
  
describe('Semantic chat constructor', function () {
  it('getUrl and getInterlocutorWebId', function () {
    assert.equal(chat.getUrl(), "http://prueba:8080");
    assert.equal(chat.getInterlocutorWebId(), 123);
    assert.equal(chat.numberOfMessages, 0);
  })
  
  it('loadMessage', function () {
    chat.loadMessage("Hola");
    assert.equal(chat.getMessages().length, 1);
    assert.equal(chat.getMessages()[0], "Hola");
    chat.loadMessage("Adiós");
    assert.equal(chat.getMessages().length, 2);
    assert.equal(chat.getMessages()[1], "Adiós");
  })
  
    it('loadMessageFromURL', function () {
      var toTest=loader.loadFromUrl(chat.getUrl(), 123, "hola");
      assert.equal(toTest.getUrl(), "http://prueba:8080");
      assert.equal(toTest.getInterlocutorWebId(), 123);
      assert.equal(toTest.getMessages().length, 0);
  })
})
