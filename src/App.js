import React, { Component } from 'react'
import './App.css'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.baseDate = {
      baseDayNum: 1,
      baseMonth: 1,
      baseYear: 1970,
      baseDay: 'Tuesday'
    }
  }

  handleChange (evt) {
    this.setState({
      ...this.state,
      [evt.target.name]: evt.target.value
    })
  }

  getDay (baseDate, day, month, year) {
    const { baseDayNum, baseMonth, baseYear } = baseDate

    function checkLeapYear (year) {
      if (year % 4 === 0) {
        return 29
      } else {
        return 28
      }
    }

    function adjustForLeapVar (baseYear, year) {
      let count = 0
      for (var i = baseYear; i < year; i++) {
        if (i % 100 === 0 && i % 400 !== 0) {
          count -= 1
        }
      }
      return count
    }

    function calcDaysBetweenMonths (monthDiff) {
      const daysInMonth = [31, checkLeapYear(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      let monthDayDiff = 0
      for (var i = 0; i < monthDiff; i++) {
        monthDayDiff += daysInMonth[i]
      }
      return monthDayDiff
    }

    function calculateDaysBetweenYears (baseYear, year) {
      let daysBetweenYears = 0
      for (var i = baseYear; i < year; i++) {
        if (i % 4 === 0) {
          daysBetweenYears += 366
        } else {
          daysBetweenYears += 365
        }
      }
      return daysBetweenYears + adjustForLeapVar(baseYear, year)
    }

    const monthDiff = Math.abs(baseMonth - month)

    let daysDiff = 0

    if (Math.abs(baseYear - year) === 0) {
      if (Math.abs(baseMonth - month) === 0) {
        daysDiff = Math.abs(baseDayNum - day)
      } else {
        daysDiff = calcDaysBetweenMonths(monthDiff) + (Math.abs(this.baseDayNum - day))
      }
    } else {
      daysDiff = calculateDaysBetweenYears(baseYear, year) + calcDaysBetweenMonths(monthDiff) + Math.abs(baseDayNum - day)
    }

    function getDayOfDate (daysDiff) {
      if (daysDiff % 7 === 0 || daysDiff === 0) return 'Thursday'
      if (daysDiff % 7 === 6) return 'Wednesday'
      if (daysDiff % 7 === 5) return 'Tuesday'
      if (daysDiff % 7 === 4) return 'Monday'
      if (daysDiff % 7 === 3) return 'Sunday'
      if (daysDiff % 7 === 2) return 'Saturday'
      if (daysDiff % 7 === 1) return 'Friday'
    }

    return getDayOfDate(daysDiff)
  }

  render () {
    const { dayNum, month, year } = this.state
    return (
      <div className='App'>
        <div className='App-header'>
          <h1>GIVE ME THE DAY ON THIS DATE</h1>
        </div>
        <div>
          <form id='dateEntry'>
            <label htmlFor='dayNum'>Day: </label>
            <input type='number' min='1' max='31' name='dayNum' onChange={this.handleChange.bind(this)} />
            <label htmlFor='month'>Month: </label>
            <input type='number' min='1' max='12' name='month' onChange={this.handleChange.bind(this)} />
            <label htmlFor='year'>Year: </label>
            <input type='number' min='1600' max='4000' name='year' onChange={this.handleChange.bind(this)} />
          </form>
        </div>
        <div id='result'>
          {this.getDay(this.baseDate, dayNum, month, year)}
        </div>
      </div>
    )
  }
}

export default App
