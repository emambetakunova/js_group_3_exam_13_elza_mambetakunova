
const Helper = codeceptjs.helper;

const userData = {
  'User': {
    'username': 'User',
    'password': '123'
  },
  'Admin': {
    'username': 'Admin',
    'password': '123'
  }
};



class LoginHelper extends Helper {

  async loginAsUser(name) {
    const user = userData[name];

    if (!user) throw new Error('No such user is known! Check helpers/login.js');

    const I = this.helpers['Puppeteer'];

    await I.amOnPage('login');

    const alreadyLoggedIn = await I._locate(`//a[contains(., 'Hello, ${name}')]`);

    if (alreadyLoggedIn.length > 0) {
      return;
    }

    const someoneIsLoggedIn = await I._locate(`//a[contains(., 'Hello,')]`);

    if (someoneIsLoggedIn.length > 0) {
      await I.click(button.menuUser);
      await I.click(button.output);
    }

    await I.fillField(`//input[@id='username']`, user.username);
    await I.fillField(`//input[@id='password']`, user.password);

    await I.click('//button[@class=btn btn-primary], Login]');

    await I.waitForText(`Success`, 2);
  }
}

module.exports = LoginHelper;
