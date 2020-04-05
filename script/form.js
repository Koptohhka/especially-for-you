(function () {
    let reservationInfo = {
        SlotToken: '',
        Source: 2,
        userInfo: {
            Name: '',
            PhoneNumber: ''
        }
    }

    const form = document.querySelector('.slider__form');
    const popup = document.querySelector('.popup-wrapper');

    function closePopup() {
        popup.classList.add('hidden');
    }

    function testFunc(data) {
        console.log(data);
    }

    form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        reservationInfo.userInfo.Name = form.querySelector('#name-input').value;
        reservationInfo.userInfo.PhoneNumber = form.querySelector('#phone-input').value;

        console.log(JSON.stringify(reservationInfo));
        let test = JSON.stringify(reservationInfo);
        window.backed.sendRequest('http://45.77.53.136:7000/api/reservations', 'POST', testFunc, test);

        popup.classList.remove('hidden');
        document.addEventListener('click', function () {
            closePopup();
        })
    });

    popup.querySelector('.popup__button').addEventListener('click', function () {
        closePopup();
    });


    window.form = {
        reservationInfo: reservationInfo
    }
})()