import path from 'path';
import carlo from 'carlo';

const ALERT_PAGE = 'alert.html';
const CONFIRM_PAGE = 'confirm.html';
const PROMPT_PAGE = 'prompt.html';
const CHOOSE_PAGE = 'choose.html';
const CHOOSE_DROPDOWN_PAGE = 'choosedropdown.html';
const CHOOSE_MULTIPLE_PAGE = 'choosemultiple.html';

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

const defaultOptions = {
    pageBody: ALERT_PAGE,
    style: defaultStyle,
    top: 0,
    left: 0,
    width: 192 * 2,
    height: 108 * 2,
    title: '?'
};
const customized =  ({
    pageBody = defaultOptions.pageBody,
    style = defaultOptions.style,
    top = defaultOptions.top,
    left = defaultOptions.left,
    width = defaultOptions.wdith,
    height = defaultOptions.height,
    title = defaultOptions.title
} = defaultOptions) => async (message, ...rest) => new Promise(async (resolve, reject) => {
    const app = await carlo.launch();
    app.serveFolder(path.join(__dirname, 'pages'));
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

const alert = customized();
const confirm = customized({pageBody:CONFIRM_PAGE});
const prompt = customized({pageBody:PROMPT_PAGE});
const choose = customized({ pageBody: CHOOSE_PAGE });
const choosedropdown = customized({pageBody:CHOOSE_DROPDOWN_PAGE});
const choosemultiple = customized({ pageBody: CHOOSE_MULTIPLE_PAGE });

export { alert, confirm, prompt, choose, choosedropdown, choosemultiple, customized };
