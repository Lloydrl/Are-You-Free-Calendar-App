let nav = 0;        //nav will keep track of the month we are currently viewing
let clicked = null
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []

let calendar = document.getElementById('calendar')
let newEvent = document.getElementById('new-event-modal')
let backDrop = document.getElementById('modal-back-drop')
let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function openModal(date) {
    clicked = date

    let eventForDay = events.find(e => e.date === clicked)
    // add save and cancel buttons for event (if event exists)
    if (eventForDay) {

    } else {
        // if event doesn't exist
        newEvent.style.display = 'block'
    }

    backDrop.style.display = 'block'
}

function load() {
    let date = new Date()

    if (nav !== 0) {
        date.setMonth(new Date().getMonth() + nav)      // uses counter to help with month navigation
    }

    //get current day, month, and year
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()

    let firstDayOfTheMonth = new Date(year, month, 1)
    let daysInMonth = new Date(year, month + 1, 0).getDate()      //finds how many days are in a month
    let dateString = firstDayOfTheMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })

    let paddingDays = weekdays.indexOf(dateString.split(', ')[0])  //grabs the day of the week from dateString to determine number of paddingdays

    document.getElementById('month-display').innerText = `${date.toLocaleDateString('en-us', {month: 'long'})} ${year}`

    calendar.innerHTML = ''     // used to delete month when navigating to previous/next month

    for(let i = 1; i <= paddingDays + daysInMonth; i++) {
        let dayBox = document.createElement('div')      //creates a box for each day of the month (in a div)
        dayBox.classList.add('day')

        // Determine if a padding day or an actual day is rendered
        if (i > paddingDays) {
            //specify dayBox
            dayBox.innerText = i - paddingDays

            //allow for user to click on dayBox (to create event!!!!!!!)
            dayBox.addEventListener('click', () => openModal(`${month + 1}/${i - paddingDays}/${year}`))
        } else {
            //specify padding day
            dayBox.classList.add('padding')
        }

        calendar.appendChild(dayBox)
    }

    console.log(paddingDays)

}

function initButtons() {
    // Have next button navigate to the next month
    document.getElementById('next-btn').addEventListener('click', () => {
        nav++
        load()
    })
    
    // Have back button navigate to the previous month
    document.getElementById('back-btn').addEventListener('click', () => {
        nav--
        load()
    })
}

initButtons()
load()