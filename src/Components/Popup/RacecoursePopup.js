import React from "react";



const RacecoursePopup = (data) => {

    



    return (
        <>
            <div  >
                <div >
                    <h3>Track Name</h3>

                <p>{data.data.TrackName}</p>
                </div>
                <div >
                    <h3>Track Length</h3>

                <p>{data.data.TrackLength}</p>
                </div>
                <div >
                    <h2>Country</h2>

                <p>{data.data.Country}</p>
                </div>
              
              
                
                <img src={data.data.image} width="50" height='100' alt=""/>
            </div>
        </>
    );
};

export default RacecoursePopup;