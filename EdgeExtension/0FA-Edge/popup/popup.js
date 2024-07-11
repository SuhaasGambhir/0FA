// GPT generated

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    console.log('clickclick ready'); //debug
    loginButton.addEventListener('click', function() {
        console.log('clickclick'); //debug
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'login' }, function(response) {
          console.log('Login message sent');
        });
      });
    });
  });