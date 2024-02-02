import React from 'react'
import { useRemovePhotoMutation } from '../store';
import CircularProgress from '@mui/material/CircularProgress';
import { BsTrash3 } from "react-icons/bs";

function PhotoListItem({ photo }) {
    const [removePhoto, results] = useRemovePhotoMutation();
    const handleDeleteItem = () => {
        removePhoto(photo);
    }
    return (
        <div style={{ margin: "20px", cursor: "pointer", position: "relative", }} onClick={handleDeleteItem}>
            <img src={photo.url} />
            <div className='deletePhoto'>
                {results.isLoading ? (<CircularProgress style={{ width: "20px", height: "20px" }} />) : (
                    <BsTrash3 />
                )
                }

            </div>


        </div>
    )
}

export default PhotoListItem