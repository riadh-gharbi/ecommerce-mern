import { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

//class based react component
class loginModal extends Component {
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired //
    };

    componentDidUpdate(prevProps)
    {
        const { error, isAuthenticated } = this.props;
        if (error != prevProps.error)
        {
            //loginError check
            if (error.id === 'LOGIN_FAIL')
            { 
                this.setState({ msg: error.msg.msg });
            }
            else
            {
                this.setState({ msg: null });
            }
        }

        //if authenticated, close modal
        if (this.state.modal)
        {
            if (isAuthenticated)
            {
                this.toggle();
            }
        }
    }

    toggle = () => {
        //remove errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };

    
}