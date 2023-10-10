import type { App } from 'vue'
import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minVal,
  max_value as maxVal,
  confirmed,
  not_one_of as excluded
} from '@vee-validate/rules'

export default {
  install(app: App) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('email', email)
    defineRule('min_value', minVal)
    defineRule('max_value', maxVal)
    defineRule('passwords_mismatch', confirmed)
    defineRule('excluded', excluded)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `To pole ${ctx.field} jest wymagane.`,
          min: `To pole ${ctx.field} ma za mało znaków.`,
          max: `To pole ${ctx.field} ma za dużo znaków.`,
          alpha_spaces: `To pole ${ctx.field} może zawierać tylko znaki alfabetu i spacje.`,
          email: `To pole ${ctx.field} musi być prawidłowym adresem e-mail.`,
          min_value: `To pole ${ctx.field} ma zbyt mała wartośc.`,
          max_value: `To pole ${ctx.field} ma za dużą wartość.`,
          excluded: `Nie wolno używać tej wartości dla pola ${ctx.field}.`,
          passwords_mismatch: 'Hasła nie pasują'
        }

        // Zwróć odpowiednią wiadomość błędu
        // Sprawdzanie, czy ctx.rule jest zdefiniowany
        if (ctx.rule) {
          return (
            messages[ctx.rule.name as keyof typeof messages] ??
            `Pole ${ctx.field} jest nieprawidłowe.`
          )
        } else {
          // Zwracanie domyślnej wiadomości błędu, gdy ctx.rule jest undefined
          return `Pole ${ctx.field} jest nieprawidłowe.`
        }
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    })
  }
}
