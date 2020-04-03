(() => {
    //это канвас
    let canvasElement = document.querySelector('.slider__control-canvas')
    let ctx = canvasElement.getContext('2d');

    let canvasResize = () => {
        canvasElement.style.width = '100%';
        canvasElement.style.height = '10px';
        canvasElement.style.position = 'absolute';
        canvasElement.style.top = '23px';
        canvasElement.style.zIndex = '-5';
    }
    canvasResize();
    ctx.beginPath();
    ctx.fill
    // это канвас

    //это рендер 
    const tableContainer = document.getElementById('slide-table');
    const slideInfoContainer = document.getElementById('slide-info');

    let renderInfoItems = (data) => {
        let infoItemsArray = [];
        data.forEach((it) => {
            let infoItem = `<div class="slider__slider-item">
            <h3 class="slider-item__title">${it.adress}</h3>
            <div class="slider-item__description">${it.workingTime}</div>
            <a href="#" class="slider-item__phone">${it.phoneNumber}</a>
            </div>`
            infoItemsArray.push(infoItem);
        });
        slideInfoContainer.insertAdjacentHTML('afterbegin', infoItemsArray.join(''))
    }
    renderInfoItems(window.data.infoItemsDataArray);

    let renderTable = (data) => {        
        let rowArray = [];
        data.forEach((it) => {
            let cellsArray = [];
            for (let j = 0; j < it.length; j++) {
                cellsArray.push(`<td class="slider-table__data">
                <p class="slider-table__day">${it[j].day}</p>
                <p class="slider-table__date">${it[j].date}</p>
                </td>`);
            }
            let rowItem = `<tr class="slider-table__row">${cellsArray.join('')}</tr>`;
            rowArray.push(rowItem);
        });

        tableContainer.insertAdjacentHTML('beforeend', `<table class="slider__table">${rowArray.join('')}</table>`)
    }
    renderTable(window.data.tableDataArray);

    //это рендер 

    //тут начинается код слайдера
    const sliderButtonsContainer = document.querySelector('.slider__control');
    const sliderControlButtons = document.querySelectorAll('.slider_control-button');
    const sliderLayers = document.querySelectorAll('.slider__layer');

    let toShowActiveSlide = (evt) => {
        let eventTarget = evt.target;
        if (eventTarget.classList.contains('slider_control-button')) {
            sliderControlButtons.forEach((it) => {
                it.classList.remove('slider_control-button--active');
            });
            eventTarget.classList.add('slider_control-button--active');

            sliderLayers.forEach((it) => {
                it.classList.add('hidden');
            });
            sliderLayers[parseInt(eventTarget.dataset.type)].classList.remove('hidden');
        }
    }

    sliderButtonsContainer.addEventListener('click', toShowActiveSlide)
    //тут заканчивается код слайдера

})()