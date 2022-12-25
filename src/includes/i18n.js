import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
export default createI18n({
  //   locale: "ar-eg" ,
  locale: "en", // default lang
  fallbackLocale: "en", // fallback if user pick up a language that having a problem
  messages: {
    en,
    fr,
  },
  numberFormats: {
    // for currencies
    en: {
      currency: {
        style: "currency",
        currency: "USD",
      },
    },
    egp: {
      currency: {
        style: "currency",
        currency: "egp",
      },
    },
  },
});
