
import React, { useState, Fragment } from 'react';
import Login from './Login';
import App from './App';

const logout = (setUser) => {
    return () => {
        setUser(undefined);
    }
};


export default function Main() {

    const [user, setUser] = useState(undefined);
    const [viewColumns, setViewColumns] = useState(undefined);

    return (
        <Fragment>
            {
                user !== undefined ? (
                    <App user={user} viewColumns={viewColumns}
                         setViewColumns={setViewColumns} logoutAction={logout(setUser)} />
                ) : (
                    <Login user={user} setUser={setUser} />
                )
            }
        </Fragment>
    )

}
