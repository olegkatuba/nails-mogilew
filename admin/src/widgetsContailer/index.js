import React, { Component } from "react";
import { LinearProgress, Grid } from "@material-ui/core";
import TelegramBotWidget from "../telegramBotWidget";
import CommentsWidget from "../commentsWidget";
import EmailWidget from "../emailWidget";
import ImagesWidget from "../imagesWidget";
import axios from "axios";
import config from "../config.json";

class WidgetsContailer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      modalOpen: false
    };
  }

  componentDidMount() {
    axios.get(config.apiPath + "/config").then(({ data: config }) => {
      this.setState({
        isLoading: false,
        ...config
      });
    });
  }

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    if (this.state.isLoading) {
      return <LinearProgress />;
    }

    return (
      <React.Fragment>
        <Grid container spacing={16}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TelegramBotWidget
              isActive={this.state.telegramBot}
              onenSnackbar={this.props.onenSnackbar}
              closeSnackbar={this.props.closeSnackbar}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <CommentsWidget
              isActive={this.state.comments}
              onenSnackbar={this.props.onenSnackbar}
              closeSnackbar={this.props.closeSnackbar}
            />
          </Grid>
          <Grid item lg={8} md={6} sm={6} xs={12}>
            <ImagesWidget
              isActive={this.state.images}
              onenSnackbar={this.props.onenSnackbar}
              closeSnackbar={this.props.closeSnackbar}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default WidgetsContailer;
