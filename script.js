/* Variables */
const inputDay = document.querySelector('[data-day]');
const inputMonth = document.querySelector('[data-month]');
const inputYear = document.querySelector('[data-year]');

const resultDay = document.querySelector('[data-days]');
const resultMonth = document.querySelector('[data-months]');
const resultYear = document.querySelector('[data-years]');

const currentDate = new Date();
const getYear = Number(currentDate.getFullYear());
const getDay = Number(currentDate.getDate());
const getMonth = Number(currentDate.getMonth()) + 1;

const monthObj = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const sumOfMonths = monthObj.reduce((total, item) => total + item);

const btnClock = document.querySelector('[data-clock]');
btnClock.addEventListener('click', () => {
    
    const resetFunc = () => {
      resultDay.innerHTML = "--";
      resultMonth.innerHTML = "--";
      resultYear.innerHTML = "--";
    }

    /* Validation */
       const inputs = document.querySelectorAll('.input-data');
       const yearMess = inputYear.nextElementSibling.nextElementSibling;
       const monthMess = inputMonth.nextElementSibling.nextElementSibling;
       const dayMess = inputDay.nextElementSibling.nextElementSibling;
console.log(inputs)
       /* For empty input fields*/
       for (let i = 0; i < inputs.length; i++) {
         if (!inputs[i].value) {
           inputs[i].classList.add('invalid');
           inputs[i].nextElementSibling.nextElementSibling.classList.add('invalid');
           inputs[i].nextElementSibling.nextElementSibling.innerHTML = "This field is required!";
           resetFunc();
         } else {
          inputs[i].nextElementSibling.nextElementSibling.classList.remove('invalid');
          inputs[i].classList.remove('invalid');
         }
       }

       /* Stopper */
       for (let j = 0; j < inputs.length; j++) {
         if (!inputs[j].value) {
           return;
         }
       }

       /* For invalid inputs */
       for (let i = 0; i < inputs.length; i++) {
        /* For months */
        const inputTitle = inputs[i].previousElementSibling.innerHTML;
        const inputInvalid = () => {
                 
                  inputs[i].classList.add('invalid');
                  inputs[i].nextElementSibling.nextElementSibling.classList.add('invalid');
                  resetFunc();
                  return;
        }
         switch(inputTitle) {
          case "Month":
            if (inputMonth.value > 12 ||
                inputMonth.value < 0) {
                  inputInvalid();
                  monthMess.innerHTML = "Invalid Month!";
                  return;
            }
          break;

          case "Day":
            if (inputDay.value > monthObj[Number(inputMonth.value) - 1]) {
                  inputInvalid();
                  dayMess.innerHTML = "Invalid Day!";
                  return;
            }
          break;

          case "Year":
            if (Number(inputYear.value) > getYear) {
                  inputInvalid();
                  yearMess.innerHTML = "Invalid Year!";
                  return;
            }
          break;
       }
      }
      
      const arrDay = [];
      let yearDiff = getYear - Number(inputYear.value);
      
      if (Number(inputMonth.value) > getMonth) {
        yearDiff -= 1;   
      }
      
      if (Number(inputMonth.value) == getMonth &&
          Number(inputDay.value) == getDay) {
            resultMonth.innerHTML = (yearDiff * 12);
      } else {
        resultMonth.innerHTML = (yearDiff * 12) + getMonth;
      }

      /* For Days */
      for (let i = 0; i < getMonth; i++) {
        arrDay.push(monthObj[i]);
      }
    

      resultYear.innerHTML = yearDiff;
      arrDay[arrDay.length - 1] = getDay;
      resultDay.innerHTML = ((yearDiff * 365) + arrDay.reduce((total, item) => total + item)).toLocaleString();
})  
