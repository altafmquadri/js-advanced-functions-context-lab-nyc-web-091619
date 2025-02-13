/* Your Code Here */
function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(function(employee){
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(date) {
    let obj = {
        type: "TimeIn",
        hour: parseInt(date.split(' ')[1].split(':')[0]),
        date: date.split(' ')[0]
    }
    this.timeInEvents.push(obj)
    return this
}

function createTimeOutEvent(date) {
    let obj = {
        type: "TimeOut",
        hour: parseInt(date.split(' ')[1].split(':')[0]),
        date: date.split(' ')[0]
    }
    this.timeOutEvents.push(obj)
    return this
}

function hoursWorkedOnDate(date) {
    
    let timeIn = this.timeInEvents.find(function(eTIE){
        return eTIE.date === date
    })

    let timeOut = this.timeOutEvents.find(function(eTIE){
        return eTIE.date === date
    })

    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(function(employee){
        return employee.firstName === name
    })
}

function calculatePayroll(employees) {
    return employees.reduce(function(sum, employee){
        return sum + allWagesFor.call(employee)
    },0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

