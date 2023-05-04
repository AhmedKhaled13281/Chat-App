import { styled, alpha } from '@mui/material/styles';
import { InputBase , Box} from '@mui/material'

export const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection : 'column',
    position: 'relative',
    borderBottom: '1px solid grey',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: 'auto',
    margin : '0 auto',

  }));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    width : '100%',
    color: 'black',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '100%',
      },
    },
  }));

  export const User = styled(Box)(({ theme }) => ({
    display : 'flex' ,
    padding : '15px 10px',
    alignItems : 'center',
    '&:hover': {
        backgroundColor : '#e6e6e6',
        cursor: 'pointer'
    },
  }));
