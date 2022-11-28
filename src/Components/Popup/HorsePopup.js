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

                <p>{data.data.Age }</p>
                </div>
                <div >
                    <h2>Sex</h2>

                <p>{data.data.Sex }</p>
                </div>
                <div >
                    <h2>Color</h2>

                <p>{data.data.Color }</p>
                </div>
                <div >
                    <h2>Kind</h2>

                <p>{data.data.KindOfHorse }</p>
                </div>
            
                <div >
                    <h2>Breeder</h2>

                <p>{data.data.Breeder }</p>
                </div>
                
                <div >
                    <h2>Dam</h2>

                <p>{data.data.Dam }</p>
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
        </>
    );
};

export default HorsePopup;