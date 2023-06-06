import { IInput } from "@/components/atoms/AInput/interfaces/index";

export const email: IInput = {
    id: `email`,
    label: ``,
    type: `email`,
    icon: `email`,
    modelValue: ``,
    error: ``,
    placeholder: `example@domain.com`,
    validation: [`required`, `email`],
};

export const password: IInput = {
    id: `password`,
    label: ``,
    type: `password`,
    modelValue: ``,
    error: ``,
    placeholder: `Password`,
    validation: [`required`, 'password'],
};
