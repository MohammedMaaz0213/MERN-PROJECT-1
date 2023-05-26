import React,{useState,useRef} from 'react'
import { Typography,TextField,Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import useStyles from '../styles'
import {commentPost} from '../../actions/posts'




const CommentSection =({post})=>{
const user = JSON.parse( localStorage.getItem('profile'))

const classes=  useStyles();
const dispatch = useDispatch();
const [comments,setComments] = useState(post?.comments);
const commentsRef=  useRef();
const handleClick = async() =>{
    const finalComment = `${user.result.name}: ${comment}`
    const newComments  = await dispatch(commentPost(finalComment, post._id))
   console.log(newComments, 'my comments  sdas d sadsa d  ')
    setComments(newComments)
    setComment('')

    commentsRef.current.scrollIntoView({behaviour:'smooth'})
}
const [comment,setComment] = useState('');
    return (
        <div>
            <div className={classes.commentsOuterContainer} >
            <div className={classes.commentsInnerContainer} >
                <Typography gutterBottom variant='h6' >Comments </Typography>

                {
                    comments.map((c,i) => (
                        <Typography gutterBottom variant='subtitle1' key={i} >
                            <strong>{c.split(':')[0]}</strong>
                            {c.split(':')[1]}
                        </Typography>

) )
                }

<div ref={commentsRef} ></div>

            </div>
            {user?.result?.name && ( 

                  <div style={{width:'70%'}} >
                    <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                    <TextField fullWidth rows={4} variant='outlined' label="Comment" multiline value={comment} onChange={(e)=> setComment(e.target.value)} ></TextField>
                
                  <Button disabled={!comment} style={{marginTop: '10px'}} fullWidth variant='contained' onClick={handleClick}  >Comment</Button>
                  </div>
                   )}
            </div>  
        </div>
    )
}
export default CommentSection;