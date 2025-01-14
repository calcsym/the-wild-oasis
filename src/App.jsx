import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

//
/*
const H1 = styled.h1`
font-size:30px;
font-weight: 600;
background-color: yellow;
`;

const Button = styled.button`
font-size: 1.4rem;
padding: 1.2rem 1.6rem;
font-weight: 500;
border: none;
border-radius: 7px;
color: white;
margin:20px;
cursor: pointer;
`;
const Input = styled.input`
border:1px solid #ddd;
border-radius: 5px;
padding: 0.8rem 1.2rem;
`;

const StyledApp = stuled.div`
//backgournd-color: orangered;
backgournd-color: var(--color-brand-600);
padding:20px;
`;

<StyledApp>
<H1></H1>
</StyledApp>
*/
