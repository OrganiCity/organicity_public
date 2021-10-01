# vuetify-nuxt-webpage

## Table of Contents

- [vuetify-nuxt-webpage](#vuetify-nuxt-webpage)
  - [Table of Contents](#table-of-contents)
  - [Build Setup](#build-setup)
  - [Description](#description)
  - [Component Structure](#component-structure)
    - [Header](#header)
    - [Grid System](#grid-system)
  - [Store](#store)
  - [Translations](#translations)
  - [Other](#other)
    - [Toasts](#toasts)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
## Description
All of the information under this text covers the most delicate parts of vuetify and solutions for the issues that I had to deal with. Advanced information and tutorials about vuetify can be found on its [documentation webpage](https://vuetifyjs.com).
## Component Structure
### Header
- The `app` prop should **NEVER** be removed from `<v-app-bar>` component to keep things working properly. This prop makes the header fixed by default (Another `fixed` prop is not needed). To disable this function (to make header stay at its initial position), the `absolute` prop can be added.
- The `dense` prop can be added to `<v-app-bar>` for decreasing the height of the header (removes default y-paddings). 
- The Header component has flex inside it by default. Following css code can be added inside **scoped** style tags to override this functionality and make custom layout by containers, rows, cols, d-flex etc. :
```css
.app-bar >>> .v-toolbar__content {
  display: block !important;
}
```
### Grid System
- `v-row` and `v-col` components must **ALWAYS** reside in `v-container` components. Otherwise extra spaces may appear at the edges of the page on mobile devices.
- If there is too much padding/margin around `v-row` components, `no-gutters` prop can be added to remove them.
- `v-col` components can be sized with its unique props. Adding the smallest sized prop automatically applies to bigger sizes:
    - `cols`: Mobile
    - `sm`: Mini-Tablets
    - `md`: Tablets
    - `lg`: Laptops
    - `xl`: Big Screens
## Store
All the information that must be saved such as user's preferences should be saved under **persistent store** files. `preferences.js` and `auth.js` files are examples of persistent store. 

To open a new store file with persistent state, edit `persisted-state.js` file inside `/plugins` folder as shown:

```js
export default ({ store }) => {
    createPersistedState({ paths: ['auth', 'preferences', 'new-store-name'] })(store)
}
```
## Translations
A text can be made multi-lingual by adding its translation with a keyword to language files that can be found inside `/translations` folder. Translation can be used anywhere in the app by calling the function: 

```js
this.$i18n('keyword')
```
## Other
### Toasts
A toast can be displayed anywhere in the app by using a function like following:
```js
this.$toast('Default toast')

this.$toast.info('Info toast')

this.$toast('Custom options', {
	color: 'green',
	dismissable: true,
	queueable: true
})

this.$toast.custom('Custom short') // Can be found under "shorts" array in /plugins/toaster.js

this.$toast(null, {
	slot: [this.$createElement('button', ['Click here'])]
})
```
Properties of toasts like message, color, etc. can be found in the documentation of [vuetify-toast-snackbar](https://github.com/eolant/vuetify-toast-snackbar)