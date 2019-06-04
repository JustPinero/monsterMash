import React from 'react';

const ProfilePortrait = (imgStyle)=>{

  return(
    <div>
      <img className={imgStyle} alt="" src={process.env.PUBLIC_URL + '/Alf.jpg'} />
    </div>
  )
}
export default ProfilePortrait
