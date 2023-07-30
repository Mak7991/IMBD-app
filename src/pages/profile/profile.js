import React from "react";
import uniLogo from "../../assests/MIT_Seal.svg.png";
import NavbarMain from "../../components/navbar/navbar";
import "./profile.css";
import { useProfile } from "../../Context";

function Profile({ }) {
  const authUser = useProfile()
  const user = JSON.parse(authUser.user_data)
  return (
    <>
      <NavbarMain />
      <div className="profile-cont">
        <div className="profile-bg">
          <div>
            <img style={{ height: '140px', width: '140px' }} src={uniLogo} />
          </div>
          <div>
            <div >
              <div className="heading" style={{ fontSize: 14 }}>Name</div>
              <div className="content">
                {user?.name}
              </div>
            </div>
            <div className="">
              <div className="heading">Department</div>
              <div className="content">
                Department Computer Engineering
              </div>
            </div>
            <div className="">
              <div className="heading">Email Address</div>
              <div className="content">
                {user?.email}
              </div>
            </div>
            <div className="">
              <div className="heading">Age</div>
              <div className="content">
                {user?.age}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
