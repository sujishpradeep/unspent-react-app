import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";

import Rewards from "./rewards";
import unspent from "../unspent.png";
import User from "./user";
import Boxes from "./boxes";
import Activity from "../common/activity";
import Logout from "../login/logout";
import { Button } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { Sidebar } from "semantic-ui-react";
import { Menu } from "semantic-ui-react";

class NavBar extends Component {
  state = { visible: false, counter: false };

  handleButtonClick = () => {
    if (this.state.isMobile) {
      const counter = !this.state.counter;
      const visible = counter;
      this.setState({ visible, counter: counter });
    }
  };

  handleSidebarHide = () => {
    const counter = !this.state.counter;
    if (this.state.isMobile) {
      this.setState({ visible: false, counter: counter });
    }
  };

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    const isMobile = window.innerWidth >= 600 ? false : true;

    if (!isMobile) {
      const visible = true;
      this.setState({ visible });
    } else {
      const visible = false;
      this.setState({ visible });
    }

    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: isMobile
    });
  }

  handleBookClick = () => {
    this.handleSidebarHide();
    //  window.location = "/activity";
    //  browserHistory.push("/activity");
  };
  render() {
    const { visible, isMobile } = this.state;
    const { activeItem } = this.state;

    return (
      <React.Fragment>
        <div className="mobile-view">
          <div id="navbar">
            {isMobile && (
              <div id="nav-unspent">
                <Button
                  onClick={this.handleButtonClick}
                  icon="align justify"
                  basic
                  inverted
                  className="mt5"
                ></Button>
              </div>
            )}
            {!isMobile && (
              // <div className="logo">
              //   <Image src={unspent} size="small"></Image>
              // </div>

              <div className="logo">
                <h1 className="logo-font"> #Unspent</h1>
              </div>
            )}
          </div>

          <Sidebar.Pushable>
            <Sidebar
              as={Menu}
              animation="overlay"
              icon="labeled"
              vertical
              visible={visible}
              width="thin"
            >
              <Menu.Item
                as={Link}
                onClick={this.handleBookClick}
                to="/rewards"
                active={activeItem === "rewards"}
              >
                <Icon name="user" />
                <div className={isMobile ? "black" : "black"}>Rewards</div>
              </Menu.Item>

              <Menu.Item as={Link} onClick={this.handleBookClick} to="/boxes">
                <Icon name="box"></Icon>
                <div className={isMobile ? "black" : "black"}>Redeem Boxes</div>
              </Menu.Item>

              <Menu.Item as={Link} to="/user" onClick={this.handleBookClick}>
                <Icon name="exchange" />
                <div className={isMobile ? "black" : "black"}>Activity</div>
              </Menu.Item>

              <Menu.Item as={Link} to="/logout" onClick={this.handleBookClick}>
                <Icon name="power off" />
                <div className={isMobile ? "black" : "black"}>Sign out</div>
              </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher>
              <div className="main-container">
                <Route
                  path="/boxes"
                  render={props => <Boxes {...props} isMobile={isMobile} />}
                />
                <Route
                  path="/rewards"
                  render={props => (
                    <Rewards {...props} accountid={this.props.accountid} />
                  )}
                />
                <Route
                  path="/user"
                  render={props => (
                    <User
                      {...props}
                      fullname={this.props.fullname}
                      rewards={this.props.rewards}
                      redeems={this.props.redeems}
                    />
                  )}
                />

                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={Rewards} />
              </div>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </React.Fragment>
    );
  }
}

export default NavBar;

/*

<div id="navbar">
      <div id="nav-unspent">

 <Link to="/">Unspent</Link>
   </div>
    </div>
 */
