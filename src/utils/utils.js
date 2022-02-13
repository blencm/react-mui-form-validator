const debounce = (func, wait, immediate) => {
    let timeout;
    function cancel() {
        if (timeout !== undefined) {
            clearTimeout(timeout);
        }
    }
    class debounced {
        constructor(...args) {
            const context = this;
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
        }
    }
    debounced.cancel = cancel;
    return debounced;
};

export {
    debounce,
};
