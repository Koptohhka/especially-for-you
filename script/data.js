(function () {
    function TableDataConstructor(dayNumber, classNum) {
        this.dayNumber = dayNumber;
        this.classNum = classNum;
    }

    const daysNameArray = ['Пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    const daysClasses = ['monday', 'thusday', 'wendsday', 'thursday', 'friday', 'suturday', 'sunday'];
    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ]

    Date.prototype.daysInMonth = function () {
        return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
    };
    
    let tableCellCounter = 0;

    function createDayArr(dateObject) {
        let resArr = [];

        if (dateObject.getDay() > 1 && dateObject.getDay() < 7) {
            for (let i = 0; i < dateObject.getDay() - 1; i++) {
                resArr.push(undefined);
            }
        } else if (dateObject.getDay() === 0) {
            for (let i = 0; i < 6; i++) {
                resArr.push(undefined);
            }
        }

        for (let i = 1; i <= dateObject.daysInMonth(); i++) {
            resArr.push(i);
        }
        return resArr;
    }

    function toCreateTableData(year, month) {
        let resData = [];
        let dateObj = new Date(year, month);
        let daysArray = createDayArr(dateObj);

        resData.push([]);
        for (let i = 0; i < daysNameArray.length; i++) {
            let objectItem = new TableDataConstructor(daysNameArray[i], 'dayNameCell');
            resData[0].push(objectItem);
        }

        for (let i = 2; i <= 6; i++) {
            resData.push([]);
            for (let j = 0; j < daysClasses.length; j++) {
                let objectItem = new TableDataConstructor(daysArray[tableCellCounter], daysClasses[j]);
                resData[i - 1].push(objectItem);
                tableCellCounter++;
            }

        }
        tableCellCounter = 0;
        return resData;
    }

    window.data = {
        toCreateTableData: toCreateTableData,
        monthNames: monthNames
    }
})()