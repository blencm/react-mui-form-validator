const debounce = <T extends any[]>(func: (...args: T) => void, wait: number, immediate: boolean) => {
    let timeout: any;
    function cancel() {
        if (timeout !== undefined) {
            clearTimeout(timeout);
        }
    }
    const debounced = function debounced(...args: T) {
        const context = args;
        const later = function delayed() {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
    debounced.cancel = cancel;
    return debounced;
};

export {
    // eslint-disable-next-line
    debounce,
};