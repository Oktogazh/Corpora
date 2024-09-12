# Changelog

## [0.4.6](https://github.com/Oktogazh/Corpora/compare/corpora-v0.4.5...corpora-v0.4.6) (2024-09-12)


### ⚠️ Changes

* **docs and home page:** minor changes ([ee23364](https://github.com/Oktogazh/Corpora/commit/ee23364a8079cb3d62b57375c7192021fc4e5cae))


### 🐞 Bug Fixes

* **module importation:** edit config to make function deployable ([87135af](https://github.com/Oktogazh/Corpora/commit/87135af8c18dfca543c8db10b7f6763d918c1508))
* **post form:** limit size and add rules ([94c4925](https://github.com/Oktogazh/Corpora/commit/94c492543d7703b97b5f1a684c6196c3d341de34))


### ✨  New

* **posting flow:** starting the callable responsible for posting segments ([3da7c19](https://github.com/Oktogazh/Corpora/commit/3da7c19dd7739f83e22936b76f30abc644050893))

## [0.4.5](https://github.com/Oktogazh/Corpora/compare/corpora-v0.4.4...corpora-v0.4.5) (2024-09-08)


### ✨ Polish

* **function:** double quote ([5895fc8](https://github.com/Oktogazh/Corpora/commit/5895fc822e3b45f6df1e901f073418919b92fe25))
* **home:** convert to the composition API ([1f28f6a](https://github.com/Oktogazh/Corpora/commit/1f28f6a50ada4125a724514e10a276289d96c358))
* type definition for query in home page ([e7f85f7](https://github.com/Oktogazh/Corpora/commit/e7f85f76bffb93e37307e7aab11da2ef2167d899))


### ✨  New

* language selector in the posting interface ([cdb057e](https://github.com/Oktogazh/Corpora/commit/cdb057e49dddf9191e550ac2681737a0e5add589))
* registry of languages an scripts to generate ietf language tags ([ea1d559](https://github.com/Oktogazh/Corpora/commit/ea1d5594b64e7746fe85e95f66daca3f6d071efd))

## [0.4.4](https://github.com/Oktogazh/Corpora/compare/corpora-v0.4.3...corpora-v0.4.4) (2024-09-01)


### ⚠️ Changes

* **docs:** updated the docs with new requirements ([14287e0](https://github.com/Oktogazh/Corpora/commit/14287e099c159f5d5d2243533b7b6e965f53dd19))


### 🐞 Bug Fixes

* **user flow:** remove displayName when failing to claim unique username ([587c8e7](https://github.com/Oktogazh/Corpora/commit/587c8e71868df15da4ce85a86cba0e6dddf07bee))


### ✨  New

* **posting flow:** created a text area ([0ca3b51](https://github.com/Oktogazh/Corpora/commit/0ca3b51a82af146b5f6e2e4b9fe7188ada277f10))
* **pwd reset form:** sends the email and shows a toast afterwards ([606b7d5](https://github.com/Oktogazh/Corpora/commit/606b7d59e1eda22305942f7261057a0fda2d47b5))
* **user:** delete unique username document when user is deleted ([d538869](https://github.com/Oktogazh/Corpora/commit/d538869e4646eddc597b2ddf384817cff0a44259))

## [0.4.3](https://github.com/Oktogazh/Corpora/compare/corpora-v0.4.2...corpora-v0.4.3) (2024-08-29)


### ⚠️ Changes

* **forgot pwd request form:** update the form ([a87f99a](https://github.com/Oktogazh/Corpora/commit/a87f99a064621935b8430f13a049737c40ea8668))

## [0.4.2](https://github.com/Oktogazh/Corpora/compare/corpora-v0.4.1...corpora-v0.4.2) (2024-08-29)


### ✨  New

* created a password reset request page ([7622b23](https://github.com/Oktogazh/Corpora/commit/7622b2328b29f55af942ae70d7b3f4114962456f))

## [0.4.1](https://github.com/Oktogazh/Corpora/compare/corpora-v0.4.0...corpora-v0.4.1) (2024-08-29)


### ✨ Polish

* **interface:** made sidebar part of the header, and its state managed by the store ([b1128a3](https://github.com/Oktogazh/Corpora/commit/b1128a3d3cd1a174b303c13c521ad292ec45fc29))
* **toasts:** can now have several toasts, which have styles and actions props ([276acb1](https://github.com/Oktogazh/Corpora/commit/276acb1e149ef9a38623e6899bf3b57a80d7f00d))


### ✨  New

* **interface:** set up a toast system to display errors managed in the store app ([d188fa0](https://github.com/Oktogazh/Corpora/commit/d188fa0f6d2aa6a6e91af94767d97b8c7977e026))
* **log in form:** validate form before log in ([4ca6e44](https://github.com/Oktogazh/Corpora/commit/4ca6e44e7215df639e6c2888c41efc5a8aae91aa))
* **sign up form and settings:** integrate errors to the toast system ([6b92793](https://github.com/Oktogazh/Corpora/commit/6b9279348ac278efcd1d9fd378387ee265531b2f))

## [0.4.0](https://github.com/Oktogazh/Corpora/compare/corpora-v0.3.0...corpora-v0.4.0) (2024-08-27)


### 🚀 Features

* **settings:** now can delete accounts ([c865d02](https://github.com/Oktogazh/Corpora/commit/c865d028c78b9a936fa6641c42c7ae5c16dcafc1))


### 🐞 Bug Fixes

* **log in form:** claim username when login in for the first time ([2c10a03](https://github.com/Oktogazh/Corpora/commit/2c10a034df4ca8d58fdbfff22b02fbb873878709))


### ✨  New

* **i18n:** add the firebase auth error messages ([7ac1f97](https://github.com/Oktogazh/Corpora/commit/7ac1f9738994e9f2fd77d842cde8772b963db87c))

## [0.3.0](https://github.com/Oktogazh/Corpora/compare/corpora-v0.2.2...corpora-v0.3.0) (2024-08-26)


### 🚀 Features

* **auth:** email based sign up ([809cb1c](https://github.com/Oktogazh/Corpora/commit/809cb1ce3c796d694c4127fec41255d49c36d245))

## [0.2.2](https://github.com/Oktogazh/Corpora/compare/corpora-v0.2.1...corpora-v0.2.2) (2024-08-26)


### ✨  New

* **sign up form:** installed v-switch and password validation ([f0e154a](https://github.com/Oktogazh/Corpora/commit/f0e154aafca143d8b9af9eadc754613b0aee1aac))
* **sign up form:** introduce unique_username validator and its dedicated collection ([498e0b3](https://github.com/Oktogazh/Corpora/commit/498e0b3ec388ffe3ce94142ab7e8c27142b11ffb))
* **sign up form:** username step layout ([dff49c7](https://github.com/Oktogazh/Corpora/commit/dff49c7a191850140a119bca87e2587d80db79c1))
* **sign up form:** v-switch in the form container ([bdfe8fa](https://github.com/Oktogazh/Corpora/commit/bdfe8fa3fc4af20bf534a8e78371a28420df2c3a))

## [0.2.1](https://github.com/Oktogazh/Corpora/compare/corpora-v0.2.0...corpora-v0.2.1) (2024-08-23)


### 🐞 Bug Fixes

* redirect from log in when connected ([66397fb](https://github.com/Oktogazh/Corpora/commit/66397fbba524901ff3f16e31755b551e1354369b))
* **router:** redirect to home page on log out ([875408b](https://github.com/Oktogazh/Corpora/commit/875408bf44866c7f83439464cd75e3eb76db3cf3))


### ✨ Polish

* **sign up form:** completed the stepper ([a6c3c19](https://github.com/Oktogazh/Corpora/commit/a6c3c1938a6e00ce765d02a7a7c23d50e7324557))


### ✨  New

* **sign up form:** installed vuelidate and add it to the email field ([00335c0](https://github.com/Oktogazh/Corpora/commit/00335c0a0db53d4f9fd11fd6f27416d9a3483122))
* **sign up view:** stepper ([740289a](https://github.com/Oktogazh/Corpora/commit/740289a8063a867d1e380d8c6000f633a854e80d))

## [0.2.0](https://github.com/Oktogazh/Corpora/compare/corpora-v0.1.0...corpora-v0.2.0) (2024-08-19)


### 🚀 Features

* **auth:** can log out ([31f8b2c](https://github.com/Oktogazh/Corpora/commit/31f8b2c70f2328d5de6a03041a3eb4477363e606))

## [0.1.0](https://github.com/Oktogazh/Corpora/compare/corpora-v0.0.3...corpora-v0.1.0) (2024-08-18)


### 🚀 Features

* **auth:** can connect with google ([7feeda2](https://github.com/Oktogazh/Corpora/commit/7feeda2716483c5517356a35713dbef74d515d30))


### ✨ Polish

* **log in view:** complete the interface ([5afd128](https://github.com/Oktogazh/Corpora/commit/5afd128dd13f2d29ce590eb24d9a49e36463d7ab))


### ✨  New

* **log in view:** Google button and password based loging interface ([e2c1dd6](https://github.com/Oktogazh/Corpora/commit/e2c1dd68a5a7bb6b8ebad47fa85f1695e41b9dd1))

## [0.0.3](https://github.com/Oktogazh/Corpora/compare/corpora-v0.0.2...corpora-v0.0.3) (2024-08-17)


### ✨  New

* buttons on the log in view ([276e229](https://github.com/Oktogazh/Corpora/commit/276e2294c973dfaa4dbf33630a56d8726155a9aa))

## [0.0.2](https://github.com/Oktogazh/Corpora/compare/corpora-v0.0.1...corpora-v0.0.2) (2024-08-15)


### ✨ Polish

* layout, route paths, style scope of the changelog ([f0babb1](https://github.com/Oktogazh/Corpora/commit/f0babb1af15d0dec0fa93200cbb7521798d6e10b))


### ✨  New

* change log page created ([5161d75](https://github.com/Oktogazh/Corpora/commit/5161d75f04fd217f2f3610496c4587e0b1bd98f4))

## 0.0.1 (2024-08-13)


### ⚠️ Changes

* color variables ([97db25a](https://github.com/Oktogazh/Corpora/commit/97db25a4c5b5c0873218c1f735355432ac9dd2b1))


### ✨ Polish

* pages ([c21989b](https://github.com/Oktogazh/Corpora/commit/c21989b7b13423ba4636d2a6c038e722aa3227e9))


### 🧰 Other

* create the repo ([41fc55f](https://github.com/Oktogazh/Corpora/commit/41fc55fa6f5f0cb9e08e123da0bb4eb46904605c))
* **HomeView:** section ([1b19147](https://github.com/Oktogazh/Corpora/commit/1b1914701784cee32ca5b836e3587e9255967345))
* internationalization ([efd35d2](https://github.com/Oktogazh/Corpora/commit/efd35d2f86acb13846b03f15429a75a4505dca3b))
* navigation ([e0ad5a2](https://github.com/Oktogazh/Corpora/commit/e0ad5a29ddc952a02ff2289ecb873b099860e184))
* shadcn-vue and its skeleton loader ([16b7a27](https://github.com/Oktogazh/Corpora/commit/16b7a27982e5da5637d76b5dcf6864b4309ba494))
