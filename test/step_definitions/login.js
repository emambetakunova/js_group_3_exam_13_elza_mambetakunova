const { I } = inject();
// Add in your custom step files

Given('я авторизованный пользователь {string}', name => {
  I.loginAsUser(name);
});