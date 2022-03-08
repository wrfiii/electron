
export const doubleClick = (el: HTMLElement, cb: () => void) => {

    el.addEventListener('click',
        fo(cb, 1000)
    )
}

const fo = (fn: Function, time: number) => {

    let cont = 0;
    let timer: NodeJS.Timeout | null = null;


    return () => {

        cont++;

        if (cont === 2) {
            cont = 0;
            fn();
            timer && clearTimeout(timer)
            return
        };

        timer = setTimeout(() => {
            cont = 0
        }, time);

    }
}





