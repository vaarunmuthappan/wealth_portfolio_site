import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { themeSettings } from "./theme";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import Layout from './components/DashLayout'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import RequireAuth from './features/auth/RequireAuth'
import Overview from './features/Overview/Overview'
import Transactions from './features/transactions/Transactions'
import Breakdown from './features/breakdown/Breakdown'
import TeamList from './features/team/teamTable'
import AddItem from './features/transactions/addItem';
import EditItem from './features/transactions/editItem';
import AddUser from './features/team/addUser';
import EditUser from './features/team/editUser';

function App() {
  const mode = useSelector((state) => state.admin.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route element={<RequireAuth />}>

              <Route path="dash" element={<Layout />}>

                <Route index element={<Overview />} />

                <Route path="/dash/transactions">
                  <Route index element={<Transactions />} />
                  <Route path="addItem" element={<AddItem />} />
                  <Route path="editItem/:id" element={<EditItem />} />
                </Route>

                <Route path="/dash/team">
                  <Route index element={<TeamList />} />
                  <Route path="addUser" element={<AddUser />} />
                  <Route path="editUser/:id" element={<EditUser />} />
                </Route>

                <Route path="/dash/breakdown">
                  <Route index element={<Breakdown />} />
                </Route>

              </Route>{/* End DashLayout */}
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;