import { readFileSync } from 'fs';
import { join } from 'path';
import carlo from 'carlo';
import { ALERT_PAGE } from './pages.ts';
import optionsType from './types/options.d.ts';
import {
    CONFIRM_PAGE,
    PROMPT_PAGE,
    CHOOSE_PAGE,
    CHOOSE_DROPDOWN_PAGE,
    CHOOSE_MULTIPLE_PAGE
} from './pages.ts';
const defaultStyle = readFileSync(join(__dirname, '../static/style.css'), 'utf8');

const defaultOptions: optionsType = {
    pageBody: ALERT_PAGE,
    style: defaultStyle,
    top: 0,
    left: 0,
    width: 192 * 2,
    height: 108 * 2,
    title: '?'
};

export const customized = ({
    pageBody = defaultOptions.pageBody,
    style = defaultOptions.style,
    top = defaultOptions.top,
    left = defaultOptions.left,
    width = defaultOptions.width,
    height = defaultOptions.height,
    title = defaultOptions.title
}: optionsType = defaultOptions) => async (message: string | number, ...rest: (string | number)[]) => new Promise(async (resolve, reject) => {
    const app = await carlo.launch();
    app.serveFolder(join(__dirname, '..', 'static'));
    await app.exposeFunction('info', () => ({
        message,
        rest,
        style,
        title
    }));
    await app.exposeFunction('resolve', (data) => {
        resolve(data);
        app.exit();
    });
    await app.exposeFunction('reject', (data) => {
        reject(data);
        app.exit();
    });
    const window = app.mainWindow();
    window.setBounds({
        top,
        left,
        width,
        height
    });
    window.onbeforeunload = () => reject(new Error('window unloaded'));
    await app.load(pageBody);
});

export const alert: (message: string) => Promise<string>
    = customized({ title: 'Alert' }) as (message: string) => Promise<string>;
export const confirm
    = customized({ pageBody: CONFIRM_PAGE, title: 'Confirm' }) as (message: string) => Promise<string>;
export const prompt
    = customized({ pageBody: PROMPT_PAGE, title: 'Prompt' }) as (message: string | number, defaultAnswer: string | number) => Promise<string>;
export const choose
    = customized({ pageBody: CHOOSE_PAGE, title: 'Choose' }) as (message: string | number, ...choices: (string | number)[]) => Promise<string>;
export const choosedropdown
    = customized({ pageBody: CHOOSE_DROPDOWN_PAGE, title: 'Choose' })as (message: string | number, ...choices: (string | number)[]) => Promise<string>;
export const choosemultiple
    = customized({ pageBody: CHOOSE_MULTIPLE_PAGE, title: 'Choose Multiple' }) as (message: string | number, ...choices: (string | number)[]) => Promise<string[]>;
