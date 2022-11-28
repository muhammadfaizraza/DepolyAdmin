import React from "react";



const OwnerPopup = (data) => {

    


    return (
        <>
            <div  >
                <div >
                    <h2>Name</h2>

                <p>{data.data.Name}</p>
                </div>
                

              
                
                <img src={data.data.image} width="50" height='100' alt=""/>
            </div>
        </>
    );
};

export default OwnerPopup;