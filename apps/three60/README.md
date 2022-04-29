# three60

An **application package** that runs a 360 webapp

## Startup
Run both commands simultaniously 
1. `npm run start360` start the nextjs web server
2. `npm run start360ssl` fire up a proxy from nextjs to port 3000, adding HTTPS/SSL
3. From a VR headset or mobile phone, visit https://you.desktop.ip.address:3000
4. Tell the browser to "proceed anyway" past SSL/HTTPS errors (its a self-signed SSL)
5. At the bottom of the screen, click [enter VR] button at bottom of screen

## Tips
- Enable remote debugging on the device (android [1](https://developer.android.com/studio/debug/dev-options.html) and [2](https://developer.android.com/studio/command-line/adb) or setup with a [quest](https://developer.oculus.com/documentation/web/browser-remote-debugging/))
- On your dev machine, visit chrome://inspect/#devices
