const appWindow = (window as Window) as IAppWindow;

const config = {
    ...(appWindow.env ?? {}),
};

export default config;
