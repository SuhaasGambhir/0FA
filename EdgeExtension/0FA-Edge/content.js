// GPT generated


// Function to generate TOTP code using jsSHA
function generateTOTP(secret) {
    const time = Math.floor(Date.now() / 1000 / 30);
    const key = base32tohex(secret);
    const shaObj = new jsSHA("SHA-1", "HEX");
    shaObj.setHMACKey(key, "HEX");
    shaObj.update(dec2hex(time));
    const hmac = shaObj.getHMAC("HEX");
  
    const offset = hex2dec(hmac.substring(hmac.length - 1));
    const otp = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec("7fffffff")) + "";
    return otp.substr(otp.length - 6, 6).padStart(6, '0');
  }
  
  // Helper functions for TOTP generation
  function dec2hex(s) {
    return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
  }
  
  function hex2dec(s) {
    return parseInt(s, 16);
  }
  
  function base32tohex(base32) {
    const base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let bits = "";
    let hex = "";
  
    for (let i = 0; i < base32.length; i++) {
      const val = base32chars.indexOf(base32.charAt(i).toUpperCase());
      bits += leftpad(val.toString(2), 5, "0");
    }
  
    for (let i = 0; i + 4 <= bits.length; i += 4) {
      const chunk = bits.substr(i, 4);
      hex += parseInt(chunk, 2).toString(16);
    }
    return hex;
  }
  
  function leftpad(str, len, pad) {
    return (new Array(len + 1).join(pad) + str).slice(-len);
  }
  
  // Wait for the page to finish loading
  window.addEventListener('load', (event) => {
    console.log('Page loaded, starting login process...');
  
    // Function to simulate a click on an element
    function simulateClick(element) {
      element.dispatchEvent(new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      }));
    }
  
    // Function to fill in a form field
    function fillFormField(selector, value) {
      const field = document.querySelector(selector);
      if (field) {
        field.value = value;
      } else {
        console.error(`Field ${selector} not found.`);
      }
    }
  
    // Navigate to the login page
    window.location.href = 'https://ilearn.mq.edu.au/login/';
  
    // Wait a bit for the page to load (adjust as needed)
    setTimeout(() => {
      // Click on the login link
      const loginLink = document.querySelector('a[href="/login"]');
      if (loginLink) {
        simulateClick(loginLink);
  
        // Wait for the login form to appear
        setTimeout(() => {
          // Fill in the form fields
          fillFormField('input[name="OneID"]', 'your_username');
          fillFormField('input[name="Password"]', 'your_password');
  
          // Optionally, click on the login button
          const loginButton = document.querySelector('button[name="Sign in"]');
          if (loginButton) {
            simulateClick(loginButton);
  
            // Wait for the 2FA field to appear
            setTimeout(() => {
              const totpSecret = 'YOUR_BASE32_TOTP_SECRET';
              const totpCode = generateTOTP(totpSecret);
              fillFormField('input[name="2FA"]', totpCode); // Replace with the correct selector for the 2FA input
  
              // Optionally, click on the verify button
              const verifyButton = document.querySelector('button[name="Verify"]');
              if (verifyButton) {
                simulateClick(verifyButton);
              } else {
                console.error('Verify button not found.');
              }
            }, 2000); // Adjust delay as needed
          } else {
            console.error('Login button not found.');
          }
        }, 2000); // Adjust delay as needed
      } else {
        console.error('Login link not found.');
      }
    }, 2000); // Adjust delay as needed
  });