declare module 'src/index' {
    import optionsType from 'src/types/options.d.ts';
    export const customized: (options: optionsType) => (message: string | number, ...rest: (string | number)[]) => Promise<string | string[]>;
    export const alert: (message: string) => Promise<string>;
    export const confirm: (message: string) => Promise<string>;
    export const prompt: (message: string | number, defaultAnswer: string | number) => Promise<string>;
    export const choose: (message: string | number, ...choices: (string | number)[]) => Promise<string>;
    export const choosedropdown: (message: string | number, ...choices: (string | number)[]) => Promise<string>;
    export const choosemultiple: (message: string | number, ...choices: (string | number)[]) => Promise<string[]>;

}
declare module 'src/pages' {
    export const ALERT_PAGE: string;
    export const CONFIRM_PAGE: string;
    export const PROMPT_PAGE: string;
    export const CHOOSE_PAGE: string;
    export const CHOOSE_DROPDOWN_PAGE: string;
    export const CHOOSE_MULTIPLE_PAGE: string;

}
declare module 'src/types/options' {
    export interface optionsType {
        pageBody: string,
        style: string,
        top: number,
        left: number,
        width: number,
        height: number,
        title: string
    }

}
