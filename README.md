# Smart Poultry Laboratory

## Used Technologies
Smart Poultry Laboratory uses a number of open source projects to work properly:

- [NodeJS](https://nodejs.org) -  JavaScript runtime built on Chrome's V8 JavaScript engine.
- [MySQL](https://www.mysql.com/) - fully managed database service to deploy cloud-native applications
- [Vue](https://vuejs.org/) - Progressive JavaScript Framework for building reactive single page applications
- [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.

## _Backend-Group Tasks_

### Tasks list (Mohamed Shawky)

- [x] Create project and folders structure
- [ ] Setup Database migrations         (due 07/05/2021)
- [ ] Users api CRUD endpoints          (due 07/05/2021)
- [ ] Implement JWT Authentication      (due 07/05/2021)
- [ ] PostMortem api CRUD endpoints     (due 09/05/2021)

### Tasks list (Omar Baz)

- [ ] Owners api CRUD endpoints     (due 08/05/2021)
- [ ] Farms api CRUD endpoints      (due 08/05/2021)

## _Frontend-Group Tasks_

### Tasks list (Ali Gamal)

- [ ] Design Owners Page         (due 07/05/2021)
- [ ] Design Farms Page          (due 08/05/2021)
- [ ] Design PostMortem Page     (due 09/05/2021)
  
### Tasks list (Lo'ay Mokhtar)

- [ ]  Design PostMortem Page     (due 09/05/2021)
- [ ]  Design Profile Page        (due 08/05/2021)
- [ ]  Design Settings Page       (due 09/05/2021)


## _Database-Group Tasks_

### Tasks list (Ahmed Saify)

- [ ] Draw the base ERD (due 07/05/2021)
- [ ] Create first database model (due 07/05/2021)


## Installation

### Includes
* Nest CLI
* Vue CLI 3
* Vue Router
* Vuex

## Directory Structure

- `root`: Project root holds all the fies of the project
    - `apps`: Holds client(VueJS) and server(NestJS) projects (You can add any client or server frameworks in here in addition or replace with existing ones. See section `Add other frameworks` in `How To`)
        - `vue`: A Vue project created using vue-cli
        - `nest`: A Nest project created using nest-cli
    - `libs`: Holds all the common codes you can share between projects
        - `shared`: A shared module for common code sharing across projects in this work space.


## Prerequisites

Before getting started you should have the following installed and running:

- [x] Node.js - [instructions](https://nodejs.org/en/download/)
- [X] Yarn - [instructions](https://yarnpkg.com/en/docs/install)
- [X] Vue CLI 3 - [instructions](https://cli.vuejs.org/guide/installation.html)
- [X] NestJs- [instructions](https://docs.nestjs.com/)
  
## Setup Project
Clone Repo
```
$ git clone https://github.com/SmartPoultryLab/SmartPoultryLab.git
$ cd SmartPoultryLab
```

Setup
```
$ yarn install
```

## Scripts

* `yarn dev:all:start` - Starts Development server for shared, vue and nest,
* `yarn dev:all:build` - Builds shared, vue and nest,
* `yarn dev:vue:start` - Starts vue development nest,
* `yarn dev:vue:build` - Builds vue,
* `yarn dev:vue:lint` - Lints vue,
* `yarn test:vue:unit` - Unit testing for vue,
* `yarn test:vue:e2e` - End to End testing for vue,
* `yarn dev:nest:start` - Starts nest development server,
* `yarn dev:nest:build` - Builds nest,
* `yarn dev:nest:lint` - Lints nest,
* `yarn prod:nest:start` - Starts nest in production mode,
* `yarn dev:shared:start` - Starts shared development nest,
* `yarn dev:shared:build` - Builds shared,
* `yarn dev-shared:vue:start` - Starts shared and vue in development mode,
* `yarn dev-shared:nest:start` - Starts shared and nest in development mode,
* `yarn dev-shared:vue:build` - Builds shared and vue,
* `yarn dev-shared:nest:build` - Builds shared and nest,
* `yarn utils:remove-node-modules` - Removes all node_modules folders