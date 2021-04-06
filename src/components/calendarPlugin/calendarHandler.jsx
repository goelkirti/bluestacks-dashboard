import { Component } from 'react'
// import ReactDOM from 'react-dom'
import Calender from 'react-calendar'
import { datediff, parseDate } from '../appTable/tableOrganizing'
import $ from 'jquery'

import 'react-calendar/dist/Calendar.css';
import './calendarCustom.css'

class AppCalendar extends Component {
    constructor(props) {
        super(props);
        this.changeCalValue = this.changeCalValue.bind(this);
    }

    changeCalValue(selDate) {
        $('span.calSpan').removeClass('showCal');
        $('div.react-calendar').hide()
        var diff = datediff(parseDate(new Date(selDate).toLocaleDateString()), parseDate(new Date(this.props.calValue).toLocaleDateString()))
        if (diff != 0) {
            var sampleData = this.props.tableData;
            var tablename = '';
            var changeData = sampleData[this.props.index]
            var oldtable = changeData['status']
            sampleData.splice(this.props.index, 1);
            changeData['createdOn'] = new Date(selDate).toDateString()
            var changeStatus = datediff(parseDate(new Date().toLocaleDateString()), parseDate(new Date(selDate).toLocaleDateString()))
            if (changeStatus > 0) {
                changeData['dateDiff'] = changeStatus + " days ahead";
                changeData['status'] = 'futureCamp'
                tablename = 'futureCamp'
            }
            else if (changeStatus < 0) {
                changeData['dateDiff'] = changeStatus.toString().replace('-', '') + " days ago";
                changeData['status'] = 'pastCamp'
                tablename = 'pastCamp';
            }
            else {
                changeData['dateDiff'] = 'LIVE'
                changeData['status'] = 'liveCamp'
                tablename = 'liveCamp';
            }
            // console.log('after chnage .. ' + JSON.stringify(changeData) + ' tablename  ' + tablename + ' oldtable... ' + oldtable)
            this.props.updates(sampleData, changeData, tablename, oldtable)
        }


    }

    render() {
        return (
            <Calender value={this.props.calValue} onChange={this.changeCalValue} />
        )
    }
}

export default AppCalendar