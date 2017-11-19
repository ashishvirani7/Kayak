import React,{Component} from 'react';
import Slider from 'react-slick';
import Paper from 'material-ui/Paper';

class CustomSlider extends Component{

    cards = () => {
        return (
            <div>
                <Paper style={style} zDepth={3} circle={false} >

                </Paper>
            </div>
        )
    }

    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3   
        };
        return (
            <div className="col-md-12">
                <Slider {...settings}>
                    {this.cards()}
                    {this.cards()}
                    {this.cards()}
                    {this.cards()}
                    {this.cards()}
                    {this.cards()}
                </Slider>
            </div>
        )
    }
}

const style = {
    height: 300,
    width: 300,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

export default CustomSlider;