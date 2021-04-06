import {tableData} from '../../tableData'

// console.log('table data ..', tableData.data[0])
export let futureCamp = [];
export let liveCamp = [];
export let pastCamp = [];

var currentDate = new Date().toLocaleDateString();

export function parseDate(str) {
    var mdy = str.toString().split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

export function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}

tableData.data.map((item) =>{
    var compDate = new Date(item.createdOn).toLocaleDateString()
    // console.log('date comapre....'+ currentDate > compDate)
    var x =  datediff(parseDate(currentDate), parseDate(compDate))

    if(x < 0){
        item['dateDiff'] = x.toString().replace('-','')  + " days ago";
        item['status'] = "pastCamp";
        pastCamp.push(item);
    }
    else if(x > 0){
        var x =  datediff(parseDate(currentDate), parseDate(compDate))
        item['dateDiff'] = x  + " days ahead";
        item['status'] = "futureCamp";
        futureCamp.push(item);
    }
    else{
        item['dateDiff'] = "LIVE";
        item['status'] = "liveCamp";
        liveCamp.push(item);
    }

})

