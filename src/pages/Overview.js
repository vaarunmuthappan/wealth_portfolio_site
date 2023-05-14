import { Link } from 'react-router-dom'

const Overview = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome to overview page!</h1>

            <p><Link to="/dash/transactions">View transactions</Link></p>

            <p><Link to="/dash/team">View Users in Team</Link></p>

        </section>
    )

    return content
}
export default Overview