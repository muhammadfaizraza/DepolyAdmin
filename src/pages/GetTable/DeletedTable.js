// import React, { useEffect, Fragment,useState } from "react";
// import DeletedAds from "../../Components/DeletedData/DeletedAds";
// import DeletedColor from "../../Components/DeletedData/DeletedColor";
// import DeletedCategory from "../../Components/DeletedData/DeletedCategory";

// import Dropdown from 'react-bootstrap/Dropdown';

// const DeletedTable = () => {

//     const [value,setValue]=useState('');
//     const handleSelect=(e)=>{
//       console.log(e);
//       setValue(e)
//     }
//     function Tab(value) {

//       if (value.toString() == 'Table2') {
//         return <DeletedAds />;
//       }else if (value.toString()=='Table1') {
//         return <DeletedColor />;
//       }else {
//         return <DeletedCategory />;
//       }
//     }

//   return (
//     <Fragment>
//       <div>
//       <Dropdown  onSelect={handleSelect}>
//         <Dropdown.Toggle variant="success" id="dropdown-basic">
//           Dropdown Button
//         </Dropdown.Toggle>

//         <Dropdown.Menu>
//           <Dropdown.Item eventKey="Table1">1</Dropdown.Item>
//           <Dropdown.Item eventKey="Table2">2</Dropdown.Item>
//           <Dropdown.Item eventKey="Category">3</Dropdown.Item>
//         </Dropdown.Menu>
//       </Dropdown>
//       <h4>You selected {value}</h4>
//       </div>
//       <Tab value={value} />
//     </Fragment>
//   );
// };

// export default DeletedTable;

import React, { useState } from "react";
import Ads from "../../Components/DeletedData/DeletedAds";
import Breeder from "../../Components/DeletedData/DeletedBreeder";
import Category from "../../Components/DeletedData/DeletedCategory";
import Competition from "../../Components/DeletedData/DeletedCompetition";
import Color from "../../Components/DeletedData/DeletedColor";
import Equipment from "../../Components/DeletedData/DeletedEquipment";
import Currency from "../../Components/DeletedData/DeletedCurrency";
import Gender from "../../Components/DeletedData/DeletedGender";
import GroundType from "../../Components/DeletedData/DeletedGroundType";
import HorseKind from "../../Components/DeletedData/DeletedHorseKind";
import Horse from "../../Components/DeletedData/DeletedHorse";
import Jockey from "../../Components/DeletedData/DeletedJockey";

import Meeting from "../../Components/DeletedData/DeletedMeeting";
import News from "../../Components/DeletedData/DeletedNews";
import Nationality from "../../Components/DeletedData/DeletedNationality";
import Owner from "../../Components/DeletedData/DeletedOwner";
import Race from "../../Components/DeletedData/DeletedRace";
import Racetype from "../../Components/DeletedData/DeletedRaceType";
import Racekind from "../../Components/DeletedData/DeletedRaceKind";
import Racename from "../../Components/DeletedData/DeletedRaceName";
import RaceCard from "../../Components/DeletedData/DeletedRaceCard";
import RaceCourse from "../../Components/DeletedData/DeletedRaceCourse";
import Tracklength from "../../Components/DeletedData/DeletedTrackLength";
import Trainer from "../../Components/DeletedData/DeletedTrainer";
import Verdict from "../../Components/DeletedData/DeletedVerdict";
import Sponsor from "../../Components/DeletedData/DeletedSponor";
import Slider from "../../Components/DeletedData/DeletedSlider";
import Seo from "../../Components/DeletedData/DeletedSeo";

import Dropdown from "react-bootstrap/Dropdown";

