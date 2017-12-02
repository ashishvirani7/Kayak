import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import {withRouter} from 'react-router-dom';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeHotelListing} from '../actions/hotelListingAction';
import {changeHotelSearch} from '../actions/hotelSearchAction';
import AutoComplete from 'material-ui/AutoComplete';
import * as API from '../api/API';

var city_names = ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];
class HotelSearch extends Component{

    
    state = {
        valueRoom:1,
        valueGuest:1,
        dataSource:city_names
        }

    handleChangeRoom = (event, index, valueRoom) => this.setState({...this.state,valueRoom:valueRoom});
    handleChangeGuest = (event, index, valueGuest) => this.setState({...this.state,valueGuest:valueGuest});

    

    render() {
        return(
            <div className="col-md-12">
                <div className="row" style={rstyle}>
                    <div className="col-md-3" >
                        <div className="row" style={divstyle}>
                            
                            <AutoComplete style={istyle}
                            id="destination"
                            hintText="Where"
                            required="required"
                            dataSource={this.state.dataSource}
                            onUpdateInput={this.handleDestChange}
                            filter={AutoComplete.caseInsensitiveFilter}
                            maxSearchResults	= {5}
                            />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row" style={divstyle}>
                            <DatePicker id="fromDate" style={istyle} hintText="From" container="inline" autoOk />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row" style={divstyle}>
                            <DatePicker id="toDate" style={istyle} hintText="To" container="inline" autoOk/>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row" style={divstyle}>
                            <SelectField
                                value={this.state.valueRoom}
                                onChange={this.handleChangeRoom}
                                style={istyle}
                                >
                                <MenuItem value={1} primaryText="1 Room" />
                                <MenuItem value={2} primaryText="2 Rooms" />
                                <MenuItem value={3} primaryText="3 Rooms" />
                                <MenuItem value={4} primaryText="4 Rooms" />
                                <MenuItem value={5} primaryText="5 Rooms" />
                                <MenuItem value={6} primaryText="6 Rooms" />
                            </SelectField>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="row" style={divstyle}>
                            <SelectField
                                value={this.state.valueGuest}
                                onChange={this.handleChangeGuest}
                                style={istyle}
                                >
                                <MenuItem value={1} primaryText="1 guest" />
                                <MenuItem value={2} primaryText="2 guests" />
                                <MenuItem value={3} primaryText="3 guests" />
                                <MenuItem value={4} primaryText="4 guests" />
                                <MenuItem value={5} primaryText="5 guests" />
                                <MenuItem value={6} primaryText="6 guests" />
                                <MenuItem value={7} primaryText="7 guests" />
                                <MenuItem value={8} primaryText="8 guests" />
                                <MenuItem value={9} primaryText="9 guests" />
                                <MenuItem value={10} primaryText="10 guests" />
                            </SelectField>
                        </div>
                    </div>
                    <div className="col-md-1">
                        <div className="row" style={divstyle}>
                            <button style={btnstyle}
                                id="destbtn"
                                hintText="Where"
                                type="submit"
                                onClick={()=>{
                                    
                                    var data ={
                                        city:document.getElementById('destination').value,
                                        checkIn:     document.getElementById('fromDate').value,
                                        checkOut:   document.getElementById('toDate').value,
                                        noOfRoom:   this.state.valueRoom,
                                        noOfGuest:  this.state.valueGuest,
                                        filter_prop:{ratings: 0},
                                        order:'price_asc'
                                    }
                                    if(data.city && data.checkIn && data.checkOut){
                                        console.log(data);
                                        this.props.changeHotelSearch(data);
                                        API.doHotelSearch(data)
                                        .then((res)=>{
                                            if(res.status===201){
                                                res.json().then(items=>{
                                                    this.props.changeHotelListing(items.data);
                                                    this.props.history.push("/hotelResults");
                                                });
                                            }
                                        });
                                    }
                                    else{
                                        NotificationManager.warning('Enter Search Details','Search Fields are Empty',2500);
                                    }
                                }}
                            >
                            <IconArrow color="white"/> 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const rstyle={
    marginTop:'50px',
    marginRight:'15px',
    marginLeft:'15px'
}

const istyle={
    fontSize:'16px',
    fontWeight:'600',
    height:'50px',
    width:'100%',
    backgroundColor:'white',
    marginLeft:'5px',
    marginRight:'5px',
    barderSize:'1px',
    borderColor:'black',
    textAlign:'center',
}

const btnstyle={
    border:'none',
    fontSize:'16px',
    height:'50px',
    width:'80%',
    marginLeft:'5px',
    marginRight:'5px',
    backgroundImage: 'linear-gradient(135deg,#ff690f 0%,#ff4f3a 100%)',
}

const divstyle={
    marginLeft:'-20px',
    marginRight:'-2px',
}

function mapStateToProps(state){
    return{
        userData:state.userData,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeHotelListing,
            changeHotelSearch,
        }
        ,dispatch);
  }

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(HotelSearch));
//export default HotelSearch;