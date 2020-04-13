(function () {
    const tableContainer = document.querySelector('#slide-table');
    const slideInfoContainer = document.querySelector('#slide-info');
    const tableControlButtons = document.querySelectorAll('.table-control__button');
    const tableControlButtonsContainer = document.querySelector('.slider__table-control');

    let currentDate = new Date();

    function renderInfoItems(data) {
        let bodyOfData = data.body;
        let infoItemsArray = [];
        for (let i = 0; i < bodyOfData.length; i++) {
            
            let infoItem = '<div id="' + bodyOfData[i].id + '" class="slider__slider-item"><h3 class="slider-item__title">' + bodyOfData[i].description + '</h3><div class="slider-item__description">' + bodyOfData[i].workTime + '</div><a href="#" class="slider-item__phone">' + bodyOfData[i].phone + '</a></div>';
            infoItemsArray.push(infoItem);
        }
        slideInfoContainer.insertAdjacentHTML('beforeend', infoItemsArray.join(''))
    }
    window.backed.sendRequest('https://shina-dev.azurewebsites.net/api/place?IsActive=true', 'GET', renderInfoItems);

    function renderTable(data, flag) {
        let rowArray = [];
        let currentDate = new Date();

        for (let i = 0; i < data.length; i++) {
            let cellsArray = [];
            for (let j = 0; j < data[i].length; j++) {
                let emptyClass;
                let dayNumber;

                if (data[i][j].dayNumber === undefined) {
                    dayNumber = '';
                } else {
                    dayNumber = data[i][j].dayNumber;
                }

                if (!data[i][j].dayNumber) {
                    emptyClass = 'slider-table__data--empty';
                } else {
                    emptyClass = '';
                }

                if (flag) {
                    if (Number(dayNumber) < currentDate.getDate()) {
                        emptyClass = 'slider-table__data--empty';
                    } else {
                        emptyClass = '';
                    }
                }


                cellsArray.push('<td class="slider-table__data ' + emptyClass + '' + ' ' + data[i][j].classNum + '">' + dayNumber + '</td>');
            }
            let rowItem = '<tr class="slider-table__row">' + cellsArray.join('') + '</tr>';
            rowArray.push(rowItem);
        }
        tableContainer.innerHTML = '<table class="slider__table">' + rowArray.join('') + '</table>';

        document.querySelector('.slider__table').addEventListener('click', window.slider_functions.toSelectCell)
    }

    let tableDataArray = window.data.toCreateTableData(currentDate.getFullYear(), currentDate.getMonth());
    renderTable(tableDataArray, true);

    function renderTimeCells(data) {
        const cellsContainer = document.querySelector('.table-popup-list');

        let dataBody = data.body;
        let timeCellsArray = [];
        for (let i = 0; i < dataBody.length; i++) {
            let timeStart = new Date(dataBody[i].start);

            let timeCellDisableClass = '';
            let minutes = timeStart.getMinutes();
            if (!dataBody[i].isAvailable) {
                timeCellDisableClass = 'table-popup-list__item--disabled';
            }
            
            if (minutes === 0) {
                minutes = minutes.toString() + '0';
            } else {
                minutes = timeStart.getMinutes(); 
            }

            let cellsArray = '<li id="' + dataBody[i].token + '" class="table-popup-list__item ' + timeCellDisableClass + '">' + timeStart.getHours() + '.'+minutes+'</li>'
            timeCellsArray.push(cellsArray);
        }
        cellsContainer.innerHTML = timeCellsArray.join('');
    }


    function toAddMonthNames(monthsData) {
        for (let i = 0; i < tableControlButtons.length; i++) {
            let monthDataObj = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, currentDate.getDate(), 0, 0, 0);
            tableControlButtons[i].textContent = monthsData[monthDataObj.getMonth()];
        }
    }
    toAddMonthNames(window.data.monthNames);

    function toChangeActiveControlTableButton(targetElement) {
        for (let i = 0; i < tableControlButtons.length; i++) {
            if (tableControlButtons[i].classList.contains('table-control__button--active')) {
                tableControlButtons[i].classList.remove('table-control__button--active');
            }
        }
        targetElement.classList.add('table-control__button--active');
    }

    function changeMonthTable(evt) {
        let targetElement = evt.target;

        if (targetElement.classList.contains('table-control__button')) {
            toChangeActiveControlTableButton(targetElement);
            tableDataArray = window.data.toCreateTableData(currentDate.getFullYear(), currentDate.getMonth() + Number(targetElement.dataset.type));
            renderTable(tableDataArray, targetElement.dataset.flag);
        }
    }

    tableControlButtonsContainer.addEventListener('click', changeMonthTable);

    window.render = {
        renderTimeCells: renderTimeCells
    }
})()

