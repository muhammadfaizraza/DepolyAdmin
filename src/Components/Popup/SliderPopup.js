import React from "react";



const SliderPopup = (data) => {

    
    return (
        <>
            <div  >
                <div >
                    <h2>Title</h2>

                <p>{data.data.TitleEn}</p>
                </div>
                <div style={{direction:"rtl"}}>
                <h2>عنوان</h2>
                    <p>{data.data.TitleAr}</p>
                    </div>
                
                <img src={data.data.image} width="50" height='100' alt=""/>
            </div>
        </>
    );
};

export default SliderPopup;