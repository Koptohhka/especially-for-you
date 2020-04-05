(function () {
  //slider
  const rowLeft = document.getElementById('row-left');
  const rowRight = document.getElementById('row-right');

  let sliderItems = document.querySelectorAll('.slider-section__slider-item');
  let currentItem = 0;
  let isEnabled = true;

  //function changeCurrentItem(num) {
  //  currentItem = (num + sliderItems.length) % sliderItems.length;
  //}

  function hideItem(direction) {
    isEnabled = false;
    sliderItems[currentItem].classList.add(direction);
    sliderItems[currentItem].addEventListener('animationend', function () {
      this.classList.remove('slider-section__slider-item--active', direction);
    })
  }

  function showItem(direction) {
    sliderItems[currentItem].classList.add('slider-section__slider-item--next', direction);
    sliderItems[currentItem].addEventListener('animationend', function () {
      this.classList.remove('slider-section__slider-item--next', direction);
      this.classList.add('slider-section__slider-item--active');
      isEnabled = true;
    })
  }

  function previousItem(num) {
    hideItem('slider-section__slider-item--to-right');
    changeCurrentItem(num - 1);
    showItem('slider-section__slider-item--from-right');
  }

  function nextItem(num) {
    hideItem('slider-section__slider-item--to-left');
    changeCurrentItem(num + 1);
    showItem('slider-section__slider-item--from-left');
  }

  rowLeft.addEventListener('click', function () {
    if (isEnabled) {
      previousItem(currentItem);
    }
  });

  rowRight.addEventListener('click', () => { /////////
    if (isEnabled) {
      nextItem(currentItem);
    }
  });
  //phone-activate
})()


/*
[].forEach.call(document.querySelectorAll(".phone__mask"), function(input) {
    let keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      let pos = this.selectionStart;
      if (pos < 3) event.preventDefault()
      let template = "+7 (___) ___ __ __";
      let  i = 0;
      let  def = template.replace(/\D/g, "");
      let  val = this.value.replace(/\D/g, "");
      let  new_value = template.replace(/[_\d]/g, function(str) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : str
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3)
        new_value = new_value.slice(0, i)
      }
      let reg = template
        .substr(0, this.value.length)
        .replace(/_+/g, function(str) {
          return "\\d{1," + str.length + "}"
        })
        .replace(/[+()]/g, "\\$&")
      reg = new RegExp("^" + reg + "$")
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      )
        this.value = new_value
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }
*/