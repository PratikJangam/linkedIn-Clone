
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./App.css";
import { login, logout, selectUser } from "./features/userSlice";
import Feed from "./Feed";
import { auth } from "./firebase";
import Header from "./Header";
import Login from "./Login";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";

function App() {
   const user = useSelector(selectUser)
  const dispatch = useDispatch()
   useEffect(() =>{
      auth.onAuthStateChanged(userAuth =>{
        if(userAuth){
          //User is logged in
          dispatch(login({
            email:userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl : userAuth.photoURL, 
          }))
        }else{
          // User is not logged in
          dispatch(logout());
        }
      })
   }, [])

  return (
    <div className="app">
      {/* Header */}
      <Header />

      {!user ? (
        <Login />
        ) : (

          <div className="app__body">
            {/* Sidebar */}
            <Sidebar />
            {/* Feed */}

            <Feed />

            {/* Widgets */}
            <Widgets />
          </div>

        )}

    </div>
  );
}

export default App;
