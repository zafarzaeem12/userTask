import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Link, Stack, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch , useSelector } from 'react-redux';
import { AddTask } from '../redux/thunk/TaskReducers';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export default function TaskForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.data[0].data.user_authentication  )
  
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [dueDate, setDueDate] = useState(new Date());

  const handleClick = async () => {
    try {
      const taskData = {
        title,
        description: desc,
        due_date: moment(dueDate).format('YYYY-MM-DDTHH:mm:ss'),
      };
      console.log("taskData",taskData)
      await dispatch(AddTask({ data : taskData , token}));
      navigate('/dashboard/gettask');
    } catch (err) {
      console.error(err);
    }
  };

  const styles = {
    dateTimePicker: {
      paddingBottom: '20px',
      padding : 15
    },
  };

  return (
    <div >
      <Stack spacing={4}>
        <TextField
          name="title"
          type="text"
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          name="description"
          type="text"
          label="Task Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <DateTimePicker
            onChange={setDueDate}
            value={dueDate}
            style={styles.dateTimePicker}
            label="Date"
          />
        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
          Add Task
        </LoadingButton>
      </Stack>

  
    </div>
  );
}
