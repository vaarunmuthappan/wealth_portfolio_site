import { Link } from 'react-router-dom'
import { store } from '../app/store'
import { Box } from "@mui/material";

const Overview = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const adminStore = store.getState().auth

    const content = (
        <Box m="1.5rem 2.5rem">

            <p>{today}</p>

            <h1>Welcome {adminStore.user}</h1>

            <p><Link to="/dash/transactions">View transactions</Link></p>

            <p><Link to="/dash/team">View Users in Team</Link></p>

        </Box>
    )

    return content
}
export default Overview