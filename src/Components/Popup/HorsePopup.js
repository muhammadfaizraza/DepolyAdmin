import React from "react";



const HorsePopup = (data) => {

    



    return (
        <>
        <div>
            <div  >
                <div></div>
                <div >
                    <h2>Name</h2>

                <p>{data.data.NameEn}</p>
                </div>
            

                    <div >
                    <h2>Age</h2>

                <p></p>
                </div>
                <div >
                    <h2>Sex</h2>

                <p></p>
                </div>
                <div >
                    <h2>Color</h2>

                <p></p>
                </div>
                <div >
                    <h2>Kind</h2>

                <p></p>
                </div>
            
                <div >
                    <h2>Breeder</h2>

                <p></p>
                </div>
                
                <div >
                    <h2>Dam</h2>

                <p></p>
                </div>
                
                <div >
                    <h2>Sire</h2>

                <p>{data.data.Sire }</p>
                </div>
                
                <div >
                    <h2>Grand Sire</h2>

                <p>{data.data.GSire }</p>
                </div>
                
                <div >
                    <h2>Remarks</h2>

                <p>{data.data.Remarks }</p>
                </div>
                <img src={data.data.HorseImage} width="50" height='100' alt=""/>
            </div>
            </div>
       <div>
        hello
       </div>
        </>
    );
};

export default HorsePopup;