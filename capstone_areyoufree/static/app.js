import dayjs from dayjs
import weekday from dayjs/plugin/weekday
import weekofYear from dayjs/plugin/weekofYear

Vue.component('month-indicator', {
    template:
        <div>
            {/* calendar date indicator (July 2019) */}
        </div>
    ,
})

Vue.component('month-selector',{
    template:
    <div>
        {/* calendar date selector (pagination between months) */}
    </div>
})

Vue.component('weekdays', {
    template:
    <div>
        {/* shows the name of the weekdays */}
    </div>
})

Vue.component('day', {
    template:
    <div>
        {/* shows single day of the month */}
    </div>
})


new Vue ({
    el: '#app',
    data: {

    },
    methods: {

    }
})