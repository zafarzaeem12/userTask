/* eslint-disable */
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import POSTS from '../_mock/blog';
import { useState, useEffect } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  TableHead,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  TextField
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead } from '../sections/@dashboard/user/UserListHead';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import data from '../_mock/user';
import { GetTask , TaskAssigned , UserAssignTask , CompletedByAssigner } from '../redux/thunk/TaskReducers';
import { SearchUser } from '../redux/thunk/UserReducers';
import { GetFunction } from '../Functions/GetFunction';
import {api} from '../Apis'
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'due_date', label: 'Date', alignRight: false },
  { id: 'task_provider', label: 'Task-Provider', alignRight: false },
  { id: 'task_assign_to', label: 'Task-Assigner', alignRight: false },
  { id: 'task_status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return array.filter((_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
  }
  

export default function UserPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Userprofile = useSelector((state) => state?.users?.data[0]?.data);
  const Tasks = useSelector((state) => state.tasks.data.data);
  const MessageTasks = useSelector((state) => state.tasks.data.message);
  const tc = Userprofile.user_authentication
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [data, setdata] = useState([]);

  const [name , setName] = useState("")

  const [searchname , setsearchname] = useState("")

  const [selectedUser , SetselectedUser ] = useState([])

  const [ids , Setids] = useState("")

  const [assignStatus , SetassignStatus] = useState("")

  const handleOpenMenu = (event , _id) => {
    setOpen(event.currentTarget);
    Setids(_id)
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleRedirect = () => {
    navigate('/dashboard/createtask');
  };



  const handleUserLoad = () => {
    const data = window.location.href.split('/')
    const routerId = data.pop()
    if(routerId == Userprofile._id ) {
        dispatch(UserAssignTask(tc))
        setdata(Tasks);
    }
  }
  

  const Assign_Task = (ids) => {
    const data = window.location.href.split('/')
    const routerId = data.pop()
    const tasks = {
      task_assign_to : Userprofile._id,
    }
    if(routerId == Userprofile._id ) {
        SetassignStatus(dispatch(CompletedByAssigner({paramsid : ids , data : tasks ,  tc})))
    }
    
  }

 

  const photoURL = 'http://localhost:3000/';

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredUsers = applySortFilter(data, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;
  
  useEffect(() => {
    handleUserLoad();
  }, [data , assignStatus]);
  

  return (
    <>
      <Helmet>
        <title> Task | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {MessageTasks}
          </Typography>
          <Button onClick={() => handleRedirect()} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Task
          </Button>
        </Stack>

       
        <Card>
          <dataToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        indeterminate={TABLE_HEAD > 0 && TABLE_HEAD < TABLE_HEAD.length}
                        checked={TABLE_HEAD.length > 0 && TABLE_HEAD === TABLE_HEAD.length}
                        //onChange={onSelectAllClick}
                      />
                    </TableCell>
                    {TABLE_HEAD.map((headCell) => (
                      <TableCell
                        key={headCell.id}
                        align={headCell.alignRight ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                      >
                        {headCell.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, title, description, due_date, task_provider, task_assign_to, task_status } = row;
                    const selectedUser = selected.indexOf(title) !== -1;
                    
                    return (
                      <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {title}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{description}</TableCell>

                        <TableCell align="left">{due_date}</TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar
                              alt={name}
                              src={
                                task_provider?.user_image
                                  ? task_provider.user_image
                                      .flat()
                                      .filter((_, index) => index !== 2)
                                      .map((data) => photoURL + data.replace('/public', ''))
                                  : null
                              }
                            />
                            <Typography variant="subtitle2" noWrap>
                              {task_provider ? task_provider.name : null}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar
                              alt={name}
                              src={
                                task_assign_to?.user_image
                                  ? task_assign_to.user_image
                                      .flat()
                                      .filter((_, index) => index !== 2)
                                      .map((data) => photoURL + data.replace('/public', ''))
                                  : null
                              }
                            />
                            <Typography variant="subtitle2" noWrap>
                              {task_assign_to ? task_assign_to.name : null}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">
                          <Label
                            color={
                              (task_status === 'To_do' && 'default') ||
                              (task_status === 'In_progress' && 'primary') ||
                              (task_status === 'completed_by_assigner' && 'secondary') ||
                              'success'
                            }
                          >
                            {sentenceCase(task_status)}
                          </Label>
                        </TableCell>

                        <TableCell align="right" >
                          <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event , _id)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 250,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={() => Assign_Task(ids)}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Completed by Assigner
        </MenuItem>
      </Popover>
    </>
  );
}
/* eslint-enable */