function App() {
  const [value, setValue] = useState("");
  const handleSelect = (e) => {
    console.log(e);
    setValue(e);
  };

  return (
    <>
      <Dropdown onSelect={handleSelect} className="deletedDropdown">
        <Dropdown.Toggle>Tables</Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="Ads">Ads</Dropdown.Item>
          <Dropdown.Item eventKey="Breeder">Breeder</Dropdown.Item>
          <Dropdown.Item eventKey="Category">
            Competition Category
          </Dropdown.Item>
          <Dropdown.Item eventKey="Competition">Competition </Dropdown.Item>
          <Dropdown.Item eventKey="Color">Color </Dropdown.Item>
          <Dropdown.Item eventKey="Currency">Currency</Dropdown.Item>
          <Dropdown.Item eventKey="Equipment">Equipment</Dropdown.Item>
          <Dropdown.Item eventKey="Gender">Gender</Dropdown.Item>
          <Dropdown.Item eventKey="GroundType"> GroundType</Dropdown.Item>
          <Dropdown.Item eventKey="Horse"> Horse</Dropdown.Item>
          <Dropdown.Item eventKey="HorseKind"> HorseKind</Dropdown.Item>
          <Dropdown.Item eventKey="Jockey">Jockey</Dropdown.Item>
          <Dropdown.Item eventKey="Meeting">Meeting</Dropdown.Item>
          <Dropdown.Item eventKey="Nationality">Nationality</Dropdown.Item>
          <Dropdown.Item eventKey="News">News</Dropdown.Item>

          <Dropdown.Item eventKey="Owner">Owner</Dropdown.Item>
          <Dropdown.Item eventKey="Race">Race</Dropdown.Item>
          <Dropdown.Item eventKey="Racetype">Race Type</Dropdown.Item>
          <Dropdown.Item eventKey="Racename">Race Name</Dropdown.Item>
          <Dropdown.Item eventKey="Racekind">Race kind</Dropdown.Item>
          <Dropdown.Item eventKey="RaceCard">Race Card</Dropdown.Item>
          <Dropdown.Item eventKey="RaceCourse">Race Course</Dropdown.Item>
          <Dropdown.Item eventKey="Sponsor">Sponsor</Dropdown.Item>
          <Dropdown.Item eventKey="Slider">Slider</Dropdown.Item>
          <Dropdown.Item eventKey="Seo">Seo</Dropdown.Item>
          <Dropdown.Item eventKey="Tracklength">Track Length</Dropdown.Item>
          <Dropdown.Item eventKey="Trainer">Trainer</Dropdown.Item>
          <Dropdown.Item eventKey="Verdict">Verdict</Dropdown.Item>
         
          <Dropdown.Item eventKey="Gender">Gender</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Tab value={value} />
    </>
  );
}

function Tab({ value }) {
  if (value.toString() === "Breeder") {
    return <Breeder />;
  } else if (value.toString() === "Ads") {
    return <Ads />;
  } else if (value.toString() === "Category") {
    return <Category />;
  } else if (value.toString() === "Competition") {
    return <Competition />;
  } else if (value.toString() === "Color") {
    return <Color />;
  } else if (value.toString() === "Currency") {
    return <Currency />;
  } else if (value.toString() === "Equipment") {
    return <Equipment />;
  } else if (value.toString() === "Gender") {
    return <Gender />;
  } else if (value.toString() === "Horse") {
    return <Horse />;
  } else if (value.toString() === "GroundType") {
    return <GroundType />;
  } else if (value.toString() === "HorseKind") {
    return <HorseKind />;
  } else if (value.toString() === "Meeting") {
    return <Meeting />;
  } else if (value.toString() === "News") {
    return <News />;
  } else if (value.toString() === "Jockey") {
    return <Jockey />;
  } else if (value.toString() === "Owner") {
    return <Owner />;
  } else if (value.toString() === "Nationality") {
    return <Nationality />;
  } else if (value.toString() === "Race") {
    return <Race />;
  } else if (value.toString() === "Racetype") {
    return <Racetype />;
  } else if (value.toString() === "Racename") {
    return <Racename />;
  }else if (value.toString() === "Racekind") {
    return <Racekind />;
  }else if (value.toString() === "RaceCard") {
    return <RaceCard />;
  }else if (value.toString() === "RaceCourse") {
    return <RaceCourse />;
  }else if (value.toString() === "Tracklength") {
    return <Tracklength />;
  }else if (value.toString() === "Trainer") {
    return <Trainer />;
  }else if (value.toString() === "Verdict") {
    return <Verdict />;
  }else if (value.toString() === "Sponsor") {
    return <Sponsor />;
  }else if (value.toString() === "Slider") {
    return <Slider />;
  }else if (value.toString() === "Seo ") {
    return <Seo  />;
  }
  else {
    return <Ads />;
  }
}

export default App;
