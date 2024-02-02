import React from 'react'
import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store'
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import AlbumListItem from './AlbumListItem';


function AlbumList({ user }) {
    const { data, isError, isFetching } = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useAddAlbumMutation();
    const handleAddAlbum = () => {
        addAlbum(user);
    }
    let content;
    if (isFetching) {
        content = (
            <Skeleton variant='rectangular' sx={{ width: "100%", height: "200px" }} />
        );
    }
    else if (isError) {
        content = <div> Hata Var</div>
    }
    else {
        content = data.map((album) => {
            return <AlbumListItem key={album.id} album={album} />
        })
    }
    return (
        <>
            <div>
                <div className='topArrangement'>
                    <h3>{user.name} Albümü</h3>
                    <Button variant="outlined" onClick={handleAddAlbum}>
                        {results.isLoading ? (<CircularProgress />) : <span>Album Ekle +</span>}
                    </Button>
                </div>

            </div>
            <div> {content}</div>

        </>
    )
}

export default AlbumList