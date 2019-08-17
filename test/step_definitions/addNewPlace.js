const {I} = inject();
// Add in your custom step files

When('я нажимаю кнопку {string} и заполняю данные', (text) => {
  I.click('//a[@class=dropdown-toggle nav-link]');
  I.wait(2);
  I.click('//div[@class=dropdown-menu dropdown-menu-right show]');
  I.click(`//input[@id='title']`);
  I.fillField( "Hot kebab");
  I.click(`//textarea[@id='description']`);
  I.fillField("Hot kebab");
  I.click('//button[@class=btn btn-primary]');
});

Then('я вижу ответ от сервера {string}', text => {
  I.wait(2);
  I.waitForText(text);
});



