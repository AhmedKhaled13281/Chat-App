import { styled } from '@mui/material/styles';
import { Box} from '@mui/material'

export const ButtonBox = styled(Box)(({ theme }) => ({
    padding: "20px",
    backgroundColor: "white",
    display: "flex",
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    width : '69%',
      [theme.breakpoints.down('sm')]: {
        width: '90%',
      },
}));