import React from "react";



const JockeyPopup = (data) => {

    



    return (
        <>
            <div  >
                <div >
                    <h2>Name</h2>

                <p>{data.data.Name}</p>
                </div>
             
                    <div >
                    <h2>Age</h2>

                <p>{data.data.Age }</p>
                </div>
       
                <img src={data.data.image} width="50" height='100' alt=""/>
            </div>
        </>
    );
};

export default JockeyPopup;