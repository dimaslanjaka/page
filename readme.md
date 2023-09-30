# page source

## structure website

### page
![GitHub repo size](https://img.shields.io/github/repo-size/dimaslanjaka/page?color=red&style=flat-square) /page path public source

### root
![GitHub repo size](https://img.shields.io/github/repo-size/dimaslanjaka/dimaslanjaka.github.io?color=red&style=flat-square) https://github.com/dimaslanjaka/dimaslanjaka.github.io

last commit master (before migrated): https://github.com/dimaslanjaka/page/commit/96061003820867230c43253d7afd1a96233b6574

### install

```bash
git submodule update -i -r
touch yarn.lock
yarn install
mkdir page
```

### test dist
open terminal 1
```bash
yarn run php
```
production server available at http://localhost:4000/page

open terminal 2
```bash
yarn build:webpack && gulp page:copy
# or
yarn run build
```

## dual test

you can run dev server and production build by running `dev` task

open terminal 1
```bash
yarn run dev
```
dev server available at http://localhost:4000/page

open terminal 2
```bash
yarn run dev:php
```
production server available at http://localhost:8888/page

