import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppNavBar from './AppNavBar';
import { Card, CardText, CardBody, CardTitle, CardImg, CardSubtitle, Button, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import { addToCart } from '../actions/cartActions';

export default class Home extends Component {
  static propTypes = {
      getItems: PropTypes.func.isRequired,
      item: PropTypes.object.isRequired,
      isAuthenticated: PropTypes.bool,
      addToCart: PropTypes.func.isRequired,
      user : PropTypes.object.isRequired
    }
    
    componentDidMount() {
        this.props.getItems();
    }

    onAddToCart = async (id, productId) => {
        await this.props.addToCart(id, productId, 1);
        alert('Item added to Cart');
    }




    render() {
        const { items } = this.props.item;
        const  user  = this.props.user
    return (
      <div>
            <AppNavBar />
            <Container>
                <div className="row">
                    {items.map((item) => (
                        <div className="col-md-4">
                            <Card className='mb-4'>
                                <CardImg top width="100%" src={item.image} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle tag="h5">{item.name}</CardTitle>
                                    <CardSubtitle tag="h6"> {item.price} </CardSubtitle>
                                    <CardText>{item.category}</CardText>
                                    {this.props.isAuthenticated ? 
                                        <Button
                                            color="succes"
                                            size="sm"
                                            onClick={this.onAddToCart.bind(this, user._id, item._id)}
                                        >Add To Cart

                                        </Button> :
                                        null
                                    }
                                    </CardBody>
                            </Card>
                            </div>)
                    )}
                </div>
            </Container>
        </div>
    )
  }
}
