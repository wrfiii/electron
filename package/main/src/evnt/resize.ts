let isMaxSize = false;
import getWindow from '../main';

export const resizeWindow = () => {
    
    isMaxSize = !isMaxSize;

    const win = getWindow();

    if (isMaxSize) {
        win.maximize()
    } else {
        win.unmaximize()
    }

}
