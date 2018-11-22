import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Switch,
  Typography
} from "@material-ui/core";
import axios from "axios";
import config from "../config.json";

export default ({ name, title, description }) => Component =>
  class Widget extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isActive: props.isActive,
        isDisabled: false,
        snackbarState: {}
      };
    }

    toggleActive = event => {
      this.props.onActiveChange(event.target.checked);
    };

    handleActivation = () => {
      this.setState({
        isDisabled: true
      });
      axios
        .put(config.apiPath + "/config", {
          [name]: !this.state.isActive
        })
        .then(res => {
          this.setState(prevState => ({
            isActive: !prevState.isActive,
            isDisabled: false
          }));
        });
    };

    render() {
      return (
        <Card style={{ height: "100%" }}>
          <CardHeader
            action={
              <Switch
                checked={this.state.isActive}
                onChange={this.handleActivation}
                disabled={this.state.isDisabled}
                color="primary"
              />
            }
            title={title}
          />
          <CardContent>
            <Typography component="p">{description}</Typography>
            <Component {...this.props} isActive={this.state.isActive} />
          </CardContent>
        </Card>
      );
    }
  };
