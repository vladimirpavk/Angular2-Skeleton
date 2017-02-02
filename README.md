# Angular2 Skeleton - new libs
Node, Express, TypeScript, Gulp, BrowserSync, Angular2 application skeleton.

Provided for developing **Angular2** applications using **Typescript** served over **node-express** server.

### Prerequisites
Must have node and npm installed

### How to use
Install node dependencies in your project root directory (this is where the 'package.json' file is located) using:
```sh
$ npm install
``` 
Install typescript definitions using:
```sh
$ typings install
```

Start application with 
```sh
$ gulp
```

Application will be initialy compiled and started. By default the server is listening on port 3036. Client application (Angular2) can be accessed through your web browser on the following url **localhost:3036/angular**. If everything is ok you should see the message *Proba*. displayed in your browser.

### Under the hood

**Server application** in *typescript* and transpiled application are located in **./server** folder. Build application using **gulp** build system. 

**Server application** is **node-express** web server initialy configured to listen for requests on **localhost:3036**. All request are redirected to SPA Angular2 application.

BrowserSync is proxing from **localhost:3000**.   


**Client application** in *typescript* and transpiled application are located in **./client/app** folder.

Folder **./client/app/** contains following *TypeScript* files

```
app.component.ts
app.module.ts
main.ts
```
taken from the official Angular2 web page quickstart https://angular.io