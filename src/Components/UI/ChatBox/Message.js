import { Box , List , ListItem , ListItemText } from '@mui/material'
import React from 'react'
import {format} from 'timeago.js'

const Message = ({message , own}) => {

  return (
    <>
           <Box>
                <List style={{ overflow: 'auto' , display : 'flex'  , color : `${own ? 'black' : 'white'}` , float : `${own ? 'right' : 'left'}`}}>
                    <ListItem style={{flexDirection : 'column'}}>
                        <Box>
                            <Box>
                                <ListItemText  primary={message.text} style={{backgroundColor : `${own ? '#EBEEEF' : '#1877f2'}`, borderRadius : '20px' , padding : '10px' , textAlign : `${own ? 'right' : 'left'}`}}></ListItemText>
                            </Box>
                            <Box style={{ textAlign : `${own ? 'right' : 'left'}`}}>
                                <ListItemText  secondary={format(message.createdAt)}></ListItemText>
                            </Box>
                        </Box>
                    </ListItem>
                </List>

            </Box>
    </>
  )
}

export default Message