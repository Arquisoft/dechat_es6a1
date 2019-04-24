'use strict';

const assert = require('assert');
var seleniumWebDriver = require ('selenium-webdriver');


module.exports = function () {
    
    //Test login existing user
    this.Given(/^"([^"]*)" with password "([^"]*)"$/, function (user,psswd) {
        var parent = driver.getWindowHandle();
        return helpers.loadPage("https://arquisoft.github.io/dechat_es6a1/")
            .then(()=> {
                    return driver.findElement(by.xpath("//*[@id='nav-login-btn']")).click()
                        .then(() => {
                            return driver.getAllWindowHandles().then(function gotWindowHandles(allhandles) {
                                driver.switchTo().window(allhandles[allhandles.length - 1]);
								return driver.wait(until.elementsLocated(by.xpath("/html/body/div/div/div/button[2]")), 20000)
								.then(() => {
									return driver.findElement(by.xpath("/html/body/div/div/div/button[2]")).click()
										.then(() => {
											driver.wait(until.elementsLocated(by.name("username")), 10000);
											driver.findElement(By.name("username")).sendKeys(user); 
											driver.findElement(By.name("password")).sendKeys(psswd); 
											return driver.findElement(by.xpath("//*[@id='login']")).click().then(() => {
												driver.switchTo().window(parent);
												return driver.wait(until.elementsLocated(by.xpath("//*[@id='user-name']")), 20000);
											})
									})
								})
                            });
                    })
                })
    });
    
    this.Then(/^the login is success$/,function (){
        return driver.wait(until.elementsLocated(by.xpath("//*[@id='user-name']")), 10000);
    });
	
	
	//Test logout existing user
    this.Given(/^"([^"]*)" with password "([^"]*)", the user make login and log out$/, function (user,psswd) {
        var parent = driver.getWindowHandle();
        return helpers.loadPage("https://arquisoft.github.io/dechat_es6a1/")
            .then(()=> {
                    return driver.findElement(by.xpath("//*[@id='nav-login-btn']")).click()
                        .then(() => {
                            return driver.getAllWindowHandles().then(function gotWindowHandles(allhandles) {
                                driver.switchTo().window(allhandles[allhandles.length - 1]);
								return driver.wait(until.elementsLocated(by.xpath("/html/body/div/div/div/button[2]")), 20000)
								.then(() => {
									return driver.findElement(by.xpath("/html/body/div/div/div/button[2]")).click()
										.then(() => {
											driver.wait(until.elementsLocated(by.name("username")), 10000);
											driver.findElement(By.name("username")).sendKeys(user); 
											driver.findElement(By.name("password")).sendKeys(psswd); 
											return driver.findElement(by.xpath("//*[@id='login']")).click().then(() => {
												driver.switchTo().window(parent);
												driver.wait(until.elementsLocated(by.xpath("//*[@id='navbarDropdown']")), 20000);
												return driver.wait(until.elementsLocated(by.xpath("//*[@id='user-menu']")),20000);
											})
									})
								})
                            });
                    })
                })
    });
    
    this.Then(/^the chat is shown$/,function (){
        driver.findElement(By.xpath("//*[@id='navbarDropdown']")).click();
        driver.findElement(By.xpath("//*[@id='logout-btn']")).click();
        return driver.findElement(by.xpath("//*[@id='nav-login-btn']"));
    });
};
