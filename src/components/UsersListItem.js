import React from 'react'
import AlbumList from './AlbumList'
import ExpandablePanel from './ExpandablePanel';
import { BsTrash3 } from "react-icons/bs";
import { useRemoveUserMutation } from '../store';
import CircularProgress from '@mui/material/CircularProgress';
export default function UsersListItem({ user }) {
    const [removeUser, results] = useRemoveUserMutation();
    const handleDeleteItem = () => {

        removeUser(user);
    }
    const header = (
        <>
            <button style={{ marginRight: "30px", border: "none", cursor: "pointer" }} onClick={handleDeleteItem}>
                {results.isLoading ? (<CircularProgress style={{ width: "20px", height: "20px" }} />) : (
                    <BsTrash3 />
                )
                }

            </button>
            {user.name}
        </>
    )

    return (
        <div>
            <ExpandablePanel header={header}>
                <AlbumList user={user} />
            </ExpandablePanel>
        </div>
    )
}
