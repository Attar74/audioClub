import {
  Form as VeeForm,
  Field as VeeFiled,
  defineRule,
  ErrorMessage,
  configure,
} from "vee-validate";
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minVal,
  max_value as maxVal,
  confirmed,
  not_one_of as exculded,
} from "@vee-validate/rules";
export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeFiled", VeeFiled);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("tos", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("alpha_spaces", alphaSpaces);
    defineRule("email", email);
    defineRule("min_value", minVal);
    defineRule("max_value", maxVal);
    defineRule("passwords_mismatch", confirmed);
    defineRule("exculded", exculded);
    defineRule("country_exculded", exculded);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long.`,
          alpha_spaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
          emial: `The field ${ctx.field} must be a valid email.`,
          min_value: `The field ${ctx.field} is too low.`,
          max_value: `The field ${ctx.field} is too high.`,
          exculded: `You are not allowed to use this value fro the field ${ctx.field}.`,
          country_exculded: `Due to resrictions, We don't accept from this location.`,
          passwords_mismatch: `The Password doesn't match.`,
          tos: `You must accept the terms of service.`,
        };
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The Field ${ctx.field} is invalid.`;
        return message;
      },
    });
  },
};
