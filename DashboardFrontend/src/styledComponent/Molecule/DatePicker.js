import React  from 'react';
// import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DataPickers(props) {

  const [selectedDateEnd, setSelectedDateEnd] = React.useState(new Date());
  const [selectedDateStart, setSelectedDateStart] = React.useState(new Date().setMonth(selectedDateEnd.getMonth()-1));
  const { top } = props;

  return (
    <div style={top ? { margin: `${top} 20px 0 20px`  } : null}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            // disableToolbar
            // variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Start date"
            value={selectedDateStart}
            onChange={(time) => console.log(time)}
            onChange={setSelectedDateStart}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="End date"
            format="MM/dd/yyyy"
            value={selectedDateEnd}
            onChange={setSelectedDateEnd}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
}
