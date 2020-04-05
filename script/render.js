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

    const tableContainer = document.getElementById('slide-table');
    const slideInfoContainer = document.getElementById('slide-info');

    const timeCellsContainer = document.querySelector('.table-popup-list');
    const infoItemsContainer = document.querySelector('.slider__layer--first');

    function renderInfoItems(data) {
        let bodyOfData = data.body;
        let infoItemsArray = [];
        for (let i = 0; i < bodyOfData.length; i++) {
            let disabledClass = '';
            if (!bodyOfData[i].isActive) {
                disabledClass = 'slider__slider-item--disabled';
            } else {
                disabledClass = '';
            }

            let infoItem = '<div id="' + bodyOfData[i].id + '" class="' + disabledClass + 'slider__slider-item"><h3 class="slider-item__title">' + bodyOfData[i].description + '</h3><div class="slider-item__description">' + bodyOfData[i].workingTime + '</div><a href="#" class="slider-item__phone">' + bodyOfData[i].phone + '</a></div>';
            infoItemsArray.push(infoItem);
        }
        slideInfoContainer.insertAdjacentHTML('beforeend', infoItemsArray.join(''))
    }
    window.backed.sendRequest('http://45.77.53.136:7000/api/place?IsActive=true', 'GET', renderInfoItems);

    function renderTable(data) {
        let rowArray = [];

        for (let i = 0; i < data.length; i++) {
            let cellsArray = [];
            for (let j = 0; j < data[i].length; j++) {
                //let numberOfday = data[i][j].dayNumber;
                let emptyClass;
                if (!data[i][j].dayNumber) {
                    emptyClass = 'slider-table__data--empty';
                } else {
                    emptyClass = '';
                }

                cellsArray.push('<td class="slider-table__data ' + emptyClass + '' + ' ' + data[i][j].classNum + '">' + data[i][j].dayNumber + '</td>');
            }
            let rowItem = '<tr class="slider-table__row">' + cellsArray.join('') + '</tr>';
            rowArray.push(rowItem);
        }
        tableContainer.insertAdjacentHTML('beforeend', '<table class="slider__table">' + rowArray.join('') + '</table>');


        document.querySelector('.slider__table').addEventListener('click', toSelectCell)
        //document.querySelector('.slider__table').addEventListener('click', function () {
        //    window.backed.sendRequest('http://45.77.53.136:7000/api/slots?Date=2020-%7BselectedMonth%7D-%7BselectedDay%7D&//PlaceId=%7BselectedPlaceId%7D', 'GET', buildQuery);
        //});
    }
    renderTable(window.data.tableDataArray);

    function renderTimeCells(data) {
        console.log(data);
        const cellsContainer = document.querySelector('.table-popup-list');

        let dataBody = data.body;
        let timeCellsArray = [];
        for (let i = 0; i < dataBody.length; i++) {
            let timeStart = new Date(dataBody[i].start);
            let timeEnd = new Date(dataBody[i].end);
            let timeCellDisableClass = '';

            if (!dataBody[i].isAvailable) {
                timeCellDisableClass = 'table-popup-list__item--disabled';
            }
            let cellsArray = '<li id="' + dataBody[i].token + '" class="table-popup-list__item ' + timeCellDisableClass + '">' + timeEnd.toLocaleTimeString() + '-' + timeStart.toLocaleTimeString() + '</li>'
            timeCellsArray.push(cellsArray);
        }
        cellsContainer.insertAdjacentHTML('afterbegin', timeCellsArray.join(''));
    }
    //window.backed.sendRequest('http://45.77.53.136:7000/api/slots?Date=2020-04-04&PlaceId=2', 'GET', renderTimeCells);

    const sliderButtonsContainer = document.querySelector('.slider__control');
    const sliderControlButtons = document.querySelectorAll('.slider_control-button');
    const sliderLayers = document.querySelectorAll('.slider__layer');
    const formInputButton = document.querySelector('.form__input--button');

    let currentSlideCounter = 0;
    let nextSlideCounter = 0;

    function addAnimationToleft(eventTarget) {
        if (eventTarget.classList.contains('slider_control-button') && !eventTarget.classList.contains('slider_control-button--disabled')) {
            for (let i = 0; i < sliderControlButtons.length; i++) {
                sliderControlButtons[i].classList.remove('slider_control-button--active');
            }
            console.log(sliderLayers[parseInt(eventTarget.dataset.type)]);
            sliderLayers[parseInt(eventTarget.dataset.type)].classList.add('slider__layer--animation-left');
            sliderLayers[parseInt(eventTarget.dataset.type)].classList.add('.slider_control-button--next');
        }
    }

    function addAnimationToRight(eventTarget) {
        if (eventTarget.classList.contains('slider_control-button') && !eventTarget.classList.contains('slider_control-button--disabled')) {
            for (let i = 0; i < sliderControlButtons.length; i++) {
                sliderControlButtons[i].classList.remove('slider_control-button--active');
            }
            console.log(sliderLayers[parseInt(eventTarget.dataset.type)]);
            sliderLayers[parseInt(eventTarget.dataset.type)].classList.add('slider__layer--animation-right');
        }
    }

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
        console.log(currentSlideCounter);
    }

    sliderButtonsContainer.addEventListener('click', function (evt) {
        //addAnimationToleft(sliderControlButtons[currentSlideCounter]);
        setTimeout(toChangeCurrentSlide, 200, evt.target);
    });

    // selectFunctions
    let sliderStepCounter = 1;

    function toRemoveDisabledClassFromButtons(sliderStepCounter) {
        sliderControlButtons[sliderStepCounter].classList.remove('slider_control-button--disabled');
        //addAnimationToleft(sliderControlButtons[sliderStepCounter]);
        //addAnimationToRight(sliderControlButtons[currentSlideCounter]);
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
        //let infoItemsArray = infoItemsContainer.querySelectorAll('.slider__slider-item');
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

            console.log(userDataObject);
            let timeGetUrl = window.backed.buildQuery(04, userDataObject.selectedDay, userDataObject.selectedPlaceId);
            window.backed.sendRequest(timeGetUrl, 'GET', renderTimeCells)
            console.log(timeGetUrl);
        }
        //console.log(userDataObject);
        //let getUrl = buildQuery(04, userDataObject.selectedDay, userDataObject.selectedPlaceId);
        //console.log(getUrl);
        //window.backed.sendRequest(getUrl, 'GET', testFunc)

        console.log(userDataObject);
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


    //toRemoveDisabledClassFromButtons(3); // временно !!!

    timeCellsContainer.addEventListener('click', toSelectTimeCell);
    infoItemsContainer.addEventListener('click', toSelectInfoItem);
    sliderResetButton.addEventListener('click', reserAllFileds);

    const form = document.querySelector('.slider__form');
    //const popup = document.querySelector('.popup-wrapper');

    //function closePopup() {
    //    popup.classList.add('hidden');
    //}

    function testFunc(data) {
        console.log(data);
    }

    function toChangeFormSlide() {
        toRemoveDisabledClassFromButtons(4);
    }

    form.addEventListener('submit', function (evt) {
        console.log(evt);
        evt.preventDefault();

        reservationInfo.userInfo.Name = form.querySelector('#name-input').value;
        reservationInfo.userInfo.PhoneNumber = form.querySelector('#phone-input').value;

        console.log(JSON.stringify(reservationInfo));
        let test = JSON.stringify(reservationInfo);
        window.backed.sendRequest('http://45.77.53.136:7000/api/reservations', 'POST', testFunc, test);

        toChangeFormSlide();
    });

    window.form = {
        reservationInfo: reservationInfo
    }

})()


/*

let userDataObject = {
        selectedPlaceId: null,
        selectedDay: null,
        time: null
    }

    function buildQuery(month, day, placeId) {
        return 'http://45.77.53.136:7000/api/slots?Date=2020-'+month+'-'+day+'+&PlaceId='+placeId;
    }

    function testFunc(data) {
        console.log(data);
    }

*/