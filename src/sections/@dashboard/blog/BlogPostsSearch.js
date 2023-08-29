/* eslint-disable */ 
import PropTypes from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';
import { Autocomplete, InputAdornment, Popper, TextField, Typography, Stack, Avatar } from '@mui/material';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledPopper = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '280px !important',
});

// ----------------------------------------------------------------------

BlogPostsSearch.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default function BlogPostsSearch({ posts , SetselectedUser }) {
  console.log('12345', posts);
  const photoURL = 'http://localhost:3000/';
  return (
    // ...

    <Autocomplete
      sx={{ width: 280 }}
      autoHighlight
      popupIcon={null}
      PopperComponent={StyledPopper}
      options={posts}
      getOptionLabel={(post) => post.name}
      isOptionEqualToValue={(option, value) => {option._id === value._id , SetselectedUser(option._id)}}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search Task Assigner"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
    // ...
  );
}
