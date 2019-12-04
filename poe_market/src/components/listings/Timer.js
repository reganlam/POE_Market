import React, {Component} from 'react'

const getListedDate = (date) => {
  const listing_date = new Date(Date.parse(date))
  const current_date = new Date()

  if(listing_date.getDate() != current_date.getDate() || 
    listing_date.getMonth() != current_date.getMonth() || 
    listing_date.getYear() != current_date.getYear()){
    return ('Listed days ago')
  }

  const hours = (current_date.getHours() - listing_date.getHours())

  const minutes = ( 
    hours * 60 + (current_date.getMinutes() - listing_date.getMinutes())
  )

  if (minutes >= 120) {
    return (`Listed ${hours} hours ago`)
  }
  else if (minutes >= 60){
    return (`Listed 1 hour ago`)
  }
  else if (minutes == 1){
    return ('Listed 1 minute ago')
  }
  else if (minutes == 0){
    return ('Listed <1 minute ago')
  }
  else{
    return (`Listed ${minutes} minutes ago`)
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.propDate = this.props.date
    this.propInterval = this.props.interval || 60
    this.state = { seconds: 0}
  }

  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds + this.propInterval
    }))
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), this.propInterval * 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div>
        {getListedDate(this.propDate)}
      </div>
    )
  }
}

 export default Timer