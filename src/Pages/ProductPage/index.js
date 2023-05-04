import React , {useEffect , useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { createConversation , getConversations} from '../../Store/chatReducer';


const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [members , setMembers] = useState([])
  const userData = useSelector((state) => state.auth.userData);
  const { conversations } = useSelector((state) => state.chat);
  const [sellerData, setSellerData] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:8800/api/users?userId=645045fe77a84360d47715ef`
        );
        const data = await res.json();
        setSellerData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  useEffect(() => {
    conversations.forEach(element => {
      setMembers(prev => [...prev , ...element.members])
    });
  } , [conversations])


  let conversationExsist = members?.includes(sellerData?._id)

  const handleSubmit = async () => {
    const data = {
      senderId: userData?._id,
      receiverId: sellerData?._id,
    };

    if (!conversationExsist) {
      await dispatch(createConversation(data));
    }
      navigate("/chat");

  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => handleSubmit()}>
          Chat With {sellerData?.username}
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductPage