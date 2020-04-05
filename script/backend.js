(function () {
    //const mainObjectsUrl = 'http://45.77.53.136:7000/api/place?IsActive=true';

    function sendRequest(url, method, callback, sendData) {
        let xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.responseType = 'json';

        xhr.onload = function () {
            callback(xhr.response);
        }
        console.log(sendData);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(sendData);
    }

    function buildQuery(month, day, placeId) {
        return 'http://45.77.53.136:7000/api/slots?Date=2020-'+month+'-'+day+'+&PlaceId='+placeId;
    }

    function buildReservation() {
        return 'http://45.77.53.136:7000/api/reservations';
    }

    window.backed = {
        sendRequest: sendRequest,
        buildQuery: buildQuery
    }
})()