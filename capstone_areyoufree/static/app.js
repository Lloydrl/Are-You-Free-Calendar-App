let nav = 0;        //nav will keep track of the month we are currently viewing
let clicked = null
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []

let calendar = document.getElementById('calendar')
let newEvent = document.getElementById('new-event-modal')
let deleteEventModal = document.getElementById('delete-modal')
let backDrop = document.getElementById('modal-back-drop')
let eventTitleInput = document.getElementById('event-title-input')
let startTimeInput = document.getElementById('start-time-input')
let endtTimeInput = document.getElementById('end-time-input')
let eventNotes = document.getElementById('event-notes')
let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function openModal(date) {
    clicked = date

    let eventForDay = events.find(e => e.date === clicked)
    // add save and cancel buttons for event (if event exists)
    if (eventForDay) {
        document.getElementById('event-title').innerText = eventForDay.title
        document.getElementById('event-start-time'). innerText = eventForDay.startTime
        document.getElementById('event-end-time'). innerText = eventForDay.endTime
        document.getElementById('event-notes-sec'). innerText = eventForDay.notes
        deleteEventModal.style.display = 'block'
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

        let dayString = `${month + 1}/${i - paddingDays}/${year}`

        // Determine if a padding day or an actual day is rendered
        if (i > paddingDays) {
            //specify dayBox
            dayBox.innerText = i - paddingDays

            let eventForDay = events.find(e => e.date === dayString)

            if (i - paddingDays === day && nav === 0) {
                dayBox.id = 'current-day'
            }

            if (eventForDay) {
                let eventDiv = document.createElement('div')
                eventDiv.classList.add('event')
                eventDiv.innerText = eventForDay.startTime + ': ' + eventForDay.title
                dayBox.appendChild(eventDiv)
            }

            //allow for user to click on dayBox (to create event!!!!!!!)
            dayBox.addEventListener('click', () => openModal(dayString))
        } else {
            //specify padding day
            dayBox.classList.add('padding')
        }

        calendar.appendChild(dayBox)
    }

    console.log(paddingDays)

}

function closeModal() {
    eventTitleInput.classList.remove('error')
    newEvent.style.display = 'none'
    deleteEventModal.style.display = 'none'
    backDrop.style.display = 'none'
    eventTitleInput.value = ''
    clicked = null
    load()
}

function saveEvent() {
    if (eventTitleInput.value) {
        eventTitleInput.classList.remove('error')
        events.push({
            date: clicked,
            title: eventTitleInput.value,
            startTime: startTimeInput.value,
            endTime: endtTimeInput.value,
            notes: eventNotes.value,
        })

        localStorage.setItem('events', JSON.stringify(events))
        closeModal()
    } else {
        eventTitleInput.classList.add('error')
    }
}

function deleteEvent() {
    events = events.filter(e => e.date !== clicked)
    localStorage.setItem('events', JSON.stringify(events))
    closeModal()
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

    document.getElementById('save-btn').addEventListener('click', saveEvent)
    document.getElementById('cancel-btn').addEventListener('click', closeModal)
    document.getElementById('delete-btn').addEventListener('click', deleteEvent)
    document.getElementById('close-btn').addEventListener('click', closeModal)
}

initButtons()
load()