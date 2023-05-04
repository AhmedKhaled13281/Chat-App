import React , {useRef } from 'react'
import { SearchContainer , SearchIconWrapper , StyledInputBase} from '../../../Styles/chatmenu';
import SearchIcon from '@mui/icons-material/Search';
const ChatSearch = () => {
    const inputRef = useRef('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputValue = inputRef.current.value
        console.log(inputValue)
      }

  return (
    <>
      <SearchContainer>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <form onSubmit={handleSubmit}>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            inputRef={inputRef}
          />
        </form>
      </SearchContainer>
    </>
  );
}

export default ChatSearch