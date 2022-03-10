
export const doubleClick = (el: HTMLElement, cb: () => void) => {
    el.addEventListener('click',
        function (event) {
            event.stopPropagation();
            fo(cb, 300)
        }
    )
}
let cont = 0;
let timer: NodeJS.Timeout | null = null;

const fo = (fn: Function, time: number) => {

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





