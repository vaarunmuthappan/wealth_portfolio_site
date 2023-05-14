import { Outlet } from 'react-router-dom'

const DashLayout = () => {
    return (
        <div className="dash-container">
            <p>Dash layout</p>
            <Outlet />
        </div>
    )
}
export default DashLayout