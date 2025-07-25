import {app, BrowserWindow} from 'electron'
import {HOME, PATH_VIEW, UNIX_LIKE_OS} from '../const/arc'

/**
 * This class has the responsability of manage the core initialization
 */
export class AppSystem {
    static window: BrowserWindow;
    private static initialized: boolean = false;

    /**
     * initializes the app
     */
    static init():void {
        if (this.initialized)
            return;
        this.initialized = true

       let create = () => {
            let initWindow = () => {
                AppSystem.window = new BrowserWindow({width:800, height: 600}) // @TODO: change to a well configured constant
                AppSystem.window.loadFile(HOME, {baseURLForDataURL:PATH_VIEW})
            }
            initWindow()

            app.on('activate', () => {
                initWindow()
            })
        }
        let onDestroy = () => {
            if(process.platform !== UNIX_LIKE_OS)
                app.quit()
        }

        app.whenReady().then(create)
        app.on('window-all-closed', onDestroy)

    }
}