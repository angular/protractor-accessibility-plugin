Accessibility Plugin
====================

Protractor comes with support for two accessibility testing options:
 * Accessibility Developer Tools
 * Tenon.io

Protractor will run each set of audits (depending on your configuration) on your existing end-to-end
tests to ensure your site is free of obvious errors. In this kind of testing, there is no concept of
"warnings"–only pass or fail. In your configuration, you can decide whether warnings should
pass or fail your build.

To understand how each of these tools can be used, see this support matrix:

| Testing Library                      | Pricing                                   | API Key | External Request | No. of Tests | Info                                                                    |
|--------------------------------------|-------------------------------------------|---------|------------------|--------------|-------------------------------------------------------------------------|
| Chrome Accessibility Developer Tools | Free                                      | No      | No               | 14           | [Github](https://github.com/GoogleChrome/accessibility-developer-tools) |
| Tenon.io                             | Free limited accounts, paid subscriptions | Yes     | Yes              | 63           | [Tenon.io](http://tenon.io/)                                            |

Protractor now supports the [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools), the same audit library used by the [Chrome browser extension](https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb?hl=en). Protractor
[runs an audit](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules)
locally by injecting the Dev Tools script into WebDriver pages, and it can diagnose issues including
missing labels, incorrect ARIA attributes and color contrast. This is a great starting point if
you can't send source code over the wire through an API.

[Tenon.io](http://www.tenon.io) has a more robust set of tests to help you find
accessibility issues, but it requires [registering](http://tenon.io/register.php) for an API key
and making an external request for each test, which may not work for everyone. Some people use
Tenon with introspection services like ngrok or localtunnel to securely
test local web servers. Protractor takes the [options you provide](http://tenon.io/documentation/understanding-request-parameters.php) in the plugin configuration and sends them
with the page source to the Tenon API. One limitation of this approach is that all scripts must be reachable from the page source as a string, for example, by using a CDN.
For projects with an MIT license, Tenon is free but with a limited
daily API limit. Paid subscriptions are available for enterprise and commercial projects.

Enable this plugin in your config file:
```js
  // Chrome Accessibility Dev Tools only:
  exports.config = {
      ...
      plugins: [{
        chromeA11YDevTools: {
          treatWarningsAsFailures: true
        },
        package: 'protractor-accessibility-plugin'
      }]
    }
```
```js
  // Tenon.io only:
  exports.config = {
      ...
      plugins: [{
        tenonIO: {
          options: {
            // See http://tenon.io/documentation/understanding-request-parameters.php
            // options.src will be added by the test.
          },
          printAll: false, // whether the plugin should log API response
        },
        chromeA11YDevTools: true,
        package: 'protractor-accessibility-plugin'
      }]
    }
```
