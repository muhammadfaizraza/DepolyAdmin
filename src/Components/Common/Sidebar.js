import React from 'react'
import { Link } from 'react-router-dom'
import Accordion from 'react-bootstrap/Accordion';
import '../CSS/sidebar.css'
import { useLocation } from 'react-router-dom';



const Sidebar = () => {
  let {pathname} = useLocation();
  return (
<>
{
  pathname !== '/' ?  <div className='sidebar'>
  <Link to='/dashboard' className='mylink'>Dashboard</Link>
  <Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header>Races</Accordion.Header>
    <Accordion.Body className='AccordionBody' style={{height:"157px"}}>
    <div><Link to='/races' className='mylink'>View Listings</Link></div>
   <div> <Link to='/raceform' className='mylink'>Add New</Link></div>
   <div><Link to='/racename' className='mylink'>Race Name Listing</Link> </div>
   <div> <Link to='/racecard' className='mylink'>Create Race Card</Link></div>
   <div><Link to='/racenameform' className='mylink'>Add Race Name</Link></div>
   <div><Link to='/racetype' className='mylink'>Race Type Listing</Link> </div>
   <div><Link to='/racetypeform' className='mylink'>Add Race Type</Link>  </div>
   <div><Link to='/racekindform' className='mylink'>Add Race Kind</Link>  </div>
   <div><Link to='/racekind' className='mylink'> Race Kind Listing</Link>  </div>
   <div><Link to='/meeting' className='mylink'>Add Meeting </Link>  </div>
   <div><Link to='/getmeeting' className='mylink'>Meeting Type</Link> </div>
   <div><Link to='/verdict' className='mylink'>Add Verdict</Link> </div>
   <div><Link to='/verdictlist' className='mylink'>Verdict</Link> </div>
   <div> <Link to='/resultrace' className='mylink'>Add Results</Link></div>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header>Race Course</Accordion.Header>
    <Accordion.Body className='AccordionBody'>
    <div>  <Link to='/racecourse' className='mylink'>View Listing</Link></div>
   <div>   <Link to='/racecourseform' className='mylink'>Add New</Link></div>
    
   <div><Link to='/tracklength' className='mylink'>Track Length Listing</Link> </div>
   <div><Link to='/tracklengthform' className='mylink'>Add Track Length</Link>  </div>
   <div><Link to='/ground' className='mylink'>Add Ground Type</Link>  </div>
   <div><Link to='/groundlist' className='mylink'>Ground Type Listing</Link>  </div>

    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header>Horses</Accordion.Header>
    <Accordion.Body className='AccordionBody'>
    <div><Link to='/horse' className='mylink'>View Listing</Link></div>
   <div> <Link to='/horseform' className='mylink'>Add New</Link></div>
   <div> <Link to='/horsekind' className='mylink'>Horse Kind Listing</Link></div>
   <div><Link to='/horsekindform' className='mylink'>Add Horse Kind  </Link>  </div>

    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header>Jockey</Accordion.Header>
    <Accordion.Body className='AccordionBody'>
    <div><Link to='/jockey' className='mylink'>View Listing</Link></div>
   <div> <Link to='/jockeyform' className='mylink'>Add New</Link></div>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header>Trainer</Accordion.Header>
    <Accordion.Body className='AccordionBody'>
    <div><Link to='/trainer' className='mylink'>View Listing</Link></div>
   <div> <Link to='/trainerform' className='mylink'>Add New</Link></div>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header>Owner</Accordion.Header>
    <Accordion.Body className='AccordionBody'>
    <div><Link to='/owner' className='mylink'>View Listing</Link></div>
   <div> <Link to='/ownerform' className='mylink'>Add New</Link></div>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="6">
    <Accordion.Header>Competition</Accordion.Header>
    <Accordion.Body className='AccordionBody'>
    <div><Link to='/competition' className='mylink'>View Listing</Link></div>
   <div> <Link to='/competition' className='mylink'>Add New</Link></div>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="7">
    <Accordion.Header>Statistics</Accordion.Header>
    <Accordion.Body className='AccordionBody'>
    <div><Link to='/statistics' className='mylink'onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>View Listing</Link></div>
   <div> <Link to='/statistics' className='mylink'onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>Add New</Link></div>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="8">
    <Accordion.Header>News</Accordion.Header>
    <Accordion.Body className='AccordionBody'>
    <div><Link to='/news' className='mylink'onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>View Listing</Link></div>
   <div> <Link to='/newsform' className='mylink'onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>Add New</Link></div>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="9">
    <Accordion.Header>Advertisement</Accordion.Header>
    <Accordion.Body className='AccordionBody'>
    <div><Link to='/ads' className='mylink'onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>View Listing</Link></div>
   <div> <Link to='/adsform' className='mylink'onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>Add New</Link></div>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="10">
    <Accordion.Header>Sponsor</Accordion.Header>
    <Accordion.Body className='AccordionBody'>
    <div><Link to='/sponsor' className='mylink'onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>View Listing</Link></div>
   <div> <Link to='/sponsorform' className='mylink'onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>Add New</Link></div>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="11">
    <Accordion.Header>Slider</Accordion.Header>
    <Accordion.Body className='AccordionBody'>
    <div><Link to='/slider' className='mylink'onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>View Listing</Link></div>
   <div> <Link to='/sliderform' className='mylink'onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>Add New</Link></div>
    </Accordion.Body>
    
    
  </Accordion.Item >
<Accordion.Item eventKey="12">
  <Accordion.Header>Create Features </Accordion.Header>
    <Accordion.Body className='AccordionBody'>

    <div><Link to='/color' className='mylink'  onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>Add Color</Link></div>
   <div> <Link to='/currency' className='mylink'  onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>Add Currency</Link></div>
   <div> <Link to='/breeder' className='mylink'  onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>Add Breeder</Link></div>
   <div> <Link to='/nationality' className='mylink'  onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>Add Nationality</Link></div>
   <div> <Link to='/gender' className='mylink'  onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>Add Gender</Link></div>
 <div><Link to ='/equipment' className='mylink'  onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}> Add Equipment  </Link></div>

    </Accordion.Body>
    </Accordion.Item>

    <Accordion.Item eventKey="13">
  <Accordion.Header>Features Listing</Accordion.Header>
    <Accordion.Body className='AccordionBody'>
  
    <div><Link to='/colorlist' className='mylink'  onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>Color </Link></div>
   <div> <Link to='/currencylist' className='mylink'  onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>Currency </Link></div>
   <div> <Link to='/breederlist' className='mylink'  onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>Breeder </Link></div>
   <div> <Link to='/nationalitylist' className='mylink'  onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>Nationality </Link></div>
   <div> <Link to='/genderlist' className='mylink'  onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>Gender </Link></div>
  <div><Link to="/equipmentlist" className='mylink'  onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>Equipment </Link> </div>


    </Accordion.Body>
    </Accordion.Item>


 
</Accordion>
<hr/>
<div className='SettingSec' ><Link to='/setting' className='mylink'onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: "smooth",
                                });
                              }}>Setting</Link></div>
  </div> : null
}
</>
    
  )
}

export default Sidebar