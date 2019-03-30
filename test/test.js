require('chai');
var assert = require('assert');
const auth = require('solid-auth-client');

const SemanticChat = require('../src/lib/semanticchat');
const chat = new SemanticChat({ url: "http://prueba:8080", chatBaseUrl: "hola", interlocutorWebId: 123 });
const SemanticChat2 = require('../src/lib/semanticchat');
const chat2 = new SemanticChat2({ url: "https://testdechat6a1.solid.community/profile/card#me", userWebId : 122, chatBaseUrl: "Adios", interlocutorWebId: 123 });

const Loaderjs = require('../src/lib/loader');
const loader = new Loaderjs(auth.fetch);

const DeChatCore = require('../src/lib/core');
const core = new DeChatCore(auth.fetch);

const DataSync = require('../src/lib/datasync');
const dataSync = new DataSync(auth.fetch);

const rdf = require('../src/lib/rdfjssourcefactory');

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
  
})

describe('Loader tests', function () {
	it('loadMessageFromURL', async function () {
		let s= await loader.loadFromUrl("https://testdechat6a1.solid.community/profile/card#me", 123, "hola");
		assert.equal(s.getUrl(), "https://testdechat6a1.solid.community/profile/card#me");
		assert.equal(s.userWebId, 123);
		assert.equal(s.getMessages().length, 0);
	})
	
})

describe('rdf tests', function () {
	it('fromString', function () {
		let s= rdf.fromString("Cristian Lado González");
		assert.equal(s.resolves, undefined);
	})
	
})

describe('Core tests', function () {
	it('core constructor', function () {
		assert.equal(core.alreadyCheckedResources.length, 0);
		assert.equal(core.logger.level, 'error');
	})
  
	it('getFormattedName', async function () {
		let s= await core.getFormattedName("https://testdechat6a1.solid.community/profile/card#me");
		assert.equal(s, "Tests Dechat_6a1");
	})
	
	it('setUpNewChat', async function () {
		let s= await core.setUpNewChat ("https://testdechat6a1.solid.community/profile/card",150,151);
		assert(s.getUrl().includes("https://testdechat6a1.solid.community/profile/card#"));
		assert.equal(s.chatBaseUrl, undefined);
		assert.equal(s.userWebId, 150);
		assert.equal(s.interlocutorWebId, 151);
		assert.equal(s.numberOfMessages, 0);
	})
	
	it('generateUniqueUrlForResource', async function () {
		let s= await core.generateUniqueUrlForResource("https://alvarogonzalezcarracedo2.solid.community/profile/card");
		assert(s.includes("https://alvarogonzalezcarracedo2.solid.community/profile/card#"));
	})
	
	it('joinExistingChat', async function () {
		const file=dataSync.createEmptyFileForUser("https://testdechat6a1.solid.community/private/test");
		let s= await core.joinExistingChat("https://testdechat6a1.solid.community/profile/card#me", "https://alvarogonzalezcarracedo2.solid.community/profile/card#me", "https://testdechat6a1.solid.community/profile/card#me", "https://alvarogonzalezcarracedo2.solid.community/private",
		dataSync, "https://testdechat6a1.solid.community/private/test");
		assert(s.includes("https://alvarogonzalezcarracedo2.solid.community/private#"));
	})
	
	it('generateResponseToInvitation', async function () {
		let s= await core.generateResponseToInvitation("https://testdechat6a1.solid.community/profile/card#me", "https://alvarogonzalezcarracedo2.solid.community/invitation",
		"https://testdechat6a1.solid.community/profile/card#me",
		"https://alvarogonzalezcarracedo2.solid.community/profile/card#me","no");
		assert(s.notification.includes("https://alvarogonzalezcarracedo2.solid.community/invitation"));
		assert(s.notification.includes("https://testdechat6a1.solid.community/profile/card#"));
		assert(s.sparqlUpdate.includes("http://schema.org/RsvpResponseNo"));
	})
	
	it('getInboxUrl', async function () {
		let s= await core.getInboxUrl("https://testdechat6a1.solid.community/profile/card#me");
		assert.equal(s, "https://testdechat6a1.solid.community/inbox/");
	})
	
	it('checkUserInboxForUpdates', function () {
		let s= core.checkUserInboxForUpdates("https://alvarogonzalezcarracedo2.solid.community/inbox/");
		assert.equal(s.resolves, undefined);
	})
	
	it('getJoinRequest', function () {
		const file=dataSync.createEmptyFileForUser("https://alvarogonzalezcarracedo2.solid.community/private/test");
		let s= core.getJoinRequest("https://alvarogonzalezcarracedo2.solid.community/private/test","https://alvarogonzalezcarracedo2.solid.community/profile/card#me");
		assert.equal(s.resolves, undefined);
	})
  
})
