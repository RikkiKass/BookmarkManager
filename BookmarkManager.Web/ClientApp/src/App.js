import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './Pages/Layout';
import { AuthContextComponent } from './AuthContext';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from './Pages/Home';
import PrivateRoute from './Components/PrivateRoute';
import Logout from './Pages/Logout';
import MyBookmarks from './Pages/MyBookmarks';
import AddBookmark from './Pages/AddBookmark';


const App = () => {
    return (
        <AuthContextComponent>
            <Layout>
                <Route exact path='/' component={Home} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/login' component={Login} />
                <PrivateRoute exact path='/logout' component={Logout} />
                <PrivateRoute exact path='/mybookmarks' component={MyBookmarks} />
                <PrivateRoute exact path='/addbookmark' component={AddBookmark} />

            </Layout>
        </AuthContextComponent>
    )
}
export default App;