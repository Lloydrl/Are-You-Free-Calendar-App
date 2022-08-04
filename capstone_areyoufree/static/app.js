new Vue ({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        nav: 0,
        clicked: null,
        events: [],
        days: [],
        weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        csrfToken: '',
        currentUser: {},
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
            
                let dayString = `${month < 9 ? '0': ''}${month + 1}/${i - paddingDays < 10 ? '0': ''}${ i - paddingDays}/${year}`

                let splitDate = dayString.split('/')
                let monthNum = splitDate[0]
                let dayNum = splitDate[1]
                let yearNum = splitDate[2]
    
                let reformattedDate = yearNum + '-'  + monthNum + '-' + dayNum
                
                // determine whether a padding day or an actually day should show on the calendar in that box
                if (i > paddingDays) {
                    dayBox.innerText = i - paddingDays

                    // let currentUserEventDetails = this.currentUser.event_details.date
                    // console.log(currentUserEventDetails)

                    for (let event of this.currentUser.event_details) {

                        if (event.date === reformattedDate) {
                            let eventDiv = document.createElement('div')
                            eventDiv.classList.add('event')
                            eventDiv.innerText = (event.start_time + event.title)
                            dayBox.appendChild(eventDiv)
                        }
                    }


                    if (i - paddingDays === day && this.nav === 0) {
                        dayBox.id = 'current-day'
                    }

                    dayBox.onclick = () => {
                        this.openModal(dayString)
                        console.log(reformattedDate)
                    }

                } else {
                    dayBox.classList.add('padding')
                }
                document.getElementById('calendar').appendChild(dayBox)
            }
        },

        loadCurrentUser: function() {
            axios({
                method: 'get',
                url: '/apis/v1/currentuser/',
            }) .then (response => {
                this.currentUser = response.data
                this.load()
            })
        },

        closeModal: function() {
            document.getElementById('new-event-modal').style.display = 'none'
            document.getElementById('modal-back-drop').style.display = 'none'
            document.getElementById('event-title-input').value = ''
            document.getElementById('start-time-input').value = ''
            document.getElementById('end-time-input').value = ''
            document.getElementById('event-notes').value = ''
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
            let splitDate = clicked.split('/')
            let monthNum = splitDate[0]
            let dayNum = splitDate[1]
            let yearNum = splitDate[2]

            let reformattedDate = yearNum + '-'  + monthNum + '-' + dayNum

            console.log(reformattedDate)
            axios({
                method: 'post',
                url: '/apis/v1/events/',
                headers: {
                    'X-CSRFToken': this.csrfToken,
                },
                data: {
                    date: reformattedDate,
                    title: document.getElementById('event-title-input').value,
                    start_time: document.getElementById('start-time-input').value + ':00',
                    end_time: document.getElementById('end-time-input').value + ':00',
                    notes: document.getElementById('event-notes').value,
                    event_auth: [this.currentUser.id]
                }
            }) .then(response => {
                console.log(this.currentUser.id)
                this.loadCurrentUser()
            }) 

            this.closeModal()
        },
    },

    mounted: function() {
        this.csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]').value
        this.loadCurrentUser()
    }
})