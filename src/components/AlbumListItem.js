import React from 'react'
import PhotoList from './PhotoList'
import ExpandablePanel from './ExpandablePanel';
import { BsTrash3 } from "react-icons/bs";
import { useRemoveAlbumMutation, useFetchAlbumsQuery } from '../store';
import CircularProgress from '@mui/material/CircularProgress';
function AlbumListItem({ album }) {
    const [removeAlbum, results] = useRemoveAlbumMutation();
    const handleDeleteItem = () => {
        console.log(removeAlbum);
        removeAlbum(album);
    }
    const header = (
        <>
            <button style={{ marginRight: "30px", border: "none", cursor: "pointer" }} onClick={handleDeleteItem}>
                {results.isLoading ? (<CircularProgress style={{ width: "20px", height: "20px" }} />) : (
                    <BsTrash3 />
                )
                }

            </button>
            {album.title}
        </>
    )

    return (
        <div>
            <ExpandablePanel header={header}>
                <PhotoList album={album} />
            </ExpandablePanel>
        </div>
    )
}

export default AlbumListItem