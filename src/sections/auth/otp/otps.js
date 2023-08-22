import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/resetpassword', { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" />

        
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
      
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        O T P
      </LoadingButton>
      </Stack>

    </>
  );
}
