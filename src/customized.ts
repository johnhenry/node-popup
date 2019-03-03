import {join} from 'path';
import carlo from 'carlo';
import { ALERT_PAGE } from './pages.ts';

const a = 1;
interface optionsType {
    pageBody: string,
    style: string,
    top: number,
    left: number,
    width: number,
    height: number,
    title: string
}

const defaultStyle = `
body {
    text-align: center;
}
body div, body div label{
    display:block;
}
body select,
body input,
body button {
    display: inline-block;
}

button#ok::before {
    content: 'OK';
}

button#cancel::before {
    content: 'Cancel';
}

`;

const defaultOptions: optionsType = {
    pageBody: ALERT_PAGE,
    style: defaultStyle,
    top: 0,
    left: 0,
    width: 192 * 2,
    height: 108 * 2,
    title: '?'
};

const customized = ({
    pageBody = defaultOptions.pageBody,
    style = defaultOptions.style,
    top = defaultOptions.top,
    left = defaultOptions.left,
    width = defaultOptions.width,
    height = defaultOptions.height,
    title = defaultOptions.title
}: optionsType = defaultOptions) => async (message:string|number, ...rest:(string|number)[]) => new Promise(async (resolve, reject) => {
    const app = await carlo.launch();
    app.serveFolder(join(__dirname, '..', 'pages'));
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


export { customized };
