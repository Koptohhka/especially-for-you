(function () {
    function sendRequest(url, method, callback, sendData) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        
        xhr.responseType = 'json';

        xhr.onload = function () {
            console.log(xhr.status);
            if ( xhr.status >= 200 && xhr.status < 400) {
                let spiner = document.querySelector('.slider__layer--first').querySelector('.loader-container');
                if (spiner !== null) {
                    document.querySelector('.slider__layer--first').querySelector('.loader-container').remove();
                }
            }

            callback(xhr.response);
        }


        console.log(sendData);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(sendData);
    }

    function buildQuery(month, day, placeId) {
        return 'https://shina-prod.azurewebsites.net/api/slots?Date=2020-'+month+'-'+day+'+&PlaceId='+placeId;
    }

    /*
    https://shina-prod.azurewebsites.net/api/slots?Date=2020-4-16+&PlaceId=1
    */

    window.backed = {
        sendRequest: sendRequest,
        buildQuery: buildQuery
    }
})()