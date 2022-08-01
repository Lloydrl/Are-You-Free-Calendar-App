// Header Component for Calendar
Vue.component('calendar', {
    data: function () {
        return {

        }
    },
    template: `

    `,
    methods: {
        
    }
})


new Vue ({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        nav: 0,
        clicked: null,
        events: [],
        days: [],
        weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    },
    methods:{
        openModal(date) {
            clicked = date

            if (clicked) {
                document.getElementById('new-event-modal').style.display = 'block'
            }
            document.getElementById('modal-back-drop').style.display = 'block'
        },  
        
        load: function() {
            let date = new Date()

            if (this.nav !== 0) {
                date.setMonth(new Date().getMonth() + this.nav)
            }

            // get current day, month, and year
            let day = date.getDate()
            let month = date.getMonth()
            let year = date.getFullYear()
            
            let firstDayOfTheMonth = new Date(year, month, 1)
            let daysInMonth = new Date(year, month + 1, 0).getDate()        // finds how many days are in a month
            
            let dateString = firstDayOfTheMonth.toLocaleDateString('en-us', {
                weekday: 'long',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            })

            let paddingDays = this.weekdays.indexOf(dateString.split(', ')[0])   // grabs the day of the week from dateString to determine the number of padding days needed

            document.getElementById('month-display').innerText = `${date.toLocaleDateString('en-us', {month: 'long'})} ${year}`

            calendar.innerHTML = ''     // will reset calendar every time it is loaded so there aren't multiple calendars


            for (i = 1; i <= paddingDays + daysInMonth; i++) {
                let dayBox = document.createElement('div')
                dayBox.classList.add('day')

                let dayString = `${month + 1}/${i - paddingDays}/${year}`

                // determine whether a padding day or an actually day should show on the calendar in that box
                if (i > paddingDays) {
                    dayBox.innerText = i - paddingDays

                    if (i - paddingDays === day && this.nav === 0) {
                        dayBox.id = 'current-day'
                    }

                    dayBox.onclick = () => {
                        this.openModal(dayString)
                    }

                } else {
                    dayBox.classList.add('padding')
                }
                document.getElementById('calendar').appendChild(dayBox)
            }
        },

        closeModal: function() {
            document.getElementById('new-event-modal').style.display = 'none'
            document.getElementById('modal-back-drop').style.display = 'none'
            document.getElementById('event-title-input').value = ''
            clicked = null
            this.load()
        },

        nextPage: function() {
            this.nav++
            this.load()
        },

        backPage: function() {
            this.nav--
            this.load()
        },

        saveBtn: function() {
            if (document.getElementById('event-title-input').value) {
                this.events.push({
                    title: document.getElementById('event-title-input').value,
                    startTime: document.getElementById('start-time-input').value,
                    endTime: document.getElementById('end-time-input').value,
                    notes: document.getElementById('event-notes').value,
                })
            }
            console.log(this.events)
        },

        cancelBtn: function() {
      
        }
    },

    mounted: function() {
        this.load()
    }
})