import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "./Sidebar.css";

function Sidebar() {
  const user = useSelector(selectUser);


    const recentItem = (topic) =>(
        <div className="sidebar__recentItem">
        <span className="sidebar__hash">#</span>
        <p>{topic}</p>

        </div>
    )

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src="https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw0N3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          alt="background-img"
        />
        <Avatar src={user.photoUrl} className="sidebar__avatar" >
          {user.email[0]}
        </Avatar>
        <h2>{user.displayName}</h2>
        <h4>{user.email}</h4>
      </div>
      
      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Who viewed you</p>
          <p className="sidebar__statNumber">2,543</p>
        </div>
        <div className="sidebar__stat">
          <p>Views of post</p>
          <p className="sidebar__statNumber">750</p>
        </div>

      </div>
        <div className="sidebar__button">
          <p>Recent</p>
          {recentItem("React")}
          {recentItem("python")}
          {recentItem("DevOps")}
          {recentItem("SoftwareDeveloper")}
          {recentItem("Blockchain")}
        </div>
    </div>
  );
}

export default Sidebar;
