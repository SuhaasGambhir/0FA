import re
from playwright.sync_api import Playwright, sync_playwright, expect
# -- for totp
import base64
import hmac
import struct
import time
# import pyotp



from config import details as details


# source: https://github.com/susam/mintotp?tab=readme-ov-file
def totp(key, time_step=30, digits=6, digest='sha1'):
    key = base64.b32decode(key.upper() + '=' * ((8 - len(key)) % 8))
    counter = struct.pack('>Q', int(time.time() / time_step))
    mac = hmac.new(key, counter, digest).digest()
    offset = mac[-1] & 0x0f
    binary = struct.unpack('>L', mac[offset:offset+4])[0] & 0x7fffffff
    return str(binary)[-digits:].zfill(digits)

passw = totp(details.key)

def run(playwright: Playwright) -> None:
    # browser = playwright.chromium.launch(headless=False)  # Chrome
    browser = playwright.webkit.launch(headless=False)      # Edge?
    context = browser.new_context()
    page = context.new_page()
    page.goto("https://ilearn.mq.edu.au/login/")
    page.get_by_role("link", name="Login", exact=True).click()
    page.get_by_label("Student ID / OneID").fill(details.username) # OneID
    page.get_by_label("Student ID / OneID").press("Tab")
    page.get_by_label("Password").fill(details.password) # Password
    page.get_by_role("button", name="Sign in").click()
    page.get_by_label("Enter code").click()
    page.get_by_label("Enter code").fill(passw) # 2FA
    page.get_by_role("button", name="Verify").click()
    time.sleep(5)
    
    # ---------------------
    # context.close()
    # browser.close()


with sync_playwright() as playwright:
    run(playwright)
