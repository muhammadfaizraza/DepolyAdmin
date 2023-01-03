import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import "../CSS/sidebar.css";
import { useLocation } from "react-router-dom";
import { getUserDetails } from "../../redux/postReducer/UserPost";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  let { pathname } = useLocation();
  const dispatch = useDispatch();
  const { userToken,userInfo } = useSelector((state) => state.user)
  // useEffect(() => {
  //   if (userToken) {
  //     dispatch(getUserDetails());
  //   }
   
  // }, [userToken, dispatch]);

  return (
    <>
    {
      !userInfo && !userToken ? <></> :   <>
      {pathname !== "/" ? (
        <div className="adminsidebar">
          <div className="sidebar">
          <Link to="/dashboard" className="mylink">
            Dashboard
          </Link>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Race</Accordion.Header>
              <Accordion.Body
                className="AccordionBody"
                style={{ height: "157px" }}
              >
          
                <div>
                  <Link to="/racesPublish" className="mylink">
                    To Be Publish Race
                  </Link>
                </div>
                <div>
                  {" "}
                  <Link to="/raceform" className="mylink">
                    Add Race
                  </Link>
                </div>
             
                <div>
                  {" "}
                  <Link to="/racecard" className="mylink">
                    Add Race Card
                  </Link>
                </div>
          
                
                <div>
                  <Link to="/racenameform" className="mylink">
                    Add Race Name
                  </Link>
                </div>
           
            
            
          
                <div>
                  <Link to="/meeting" className="mylink">
                    Add Meeting Type
                  </Link>
                </div>
              
           
             
                <div>
                  <Link to="/verdict" className="mylink">
                    Add Verdict
                  </Link>
                </div>
                <div>
                  {" "}
                  <Link
                    to="/sponsorform"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Add Sponsor
                  </Link>
                </div>
             
                <div>
            
                  <Link to="/resultrace" className="mylink">
                    Race Results 
                  </Link>
                </div>
              </Accordion.Body>
            </Accordion.Item>
                   <Accordion.Item eventKey="14">
              <Accordion.Header>Race Listing</Accordion.Header>
              <Accordion.Body
                className="AccordionBody"
                style={{ height: "157px" }} >
                <div>
                  <Link to="/races" className="mylink">
                     Race 
                  </Link>
                </div>
            
             
                <div>
             
                  <Link to="/racecardlisting" className="mylink">
                     Race Card 
                  </Link>
                </div>
              
                <div>
                  <Link to="/racename" className="mylink">
                    Race Name 
                  </Link>
                </div>
                
                <div>
                  <Link
                    to="/sponsor"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                  Sponsor
                  </Link>
                </div>
           
            
            
          
             
                <div>
                  <Link to="/getmeeting" className="mylink">
                    Meeting Type
                  </Link>
                </div>
              
             
         
                <div>
                  <Link to="/verdictlist" className="mylink">
                    Verdict
                  </Link>
                </div>
               
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Actors</Accordion.Header>
              <Accordion.Body className="AccordionBody">
              <div>
           
                  <Link
                    to="/breeder"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Add Breeder
                  </Link>
                </div>
              <div>
               
                  <Link to="/horseform" className="mylink">
                    Add Horse
                  </Link>
                </div>

                <div>
                  {" "}
                  <Link to="/jockeyform" className="mylink">
                   Add Jockey 
                  </Link>
                </div>
              
                <div>
              
                  <Link to="/trainerform" className="mylink">
                    Add Trainer
                  </Link>
                </div>
                <div>
                  {" "}
                  <Link to="/ownerform" className="mylink">
                Add Owner
                  </Link>
                </div>
         
         
                
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Actors Listing</Accordion.Header>
              <Accordion.Body className="AccordionBody">
              <div>
                  {" "}
                  <Link
                    to="/breederlist"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Breeder
                  </Link>
                </div>
                <div>
                  <Link to="/horse" className="mylink">
                  Horse
                  </Link>
                </div>
                <div>
                  <Link to="/jockey" className="mylink">
                 Jockey
                  </Link>
                </div>
                <div>
                  <Link to="/trainer" className="mylink">
                   Trainer
                  </Link>
                </div>
                <div>
                  <Link to="/owner" className="mylink">
                 Owner
                  </Link>
                </div>
          
             
         
           
              </Accordion.Body>
            </Accordion.Item>
      
        
            <Accordion.Item eventKey="3">
              <Accordion.Header>Competition </Accordion.Header>
              <Accordion.Body className="AccordionBody">
        
                <div>
                  {" "}
                  <Link to="/addcompetition" className="mylink">
                    Add Competition
                  </Link>
                </div>
       
                <div>
                  {" "}
                  <Link to="/addCategory" className="mylink">
                    Add Category
                  </Link>
                </div>
                <div>
                  <Link to="/addcompetitionPoint" className="mylink">
                   Add Point 
                  </Link>
                </div>
                
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="16">
              <Accordion.Header>Competition Listing </Accordion.Header>
              <Accordion.Body className="AccordionBody">
                <div>
                  <Link to="/competitionlisting" className="mylink">
                   Competition
                  </Link>
                </div>
          
                <div>
                  <Link to="/CategoryListing" className="mylink">
                   Competition Category 
                  </Link>
                </div>
                <div>
                  <Link to="/viewcompetitionPoint" className="mylink">
                    Points   
                  </Link>
                </div>
                
              </Accordion.Body>
            </Accordion.Item>
            {/* <Accordion.Item eventKey="7">
              <Accordion.Header>Statistics</Accordion.Header>
              <Accordion.Body className="AccordionBody">
                <div>
                  <Link
                    to="/statistics"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    View Listing
                  </Link>
                </div>
                <div>
                  {" "}
                  <Link
                    to="/statistics"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Add New
                  </Link>
                </div>
              </Accordion.Body>
            </Accordion.Item> */}
            <Accordion.Item eventKey="4">
              <Accordion.Header>News</Accordion.Header>
              <Accordion.Body className="AccordionBody">
                <div>
                  <Link
                    to="/news"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    View Listing
                  </Link>
                </div>
                <div>
                  {" "}
                  <Link
                    to="/newsform"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Add New
                  </Link>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>Advertisement</Accordion.Header>
              <Accordion.Body className="AccordionBody">
                <div>
                  <Link
                    to="/ads"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    View Listing
                  </Link>
                </div>
                <div>
                  {" "}
                  <Link
                    to="/adsform"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Add New
                  </Link>
                </div>
              </Accordion.Body>
            </Accordion.Item>
       
            <Accordion.Item eventKey="7">
              <Accordion.Header>Slider</Accordion.Header>
              <Accordion.Body className="AccordionBody">
                <div>
                  <Link
                    to="/slider"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    View Listing
                  </Link>
                </div>
                <div>
                  {" "}
                  <Link
                    to="/sliderform"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Add New
                  </Link>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="8">
              <Accordion.Header>Setup Forms </Accordion.Header>
              <Accordion.Body className="AccordionBody">
                <div>
                  <Link
                    to="/color"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Add Color
                  </Link>
                </div>
                <div>
                  {" "}
                  <Link
                    to="/currency"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Add Currency
                  </Link>
                </div>
             
                <div>
                  {" "}
                  <Link
                    to="/nationality"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Add Nationality
                  </Link>
                </div>
                <div>
                  <Link to="/ground" className="mylink">
                    Add Ground Type
                  </Link>{" "}
                </div>
                <div>
                  {" "}
                  <Link
                    to="/gender"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Add Gender
                  </Link>
                </div>
                <div>
                  {" "}
                  <Link to="/racecourseform" className="mylink">
                    Add Race Course
                  </Link>
                </div>
                <div>
                  <Link to="/horsekindform" className="mylink">
                    Add Horse Kind{" "}
                  </Link>
                </div>
                <div>
                  <Link to="/racekindform" className="mylink">
                    Add Race Kind{" "}
                  </Link>
                </div>
                <div>
                  <Link to="/tracklengthform" className="mylink">
                    Add Track Length
                  </Link>{" "}
                </div>
                <div>
                  <Link to="/racetypeform" className="mylink">
                    Add Race Type
                  </Link>
                </div>
                <div>
                  <Link
                    to="/equipment"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    
                    Add Equipment
                  </Link>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="9">
              <Accordion.Header>Setup Listing</Accordion.Header>
              <Accordion.Body className="AccordionBody">
                <div>
                  <Link
                    to="/colorlist"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Color
                  </Link>
                </div>
                <div>
                  
                  <Link
                    to="/currencylist"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Currency
                  </Link>
                </div>
             
                <div>
                  {" "}
                  <Link to="/horsekind" className="mylink">
                    Horse Kind 
                  </Link>
                </div>
                <div>
                  <Link to="/groundlist" className="mylink">
                    Ground Type 
                  </Link>{" "}
                </div>
                <div>
                  <Link to="/tracklength" className="mylink">
                    Track Length
                  </Link>{" "}
                </div>
                <div>
                  {" "}
                  <Link
                    to="/nationalitylist"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Nationality{" "}
                  </Link>
                </div>
                <div>
                  {" "}
                  <Link to="/racecourse" className="mylink">
                    Race Course
                  </Link>
                </div>
                <div>
                  <Link to="/racekind" className="mylink">
               
                    Race Kind 
                  </Link>
                </div>
                <div>
                  <Link to="/racetype" className="mylink">
                    Race Type
                  </Link>{" "}
                </div>
                <div>
              
                  <Link
                    to="/genderlist"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Gender
                  </Link>
                </div>
                <div>
                  <Link
                    to="/equipmentlist"
                    className="mylink"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Equipment
                  </Link>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="10">
              <Accordion.Header>SEO</Accordion.Header>
              <Accordion.Body className="AccordionBody">
                <div>
                  <Link to="/seolisting" className="mylink"   onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}>
                    View Listing
                  </Link>
                </div>
                <div>
                  
                  <Link to="/seoform" className="mylink"   onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}>
                    Add New
                  </Link>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="11">
              <Accordion.Header>User Management</Accordion.Header>
              <Accordion.Body className="AccordionBody">
                <div>
                  <Link to="/userlist" className="mylink"   onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}>
                    View User
                  </Link>
                </div>
                <div>
                  
                  <Link to="/subscriberlist" className="mylink"   onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}>
                    View Subscriber
                  </Link>
                </div>
              </Accordion.Body>
            </Accordion.Item>
           
          </Accordion>
         
          <div className="SettingSec1">
            <Link
              to="/deletedtable"
              className="mylink"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
              }}
            >
              Deleted Data
            </Link>
          </div>
          
          {/* <div className="SettingSec">
            <Link
              to="/newsletter"
              className="mylink"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
              }}
            >
              NewsLetter
            </Link>
          </div> */}
          {/* <hr /> */}
          
          <div className="SettingSec">
            <Link
              to="/setting"
              className="mylink"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
              }}
            >
              Setting
            </Link>
            
          </div>
        </div>
        </div>
      ) : null}
      </>
    }
    
    </>
  );
};

export default Sidebar;
