// GPT generated

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
  
    loginButton.addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'login' }, function(response) {
          console.log('Login message sent');
        });
      });
    });
  });