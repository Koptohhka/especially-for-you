(function () {
    let userDataObject = {
        selectedPlaceId: null,
        selectedDay: null,
        time: null
    }

    let reservationInfo = {
        SlotToken: '',
        Source: 2,
        userInfo: {
            Name: '',
            PhoneNumber: ''
        }
    }

    const timeCellsContainer = document.querySelector('.table-popup-list');
    const infoItemsContainer = document.querySelector('.slider__layer--first');
    const sliderButtonsContainer = document.querySelector('.slider__control');
    const sliderControlButtons = document.querySelectorAll('.slider_control-button');
    const sliderLayers = document.querySelectorAll('.slider__layer');

    let sliderStepCounter = 1;

    function toChangeCurrentSlide(eventTarget) {
        if (eventTarget.classList.contains('slider_control-button') && !eventTarget.classList.contains('slider_control-button--disabled')) {
            for (let i = 0; i < sliderControlButtons.length; i++) {
                sliderControlButtons[i].classList.remove('slider_control-button--active');
            }
            eventTarget.classList.add('slider_control-button--active');
            for (let i = 0; i < sliderLayers.length; i++) {
                sliderLayers[i].classList.add('hidden');
            }
            sliderLayers[parseInt(eventTarget.dataset.type)].classList.remove('hidden');
            currentSlideCounter = parseInt(eventTarget.dataset.type);
        }
    }

    function toRemoveDisabledClassFromButtons(sliderStepCounter) {
        sliderControlButtons[sliderStepCounter].classList.remove('slider_control-button--disabled');
        setTimeout(toChangeCurrentSlide, 200, sliderControlButtons[sliderStepCounter]);
    }

    function toAddDisabledClassToButtons() {
        for (let i = 1; i < sliderControlButtons.length; i++) {
            sliderControlButtons[i].classList.add('slider_control-button--disabled');
        }
    }

    function toRemoveSelectedClassFromInfoItems() {
        let infoItemsArray = infoItemsContainer.querySelectorAll('.slider__slider-item');
        for (let i = 0; i < infoItemsArray.length; i++) {
            infoItemsArray[i].classList.remove('slider__slider-item--selected');
        }
    }

    function toRemoveSelectedClassFromCell() {
        let cells = document.querySelectorAll('.slider-table__data:not(.dayNameCell)');
        for (let i = 0; i < cells.length; i++) {
            cells[i].classList.remove('slider-table__data--selected');
        }
    }

    function toRemoveSelectedClassFromTimeCell() {
        const timeCells = timeCellsContainer.querySelectorAll('.table-popup-list__item');
        for (let i = 0; i < timeCells.length; i++) {
            timeCells[i].classList.remove('table-popup-list__item--selected');
        }
    }

    function toRemoveTimeCells() {
        timeCellsContainer.innerHTML = '';
    }

    function toRemoveTextFromFormFieldData() {
        let inputs = document.querySelectorAll('.form__input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
    }

    function toSelectInfoItem(evt) {
        let targetElement = evt.target;
        if (targetElement.classList.contains('slider__slider-item') && !targetElement.classList.contains('slider__slider-item--disabled')) {
            toRemoveSelectedClassFromInfoItems();
            targetElement.classList.add('slider__slider-item--selected');
            userDataObject.selectedPlaceId = targetElement.id;
            toRemoveDisabledClassFromButtons(1);
            sliderStepCounter++;
        } else if (targetElement.parentNode.classList.contains('slider__slider-item') && !targetElement.parentNode.classList.contains('slider__slider-item--disabled')) {
            toRemoveSelectedClassFromInfoItems();
            targetElement.parentNode.classList.add('slider__slider-item--selected');
            userDataObject.selectedPlaceId = targetElement.parentNode.id;
            toRemoveDisabledClassFromButtons(1);
            sliderStepCounter++;
        }
    }

    function toSelectCell(evt) {
        let targetElement = evt.target;
        if (targetElement.classList.contains('slider-table__data') && !targetElement.classList.contains('dayNameCell') && !targetElement.classList.contains('slider-table__data--empty')) {
            toRemoveSelectedClassFromCell();
            targetElement.classList.add('slider-table__data--selected');
            toRemoveDisabledClassFromButtons(2);
            sliderStepCounter++;

            if (targetElement.textContent < 10) {
                userDataObject.selectedDay = '0' + targetElement.textContent;
            } else {
                userDataObject.selectedDay = targetElement.textContent;
            }

            toInnerSpiner();
            let timeGetUrl = window.backed.buildQuery(04, userDataObject.selectedDay, userDataObject.selectedPlaceId);
            window.backed.sendRequest(timeGetUrl, 'GET', window.render.renderTimeCells)
        }
    }

    function toInnerSpiner() {
        let spinerItem = '<div class="loader-container"><div class="loader loader--mod">1</div></div>';
        document.querySelector('.table-popup-list').innerHTML = spinerItem;
    }


    function toSelectTimeCell(evt) {
        let targetElement = evt.target;
        if (targetElement.classList.contains('table-popup-list__item') && !targetElement.classList.contains('table-popup-list__item--disabled')) {
            toRemoveSelectedClassFromTimeCell();
            targetElement.classList.add('table-popup-list__item--selected');
            toRemoveDisabledClassFromButtons(3);

            console.log(window.form);
            reservationInfo.SlotToken = targetElement.id;
            console.log(window.form.reservationInfo);
        }
    }

    function toChangeFormSlide() {
        toRemoveDisabledClassFromButtons(4);
    }

    const sliderResetButton = document.querySelector('.slider__reset-button');

    function reserAllFileds() {
        toRemoveSelectedClassFromInfoItems();
        toRemoveSelectedClassFromCell();
        toRemoveSelectedClassFromTimeCell();
        toRemoveTimeCells();
        toRemoveTextFromFormFieldData();
        toAddDisabledClassToButtons();
        toAddDisabledClassToButtons();

        sliderLayers[sliderLayers.length - 1].classList.add('hidden');
        sliderLayers[0].classList.remove('hidden');

        sliderControlButtons[sliderControlButtons.length - 1].classList.remove('slider_control-button--active');
        sliderControlButtons[0].classList.add('slider_control-button--active');
    }

    timeCellsContainer.addEventListener('click', toSelectTimeCell);
    infoItemsContainer.addEventListener('click', toSelectInfoItem);
    sliderResetButton.addEventListener('click', reserAllFileds);
    sliderButtonsContainer.addEventListener('click', function (evt) {
        setTimeout(toChangeCurrentSlide, 200, evt.target);
    });

    //form





    const form = document.querySelector('.slider__form');
    const phoneInput = form.querySelector('#phone-input');
    const formButton = form.querySelector('.form__input form__input--button');

    function toChangeFormSlide() {
        toRemoveDisabledClassFromButtons(4);
    }

    function toCheckPhoneValidity(inputTel) {
        if (inputTel.value.length > 0) {
            if (inputTel.value.charAt(0) !== '+') {
                inputTel.value = '+' + inputTel.value.slice(1, inputTel.value.length);
            }
            if (inputTel.value.length > 13) {
                inputTel.value = inputTel.value.slice(0, 13);
            }
            inputTel.value = '+' + inputTel.value.slice(1, inputTel.value.length).replace(/[^0-9]/, '');
        }
    }

    function testFunc(data) {
        console.log(data);
    }

    phoneInput.addEventListener('input', function () {
        toCheckPhoneValidity(phoneInput);
    });

    form.addEventListener('submit', function (evt) {
        evt.preventDefault();


        if (evt.originalTarget.querySelector('#phone-input').value.length < 8) {
            console.log('aSAsaSASSAAS');
            alert('SSSS')
        } else {
            reservationInfo.userInfo.Name = form.querySelector('#name-input').value;
            reservationInfo.userInfo.PhoneNumber = form.querySelector('#phone-input').value;

            window.backed.sendRequest('https://shina-dev.azurewebsites.net/api/reservations', 'POST', testFunc, JSON.stringify(reservationInfo));

            toChangeFormSlide();
        }
    });

    window.slider_functions = {
        reservationInfo: reservationInfo,
        toSelectCell: toSelectCell
    }
})()