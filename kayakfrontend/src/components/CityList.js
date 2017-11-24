import React,{Component} from 'react';
import CityListItem from './CityListItem';
import Divider from 'material-ui/Divider'

class CityList extends Component{

    addCards = () => {
        const var1 = [
            {name:"New York"},
            {name:"San Fransisco"},
            {name:"Miami"},
            {name:"Fort Lauderdale"},
            {name:"Denver"}
        ]

        return var1.map(item=>(
            <div style={{marginTop:'6px'}}>
                <div className="row">
                    <CityListItem  name={item.name} />
                </div>
                <div className="row">
                    <Divider inset style={{marginLeft:'0px',marginRight:'0px'}}/>
                </div>
            </div>
        ))
    }

    render(){
        return(
            <div>
                <div className="col-md-4">
                    <div class="row" style={dstyle}>
                        <div className="col-md-12">
                            {this.addCards()}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div class="row" style={dstyle}>
                        <div className="col-md-12">
                            {this.addCards()}   
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div class="row" style={dstyle}>
                        <div className="col-md-12">
                            {this.addCards()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const dstyle={
    marginTop:'70px',
    marginLeft:'3px',
    marginRight:'3px'
}

export default CityList;