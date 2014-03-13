Karma IEBrowsers Launcher
=========================

[Karma](http://karma-runner.github.io) browser launcher for the [IEBrowsers](https://github.com/livestax/ie-browsers) virtual machines.

This Karma plugin adds browser launchers for IEBrowsers virtual machines. This allows for testing across multiple versions of Internet Explorer simultaneously.

_Karma can be installed on a separate machine from the IEBrowsers VM as it communicates over http and web sockets._


Prerequisites
-------------

You must have installed the versions of IE on the IEBrowsers VM prior to setting them up in the Karma config.


Installation
------------

Intall the plugin from npm:
```sh
$npm install karma-iebrowsers-launcher --save-dev
```

Or from Github
```sh
$npm install 'git+https://github.com/livestax/karma-iebrowsers-launcher.git' --save-dev
```

Install the IE Browser virtual machines you wish to test against. See the [IEBrowsers Repo](https://github.com/livestax/ie-browsers) for further instructions

**Quick example of how to install IE10 via IEBrowsers:**

Visit `http://<your-vm-host-ip>/iebrowsers/iecontrol.php?action=install&version=10` in your web browser

_or_
```sh
curl "http://<your-vm-host-ip>/iebrowsers/iecontrol.php?action=install&version=10"
```

####Configue Karma

Ensure your karma.conf.js is configured to allow your karma runner to be accessed from the IEBrowsers VM (if it's on a different machine then it will need a network route between the two machines)

```javascript
module.exports = function(config) {
  config.set({

  // Ensure your hostname is set to the publicly accessible IP and not localhost
  hostname: '192.168.1.10',
  port: 9876,
  
  // Add the IEBrowsers host path to the VM controller
  iebrowsers: {
    host: 'http://192.168.1.11/ie-browsers/iecontrol.php',
  },
  
  // Set the IE Browsers you wish to test against
  browsers: ['IE8', 'IE9', 'IE10'], 
  ]

  //....

  });
};
```

Usage
-----

Run your karma tests
```sh
$ karma start
```
