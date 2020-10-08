export const createMask = (element) => {
    let keyCode;

    const mask = (event) => {
        event.keyCode && (keyCode = event.keyCode);
        const position = element.selectionStart;
        if (position < 3 && event.keyCode != 35 && event.keyCode != 39) {
            event.preventDefault();
            element.selectionStart = element.value.length;
        }
        element.value = checkMask(event, element.value);
        if (element.value[1] == '9') {
            let valueArr = element.value.split('');
            valueArr.splice(1, 0, '7');
            let strValue = valueArr.join('');
            strValue = strValue.replace(/[^+\d]/g, '');
            element.value = checkMask(event, strValue)
        } else {
            element.value = element.value.replace(element.value[1], '7');
        }
    }

    const checkMask = (event, value) => {
        const matrix = "+7 (___) ___-____";
        let i = 0;
        const defaulthMask = matrix.replace(/\D/g, "");
        const elementValue = value.replace(/\D/g, "");
        let newElementValue = matrix.replace(/[_\d]/g, (a) => {
            return i < elementValue.length ? elementValue.charAt(i++) || defaulthMask.charAt(i) : a;
        });
        i = newElementValue.indexOf("_");
        if (i != -1) {
            newElementValue = newElementValue.slice(0, i);
        }
        let reg = matrix.substr(0, value.length).replace(/_+/g, (a) => {
            return "\\d{1," + a.length + "}";
        })
            .replace(/[+()]/g, "\\$&");

        reg = new RegExp("^" + reg + "$");
        if (!reg.test(value) || value.length < 5 || keyCode > 47 && keyCode < 58) {
            value = newElementValue;
        }
        if (event.type == "blur" && value.length < 5) {
            value = "";
        }
        if (event.type == "input" && value.length < 5 && keyCode > 36 && keyCode < 41) {
            event.preventDefault();
        }

        return value
    }

    element.addEventListener("input", mask, false);
    element.addEventListener("focus", mask, false);
    element.addEventListener("blur", mask, false);
    element.addEventListener("keydown", mask, false);

    return mask;
}

export const closeAction = (button, pageWrapper, field) => {
    if (button) {
        button.addEventListener('click', () => {
            field.setAttribute('show-popup', 'false');
            if (field.parentNode == pageWrapper) {
                pageWrapper.removeChild(field);
            }
        });
        field.addEventListener('click', (e) => {
            if (e.target == field) {
                button.click();
            }
        });
    }
}

export const customValidate = (inputs) => {
    let isValid;
    if (inputs.length) {
        inputs.forEach((input) => {
            if (input.value.length > 0) {
                if (input.getAttribute('name') == 'phone' && input.value.length < 17) {
                    input.setAttribute('valid', 'false');
                    isValid = false;
                } else {
                    input.setAttribute('valid', 'true');
                    isValid = true;
                }
            } else {
                input.setAttribute('valid', 'false');
                isValid = false;
            }
        });
    } else {
        if (inputs.value.length > 0) {
            inputs.setAttribute('valid', 'false');
            isValid = false;
        } else {
            inputs.setAttribute('valid', 'true');
            isValid = true;
        }
    }
    return isValid;
}

export const countdown = (time, block, handle) => {
    const tick = () => {
        block.innerHTML = 'Отправить ещё раз через ' + time + ' сек';
        time--;
        if (time <= 0) {
            block.innerHTML = 'Отправить ещё раз';
            block.setAttribute('active', '');
            block.addEventListener('click', handle);
        } else {
            if (block.hasAttribute('active')) {
                block.removeEventListener('click', handle, false);
                block.removeAttribute('active');
            }
            setTimeout(tick, 1000);
        }
    }
    tick();
}

export const clearMessage = (container, message) => {
    const inputList = container.querySelectorAll('input');
    inputList.forEach((input, i) => {
        input.addEventListener('input', () => {
            message.remove();
            input.removeAttribute('valid');
        });
    });
}
