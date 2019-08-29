const {I} = inject();
// Add in your custom step files

When('я нажимаю кнопку {string} и заполняю данные', (text) => {
  I.wait(10);
  I.click("//a[contains(text(),'Add new place')]");
  I.fillField( "//input[@id='title']", "Hot kebab");
  I.fillField("//textarea[@id='description']", "Hot kebab");
  I.click('//button[.="Submit new place"]');
});

Then('я вижу ответ от сервера {string}', text => {
  I.wait(2);
  I.waitForText(text);
});



