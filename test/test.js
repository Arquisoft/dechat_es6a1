require('chai');
var assert = require('assert');
const SemanticChat = require('../src/lib/semanticchat');
const chat = new SemanticChat({ url: "http://prueba:8080", chatBaseUrl: "hola", interlocutorWebId: 123 });

describe('Simple test', function () {
  it('2 + 2 = 4', function () {
    assert.equal(2+2, 4);
  })
})
  
describe('Semantic chat constructor', function () {
  it('getUrl and getInterlocutorWebId tests', function () {
    assert.equal(chat.getUrl(), "http://prueba:8080");
    assert.equal(chat.getInterlocutorWebId(), 123);
  })
})
