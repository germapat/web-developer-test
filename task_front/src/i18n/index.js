/**
 * Vue i18n
 *
 * @library
 *
 * http://kazupon.github.io/vue-i18n/en/
 */

// Lib imports
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import es from '../locales/es.json'
import en from '../locales/en.json'

Vue.use(VueI18n)

const messages = {
  en: en,
  es: es
}

const i18n = new VueI18n({
  locale: 'es',
  fallbackLocale: 'en',
  messages
})

export default i18n
