import { Routes, Route } from 'react-router-dom'
import DashLayout from './components/DashLayout'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'

import Overview from './pages/Overview'
import Transactions from './pages/ItemsList'
import TeamList from './pages/UsersList'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route path="dash" element={<DashLayout />}>

          <Route index element={<Overview />} />

          <Route path="transactions">
            <Route index element={<Transactions />} />
          </Route>

          <Route path="team">
            <Route index element={<TeamList />} />
          </Route>

        </Route>{/* End Dash */}

      </Route>
    </Routes>
  );
}

export default App;