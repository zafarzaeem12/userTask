import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PostFunction } from '../../../Functions/PostFunction'
import { api } from '../../../Apis'
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm(props) {

  
  const navigate = useNavigate();
  // const dispatch = useDispatch()

  const [otp,Setotp] = useState(0)

  const handleClick = async () => {
    const Data = {
      email : localStorage.getItem('email'),
      verification_code : otp
    }

    const link = api?.OTP
    console.log(link , Data)
   const res = await PostFunction(link , Data)
   if(res.status === 200){
    navigate('/login')
   }else{
    navigate('/resetpassword')
   }
    
    
  };
 
  return (
    <>
      <Stack spacing={3}>
        <TextField name="otp" text="text"  label="OTP" value={otp} onChange={(e) => Setotp(e.target.value)} />

        
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
      
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        O T P
      </LoadingButton>
      </Stack>

    </>
  );
}
