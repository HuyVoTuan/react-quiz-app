import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../store/actions/dashboardActions';

// MUI Components
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// Components
import Copyright from './components/copyright';
import { useEffect } from 'react';
import InfoTooltip from './components/info-tooltip';

const defaultTheme = createTheme();

const initialFormValues = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { currentUser, error } = useSelector((state) => state.dashboard);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialFormValues,
  });

  const onSubmitHandler = (data) => {
    dispatch(userLogin(data));
    reset(initialFormValues);
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }

    if (currentUser) {
      window.localStorage.setItem('user_id', JSON.stringify(currentUser.id));
      navigate('/');
    }
  }, [currentUser, error, navigate]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <InfoTooltip>
            <Typography component="span" color={'#ADD8E6'} variant="span">
              Hover me
            </Typography>
          </InfoTooltip>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitHandler)}
            sx={{ mt: 1 }}
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="email"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  autoFocus
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 3,
                  message: 'Password must have at least 3 characters',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  autoFocus
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
