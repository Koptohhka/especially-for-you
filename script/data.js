//моковые данные


//слайды с информацией о адресе
function InfoItemConstructor(adress, workingTime, phoneNumber) {
    this.adress = adress;
    this.workingTime = workingTime;
    this.phoneNumber = phoneNumber;
}


let infoItemsDataArray = [];
for (let i = 1; i <= 5; i++) {
    let objectItem = new InfoItemConstructor('СТО / Шиномонтаж: ул. Железнодорожная, 23', 'Время работы: 24/7', '88005553535');
    infoItemsDataArray.push(objectItem);
}
//слайды с информацией о адресе

//табличные данные
function TableDataConstructor(day, date) {
    this.day = day;
    this.date = date;
}

let tableDataArray = [];
let tableCounter = 0;
for (let i = 1; i <= 5; i++) {
    tableDataArray.push([]);
    for (let j = 1; j <= 7; j++) {
        let objectItem = new TableDataConstructor('пн', '6.04.2020');
        tableDataArray[i - 1].push(objectItem);
    }
}
console.log(tableDataArray);

//табличные данные



window.data = {
    infoItemsDataArray: infoItemsDataArray,
    tableDataArray: tableDataArray
}