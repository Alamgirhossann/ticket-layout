import React from 'react';

const UserProfile = ({userInfo}) => {
    const{firstName, lastName, email} = userInfo;
    return (
        <div style={{marginTop:"80px", textAlign:"center"}}>
            <h3>User Detail</h3>
            <div>
            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
            <p>Email: {email}</p>
            </div>
        </div>
    );
};

export default UserProfile;