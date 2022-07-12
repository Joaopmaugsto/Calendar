let calendar = document.querySelector('.calendar');
const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let month_picker = document.getElementById('get-month');


// February is Special
leapYear = (year) => {
    return (year % 4 == 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 == 0 && year % 400 == 0);
}

getFebDays = (year) => {
    return leapYear(year) ? 29 : 28;
}

// Generate Calendar

generateCalendar = (month, year) => {
    let calendar_day = document.querySelector('.cal-day');
    calendar_day.innerHTML = '';
    let calendar_year = document.getElementById('year');

    let days_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let currentDate = new Date();

    month_picker.innerHTML = month_names[month];
    calendar_year.innerHTML = year;

    let first_day = new Date(year, month, 1)

    for (let i = 0; i < days_month[month] + first_day.getDay(); i++) {
        let day = document.createElement('div');
        
        if(i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover');
            day.innerHTML = i - first_day.getDay() + 1;
            day.innerHTML += `<span></span>
                              <span></span>
                              <span></span>
                              <span></span>`;
            
            if(i - first_day.getDay() + 1 == currentDate.getDate() && year == currentDate.getFullYear() && month == currentDate.getMonth()){
                day.classList.add('current-date');
            }
        }
        calendar_day.appendChild(day)
    }
} 
    
let month_list = calendar.querySelector('.month-list');

month_picker.onclick = () => {
    month_list.classList.add('show');
}

month_names.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div>${e}</div>`;
    month.onclick = () =>{
        month_list.classList.remove('show');
        current_month.value = index;
        generateCalendar(current_month.value, current_year.value);
    }
    month_list.appendChild(month);
})

document.getElementById('previous-year').onclick = () =>{
    --current_year.value;
    generateCalendar(current_month.value, current_year.value);
}

document.getElementById('next-year').onclick = () =>{
    ++current_year.value;
    generateCalendar(current_month.value, current_year.value);
}

let currentDate = new Date();

let current_month = {value: currentDate.getMonth()}
let current_year = {value: currentDate.getFullYear()}

generateCalendar(current_month.value, current_year.value);
