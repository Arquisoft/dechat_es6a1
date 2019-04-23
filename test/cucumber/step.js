'use strict';

const assert = require('assert');
var seleniumWebDriver = require ('selenium-webdriver');


module.exports = function () {
    
    //----------------------- Test Login -------------------------
    this.Given(/^a "([^"]*)" and "([^"]*)" and the user make login$/, function (user,password) {
        //Parent --> First window
        var parent = driver.getWindowHandle();
        return helpers.loadPage("https://arquisoft.github.io/dechat_es6a1/")
            .then(()=> {
                    return driver.findElement(by.xpath("//*[@id='nav-login-btn']")).click()
                        .then(() => {
                            // select the newly opened window
                            return driver.getAllWindowHandles().then(function gotWindowHandles(allhandles) {
                                // Switching to Child window
                                driver.switchTo().window(allhandles[allhandles.length - 1]);
                                return driver.findElement(by.xpath("/html/body/div/div/div/button[4]")).click()
                                    .then(() => {
                                        driver.wait(until.elementsLocated(by.name("username")), 10000);
                                        driver.findElement(By.name("username")).sendKeys(user); 
                                        driver.findElement(By.name("password")).sendKeys(password); 
                                        return driver.findElement(by.xpath("//*[@id='login']")).click().then(() => {
                                            driver.switchTo().window(parent);
                                            return driver.wait(until.elementsLocated(by.xpath("//*[@id='user-name']")), 20000);
                                        })
                                })
                            });
                    })
                })
    });
    
    this.Then(/^the login is successfull$/,function (){
        return driver.wait(until.elementsLocated(by.xpath("//*[@id='user-name']")), 10000);
    });
};
