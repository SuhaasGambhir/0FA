@echo off
start msedge.exe --disable-web-security --user-data-dir="%LOCALAPPDATA%\Temp\Edge dev session" --incognito "file://%cd%/index.html"