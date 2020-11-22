import React from 'react';
import onClickOutside from 'react-onclickoutside';
import './Dropdown.css';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = { expanded: false };
        this.handleChoice = this.handleChoice.bind(this);
        this.expand = this.expand.bind(this);
        this.collapse = this.collapse.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleChoice(choice) {
        this.props.handleChoice(choice);
    }

    expand() {
        this.setState({ expanded: true });
    }

    collapse() {
        this.setState(({ expanded: false }));
    }

    toggle() {
        this.setState(state => ({ expanded: !state.expanded }));
    }

    handleClickOutside() {
        this.collapse();
    }

    render() {
        let content = null;
        if (this.state.expanded) {
            content = (
                <div className="dropdown-content">
                    {this.props.options.map(option => (
                        <div onClick={() => { this.handleChoice(option); this.collapse() }} key={option}>{option}</div>
                    ))}
                </div>
            )
        }

        return (
            <div className='dropdown'>
                <div className='dropbtn' onClick={this.toggle}>
                    {`${this.props.displayValue} `}
                    <i className="fas fa-angle-down"></i>
                </div>
                {content}
            </div>
        );
    }
}

export default onClickOutside(Dropdown);