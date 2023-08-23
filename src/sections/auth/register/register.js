import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Button, SvgIcon, styled, Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// import { useDispatch } from 'react-redux' 
// import {  AddNewUser } from '../../../redux/thunk/UserReducers'
import { PostFunction } from '../../../Functions/PostFunction'
import { api } from '../../../Apis'

// components
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

export default function Register() {
  const navigate = useNavigate();
  // const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [name,Setname] = useState('');
  const [email,Setemail] = useState('');
  const [password, Setpassword] = useState('');
  const [phonenumber , Setphonenumber] = useState('');
  const [userimage ,Setuserimage] = useState('');

  const handleClick = async () => {
    console.log(name, email ,password  , phonenumber , userimage)
    const data = new FormData();

    data.append('name',name)
    data.append('email',email)
    data.append('password',password)
    data.append('phone_number',phonenumber)
    if (userimage) {
      data.append('user_image', userimage); // Append the image file if selected
    }
    const link = api?.Register
    await PostFunction(link , data)

    const apiResponse = { email };
    localStorage.setItem('email', apiResponse.email);
    navigate('/otp', { replace: true });
  };

  const VisuallyHiddenInput = styled('input')`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

  return (
    <>
      <Stack spacing={3}>
      <TextField name="name" type="text" value={name} onChange={(e) => Setname(e.target.value)} label="Name" />

        <TextField name="email" type="email" value={email} onChange={(e) => Setemail(e.target.value)} label="Email address" />

        <TextField name="phone" type='text' value={phonenumber} onChange={(e) => Setphonenumber(e.target.value)} label="Phone no" />

        <TextField
          name="password"
          label="Password"
          value={password}
          onChange={(e) => Setpassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          type="file"
          label="Profile picture"
          variant="outlined"
          onChange={(e) => Setuserimage(e.target.files[0])}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
          Register
        </LoadingButton>
      </Stack>
    </>
  );
}
