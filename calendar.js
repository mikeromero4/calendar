(function(){
var monthSet = [
  "January h",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var weekSet = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var today = new Date();
var getMonthInfo = function(month, year) {
  var firstDay = new Date(year, month, 1);
  var lastDay = new Date(year, month + 1, 0);
  var weeks = Math.ceil((firstDay.getDay() + lastDay.getDate()) / 7);
  return { first: firstDay, last: lastDay, weeks: weeks };
};

class Calender extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      monthOffset: 0,
      selected: 2
    };
    this.back = function() {
      this.setState({ monthOffset: this.state.monthOffset - 1 });
    }.bind(this);
    this.foward = function() {
      this.setState({ monthOffset: this.state.monthOffset + 1 });
    }.bind(this);

  }
  render() {
    var month = today.getMonth() + this.state.monthOffset;
    var year = new Date(
      today.getFullYear(),
      month,
      today.getDay()
    ).getFullYear(); // better way to do this
    month = (month % 12 + 12) % 12;
    return (
      <div class="cal">
        <div class="nav">
          <button class="back" onClick={this.back}>back</button>
          <h2>{monthSet[month % 12] + " " + year}</h2>
          <button class="foward" onClick={this.foward}>foward</button>
        </div>
        <Days />
        <div id="container">
          <Month month={month} year={year} />
          <div class="inset">
            <Month month={month + 1} year={year} />
          </div>

          <Month month={month + 2} year={year} />
        </div>
      </div>
    );
  }
}

var Month = props => {
  var data = getMonthInfo(props.month, props.year);
  var weeks = Array.from({length:data.weeks},(e,i)=>
     <Week
        first={i * 7 - data.first.getDay() + 1}
        last={((i + 1) * 7 - data.first.getDay()) % data.last.getDate()}
        end={data.last.getDate()}
      />)
  return <div>{weeks}</div>;}

var Week = function(props) {
  var days = Array.from({length:7},(_,i) => {
    var day = i + props.first;
    var c =
      day <= 0
        ? "before"
        : day > props.end
          ? "after"
          : i == 6 ? "g" : i == 0 ? "b" : i == 3 ? "y" : "in"; //set class name for 'Day' component
    return <Day c={"day " + c} day={day % (props.end + 1)} />;
  });

  return <div class="week">{days}</div>;
};

var Day = function(props) {
  return <div class={props.c}>{props.day}</div>;
};

var Days = function(props) {
  d = weekSet.map(e => <div>{e}</div>);
  return <div class="days">{d}</div>;
};

ReactDOM.render(<Calender />, document.getElementById("calender"));
}())
