(function () {

    //тут код переключалок в табличной секции
    const timeCellsContainer = document.querySelector('.table-popup-list');
    const timeCells = timeCellsContainer.querySelectorAll('.table-popup-list__item');
    const infoItemsContainer = document.querySelector('.slider__layer--first');

    function toSelectInfoItem(evt) {
        let infoItemsArray = infoItemsContainer.querySelectorAll('.slider__slider-item');
        let targetElement = evt.target;
        if (targetElement.classList.contains('slider__slider-item')) {
            /*infoItemsArray.forEach(function (it) {
                it.classList.remove('slider__slider-item--selected');
            });*/
            for (let i = 0; i < infoItemsArray.length; i++) {
                infoItemsArray[i].classList.remove('slider__slider-item--selected');
            }
            targetElement.classList.add('slider__slider-item--selected');
        } else if (targetElement.parentNode.classList.contains('slider__slider-item')) {
            for (let i = 0; i < infoItemsArray.length; i++) {
                infoItemsArray[i].classList.remove('slider__slider-item--selected');
            }
            targetElement.parentNode.classList.add('slider__slider-item--selected');
        }
    }

    function toSelectCell(evt) {
        let targetElement = evt.target;
        let cells = document.querySelectorAll('.slider-table__data:not(.dayNameCell)');
        if (targetElement.classList.contains('slider-table__data') && !targetElement.classList.contains('dayNameCell')) {
            /*cells.forEach(function (it) {
                it.classList.remove('slider-table__data--selected')
            });*/
            for (let i = 0; i < cells.length; i++) {
                cells[i].classList.remove('slider-table__data--selected');
            }
            targetElement.classList.add('slider-table__data--selected');
        }
    }

    function toSelectTimeCell(evt) {
        if (evt.target.classList.contains('table-popup-list__item')) {
            /*timeCells.forEach(function(it) {
                it.classList.remove('table-popup-list__item--selected');
            });*/
            for (let i = 0; i < timeCells.length; i++) {
                timeCells[i].classList.remove('table-popup-list__item--selected');
            }
            evt.target.classList.add('table-popup-list__item--selected');
        }
    }

    timeCellsContainer.addEventListener('click', toSelectTimeCell);
    infoItemsContainer.addEventListener('click', toSelectInfoItem);

    //тут код переключалок в табличной секции

    //это рендер 
    const tableContainer = document.getElementById('slide-table');
    const slideInfoContainer = document.getElementById('slide-info');

    function renderInfoItems(data) {
        let infoItemsArray = [];
        /*data.forEach(function (it) {
            let infoItem = '<div class="slider__slider-item"><h3 class="slider-item__title">' + it.adress +'</h3><div class="slider-item__description">'+ it.workingTime + '</div><a href="#" class="slider-item__phone">'+ it.phoneNumber +'</a></div>';
            infoItemsArray.push(infoItem);
        });*/
        for (let i = 0; i < data.length; i++) {
            let infoItem = '<div class="slider__slider-item"><h3 class="slider-item__title">' + data[i].adress + '</h3><div class="slider-item__description">' + data[i].workingTime + '</div><a href="#" class="slider-item__phone">' + data[i].phoneNumber + '</a></div>';
            infoItemsArray.push(infoItem);
        }
        slideInfoContainer.insertAdjacentHTML('beforeend', infoItemsArray.join(''))
    }
    renderInfoItems(window.data.infoItemsDataArray);

    let tableCellCounter = 1;

    function renderTable(data) {
        let rowArray = [];
        /*data.forEach(function (it) {
            let cellsArray = [];
            for (let j = 0; j < it.length; j++) {
                cellsArray.push('<td class="slider-table__data ${it[j].classNum}">' + it[j].dayNumber + '</td>');
                tableCellCounter++;
            }
            let rowItem = '<tr class="slider-table__row">' + cellsArray.join('') + '</tr>';
            rowArray.push(rowItem);
            tableCellCounter++
        });*/

        for (let i = 0; i < data.length; i++) {
            let cellsArray = [];
            for (let j = 0; j < data[i].length; j++) {
                cellsArray.push('<td class="slider-table__data ${it[j].classNum}">' + data[i][j].dayNumber + '</td>');
                tableCellCounter++;
            }
            let rowItem = '<tr class="slider-table__row">' + cellsArray.join('') + '</tr>';
            rowArray.push(rowItem);
            tableCellCounter++
        }
        tableContainer.insertAdjacentHTML('beforeend', '<table class="slider__table">' + rowArray.join('') + '</table>');
        document.querySelector('.slider__table').addEventListener('click', toSelectCell)
    }
    renderTable(window.data.tableDataArray);

    //это рендер 

    //тут начинается код слайдера
    const sliderButtonsContainer = document.querySelector('.slider__control');
    const sliderControlButtons = document.querySelectorAll('.slider_control-button');
    const sliderLayers = document.querySelectorAll('.slider__layer');

    function toShowActiveSlide(evt) {
        let eventTarget = evt.target;
        if (eventTarget.classList.contains('slider_control-button')) {
            sliderControlButtons.forEach(function (it) {
                it.classList.remove('slider_control-button--active');
            });
            /*for (let i = 0; i ) {

            }*/
            eventTarget.classList.add('slider_control-button--active');

            sliderLayers.forEach(function (it) {
                it.classList.add('hidden');
            });
            sliderLayers[parseInt(eventTarget.dataset.type)].classList.remove('hidden');
        }
    }

    sliderButtonsContainer.addEventListener('click', toShowActiveSlide)
    //тут заканчивается код слайдера


})()