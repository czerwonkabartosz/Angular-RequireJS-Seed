<h1>Angular RequireJS Seed</h1>
This project is a base for modular project with AngularJS.

<ul>
<li>
<h3>Application</h3>
<ul>
<li>
    <a href="https://angularjs.org/">AngularJS</a> - Superheroic JavaScript MVW Framework.
  </li>
  <li>
    <a href="http://requirejs.org/">RequireJS</a> - App module loader and optimizer for javascript application files
  </li>
  <li>
    <a href="https://github.com/ded/script.js/">$script.js</a> - An asynchronous JavaScript loader used to load all libraries.
  </li>
  <li>
    <a href="http://sass-lang.com/">Sass</a> - Powerful professional grade CSS extension language.
  </li>
  <li>
    <a href="http://getbootstrap.com/">Bootstrap</a> - The most popular HTML, CSS, and JS framework.
  </li>
   <li>
    <a href="http://gulpjs.com/">Gulp</a> - The streaming build system.
  </li>
  <li>
    <a href="http://bower.io/">Bower</a> - A package manager for the web.
  </li>
  
  </ul>
  </li>
  <li>
  <h3>Testing</h3>
  <ul>
  <li>
    <a href="http://karma-runner.github.io/0.12/index.html">KarmaJS</a> - Spectacular Test Runner for Javascript.
  </li>
  <li>
    <a href="http://jasmine.github.io/">Jasmine 2.0</a> - Behavior-driven development framework for testing JavaScript code.
  </li>
  </ul>
  </li>
</ul>



<h2>Instructions</h2>
<h3>Usage</h3>

<b>Directory Layout</b>
<code>
```
build/                                  - folder with compile or build app
    css/
        style.css
    vendor/
        angularjs/
    app.js
    boot.js
    index.html
src/                                    - application source files
    modules/                            
        home/                           - module folder
            controllers/
                homeController.js
            models/
            services/
            views/
                index.tpl.html
            homeModule.js               - main file of module with declaration all of dependency 
            homeRoute.js                - routing for module
        users/                          
    styles/                             - folder for all sass styles
        style.scss
    vendor/                             - folder for libraries
        angularjs/
        angular-mocks/
    app.js                              - main file of application with declaration / registration all of modules
    boot.js                             - READONLY - file to load libraries asynchronous and run app with requirejs
    config.js                           - configuration file - config to RequireJS and vendors
    index.html                          
test/                                   
    config/
        karma.conf.js
        karmaBoot.js
    specs/
        modules/                        - test specs group by modules
            home/
                homeControllersSpec.js
            users/
Gulpfile.js
bower.json
package.json
```
</code>

<b>Example main file for module src/modules/home/homeModule.js</b>
<code>
```
(function (define) {
    'use strict';

    define([
            'home/controllers/homeController',
            'home/services/homeService',
            'home/homeRoute'
        ],
        function (HomeController, HomeService, homeRoute) {
            var moduleName = 'Home';

            angular.module(moduleName, [])
                .config(homeRoute)
                .controller('HomeController', HomeController)
                .service('HomeService', HomeService);

            return moduleName;
        });

}(define));
```
</code>

<b>Example app.js with register homeModule</b>
<code>
```
(function (define) {
    "use strict";

    define([
            'home/homeModule',
        ],
        function (homeModule) {
            var app, appName = 'app.Name';

            var depen = [
                'ngRoute',
                'templatescache',

                homeModule
            ];

            app = angular
                .module(appName, depen);

            angular.bootstrap(document.getElementsByTagName("body")[0], [appName]);

            return app;
        }
    );

}(define));
```
</code>

<b>Example src/config.js</b>
<code>
```
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define({
    vendors: {
        main: [
            'vendor/requirejs/require.js',
            'vendor/angular/angular.js',
        ],
        library: [
            'vendor/angular-route/angular-route.js',
            'vendor/jquery/dist/jquery.js'
        ],
        testLibrary:[
            'vendor/angular-mocks/angular-mocks.js'
        ]
    },
    requirejs: {
        baseUrl: '',
        paths: {
            'home': 'modules/home'
        },
        shim: {}
    }
});
```
</code>

<h3>Install</h3>

<ul>
  <li>
    Install all tools using in the application directory <code>npm install</code>.
  </li>
  <li>
    Run bower <code>bower install</code> to install all front-end dependencies.
  </li>
  <li>
    Go to start application!
  </li>
</ul>

<h3>Start the Application</h3>

<b>Compile version</b> - compile, concat, minify and optimized application.
<br/>
<b>Build version</b> - unminified and not optimized version used to local debug.

<ul>
<li>
Create build version using <code><b>gulp build</b></code>.
</li>
<li>
Create compile version using <code><b>gulp compile</b></code>.
</li>
</ul>

<h4>Run tests</h4>
Before run test <b>compile</b> or <b>build</b> application and then using <code><b>gulp test</b></code>.

<h4>Local server</h4>
Start application with local server with default configuration <a href="http://localhost:8080">http://localhost:8080</a>
<ul>
<li>
Create build version and start local server <code><b>gulp run-build-server</b></code>
</li>
<li>
Create compile and start local server <code><b>gulp run-compile-server</b></code>
</li>
</ul>
