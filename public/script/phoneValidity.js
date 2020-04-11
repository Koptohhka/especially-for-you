/*(function () {
    export function formatPhone(inputTel) {

        if (inputTel.value.length > 0) {
            if (inputTel.value.charAt(0) !== '+') {
                inputTel.value = 1;
                    inputTel.value.slice(1, inputTel.value.length)
                };
            }
            if (inputTel.value.length > 13) {
                inputTel.value = inputTel.value.slice(0, 13);
            }
            inputTel.value = '+' + inputTel.value.slice(1, inputTel.value.length).replace(/[^0-9]/, '');
        }
    }
})()*/