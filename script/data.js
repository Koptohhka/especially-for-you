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
function TableDataConstructor(dayNumber, classNum) {
    this.dayNumber = dayNumber;
    this.classNum = classNum;
}


let dayNameCellsClasses = ['monCell', 'thueCell', 'wenCell', 'thursCell', 'friCell', 'saturCell', 'snuCell'];

let daysNameArray = ['Пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
let daysClasses = ['monday', 'thusday', 'wendsday', 'thursday', 'friday', 'suturday', 'sunday'];

let aprileDays = ['', '', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, '', '', '']
console.log(aprileDays.length);

let tableDataArray = [];
tableDataArray.push([]);
for (let i = 0; i < daysNameArray.length; i++) {
    let objectItem = new TableDataConstructor(daysNameArray[i], 'dayNameCell');
    tableDataArray[0].push(objectItem);
}


let tableCellCounter = 0;
for (let i = 2; i <= 6; i++) {
    tableDataArray.push([]);
    for (let j = 0; j < daysClasses.length; j++) {
        let objectItem = new TableDataConstructor(aprileDays[tableCellCounter], daysClasses[j]);
        tableDataArray[i - 1].push(objectItem);
        tableCellCounter++;
    }

}


let test = [];
for (let i = 1; i <= 31; i++) {
    test.push(i);
}




//табличные данные

//обработка серверных данных

window.data = {
    infoItemsDataArray: infoItemsDataArray,
    tableDataArray: tableDataArray
}