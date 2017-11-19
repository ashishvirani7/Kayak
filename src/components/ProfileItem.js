import React,{Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AccountCircle from '../icons/IconAccount';
import IconButton from 'material-ui/IconButton';
import CustomItem from './CustomItem';


class ProfileItem extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
          open: false,
        };
      }
      handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();
    
        this.setState({
          open: true,
          anchorEl: event.currentTarget,
        });
      };
    
      handleRequestClose = () => {
        this.setState({
          open: false,
        });
      };
    
    render() {

        return (
            <div className="row" style={{cursor:'pointer'}}>
                    <div className="col-md-4"></div>
                    <div className="col-md-8" onClick={this.handleTouchTap}>
                        <div className="row">
                            <div className="col-md-3" >
                                <IconButton>
                                    <AccountCircle color="white" width="32" height="32"/>
                                </IconButton>
                            </div>
                        
                            <div className="col-md-9">
                                <CustomItem name="My Account" />
                            </div>
                        </div>
                    </div>
                    
                    <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    >
                    <Menu>
                        <MenuItem primaryText="Refresh" />
                        <MenuItem primaryText="Help &amp; feedback" />
                        <MenuItem primaryText="Settings" />
                        <MenuItem primaryText="Sign out" />
                    </Menu>
                    </Popover>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
    
        }
        ,dispatch);
  }
  
  export default connect(mapStateToProps,matchDispatchToProps)(ProfileItem);