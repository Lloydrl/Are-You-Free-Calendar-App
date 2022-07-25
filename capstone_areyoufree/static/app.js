Vue.component('month-indicator', {
    // template:
    //     <div>
    //         {{ selectedMonth }}
    //     </div>
    // ,
})

Vue.component('month-selector',{
    // template:
    // <div>
    //     {/* calendar date selector (pagination between months) */}
    // </div>
})

Vue.component('weekdays', {
    template:
        `<div>
            <p>date.day()</p>
        </div>`
})

Vue.component('day', {
    // template:
    // <div>
    //     {/* shows single day of the month */}
    // </div>
})


new Vue ({
    el: '#app',
    data: {
    },
    methods: {

    }
})

let date = dayjs()

console.log(date.day(0))