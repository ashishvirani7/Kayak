import React,{Component} from 'react';

class PaymentPage extends Component
{
    render(){
        return(
            <div>
                <div className="row">
                    <span style={titlestyle}>
                        Payment Methods
                    </span> 
                    <hr style={{borderTop:'2px solid rgba(0,0,0,0.1)',width:'90%',marginTop:'7px',marginLeft:'0px'}}/>       
                </div>
            </div>
        )
    }
}

const titlestyle={
    fontSize: '30px',
    fontWeight: '200',
    marginBottom:'20px'
}
export default PaymentPage;