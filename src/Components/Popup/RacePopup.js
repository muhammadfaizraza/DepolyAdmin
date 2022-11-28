import React from "react";



const RacePopup = (data) => {

    


    return (
        <>
        <div>
            <div  >
                <div></div>
                <div >
                    <h2>Race Name</h2>

                <p>{data.data.raceName}</p>
                </div>
            

                    <div >
                    <h2>Sponsor Logo</h2>

                <p>{data.data.raceName }</p>
                </div>
                <div >
                    <h2>Description</h2>

                <p>{data.data.Description }</p>
                </div>
                <div >
                    <h2>Race Kind</h2>

                <p>{data.data.RaceKind }</p>
                </div>
                <div >
                    <h2>Weather</h2>

                <p>{data.data.Weather }</p>
                </div>
            
                <div >
                    <h2>RaceStatus</h2>

                <p>{data.data.RaceStatus }</p>
                </div>
                     
                <div >
                    <h2>Day</h2>

                <p>{data.data.DayNTime }</p>
                </div>
                <div >
                    <h2>Ground</h2>

                <p>{data.data.raceName }</p>
                </div>
                <div >
                    <h2>Number Of Horse</h2>

                <p>{data.data.Horses.length}</p>
                </div>
                
                <div >
                    <h2>Race Status</h2>

                <p>{data.data.RaceStatus}</p>
                </div>
                
            
                
              
                
              
                
               
                <img src={data.data.HorseImage} width="50" height='100' alt=""/>
            </div>
            </div>
        </>
    );
};

export default RacePopup;