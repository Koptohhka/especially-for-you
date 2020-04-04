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

let daysNameArray = ['Пн','вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
let daysClasses = ['monday', 'thusday', 'wendsday', 'thursday', 'friday', 'suturday', 'sunday'];

let tableDataArray = [];
tableDataArray.push([]);
for (let  i = 0; i < daysNameArray.length; i++) {
    let objectItem = new TableDataConstructor(daysNameArray[i], 'dayNameCell');
    tableDataArray[0].push(objectItem);
}


let tableCellCounter = 1;
for (let i = 2; i <= 5; i++) {
    tableDataArray.push([]);
    for (let j = 0; j < daysClasses.length; j++) {
        let objectItem = new TableDataConstructor(tableCellCounter, daysClasses[j]);
        tableDataArray[i - 1].push(objectItem);
        tableCellCounter++;
    }
    tableCellCounter++;
}
console.log(tableDataArray);

//табличные данные



window.data = {
    infoItemsDataArray: infoItemsDataArray,
    tableDataArray: tableDataArray
}