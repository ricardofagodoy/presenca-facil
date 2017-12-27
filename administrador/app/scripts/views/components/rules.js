import React from 'react';
// NOTE: Deprecated
import Validation from 'react-validation';
// From v2.10.0
// import { rules, Form, Input, Select, Textarea, Button } from 'react-validation/lib/build/validation.rc'
import validator from 'validator';

// Use Object.assign or any similar API to merge a rules
// NOTE: IE10 doesn't have Object.assign API natively. Use polyfill/babel plugin.
Object.assign(Validation.rules, {
    // Key name maps the rule
    required: {
        // Function to validate value
        // NOTE: value might be a number -> force to string
        rule: value => {
            return value.toString().trim();
        },
        // Function to return hint
        // You may use current value to inject it in some way to the hint
        hint: value => {
            
        }
    },
    email: {
        // Example usage with external 'validator'
        rule: value => {
            return validator.isEmail(value);
        },
        hint: value => {
            return <span className='form-error is-visible'>{value} não é um e-mail válido.</span>
        }
    },
    // This example shows a way to handle common task - compare two fields for equality
    password: {
        // rule function can accept argument:
        // components - components registered to Form mapped by name
        rule: (value, components) => {
            const password = components.password.state;
            const passwordConfirm = components.passwordConfirm.state;
            const isBothUsed = password
                && passwordConfirm
                && password.isUsed
                && passwordConfirm.isUsed;
            const isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;

            if (!isBothUsed || !isBothChanged) {
                return true;
            }

            return password.value === passwordConfirm.value;
        },
        hint: () => <span className="form-error is-visible">As senhas devem ser iguais.</span>
    },
    numeric: {
        rule: value => {
            return validator.isNumeric(value);
        },
        hint: value => {
            return <span className='form-error is-visible'>Deve conter apenas numeros.</span>
        }
    },
    alphaNumeric: {
        rule: value => {
            return validator.isAlphanumeric(value);
        },
        hint: value => {
            return <span className='form-error is-visible'>Deve conter apenas letras e numeros.</span>
        }
    },
    alphaNumericWithSpaces: {
        rule: value => {
            return validator.isAlphanumeric(value.replace(/ /g,''));
        },
        hint: value => {
            return <span className='form-error is-visible'>Deve conter apenas letras e numeros.</span>
        }
    },
});