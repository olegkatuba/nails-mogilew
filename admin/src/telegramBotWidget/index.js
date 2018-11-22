import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  ListItemAvatar,
  CircularProgress,
  Avatar
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import withWidget from "../widget";
import axios from "axios";
import config from "../config.json";

class TelegramBotWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    axios
      .get(config.apiPath + "/telegramBot/recipients")
      .then(({ data: recipients }) => {
        this.setState({
          isLoading: false,
          recipients
        });
      });
  }

  deleteRecipient = id => () => {
    this.setState({
      isLoading: true
    });
    axios
      .delete(config.apiPath + `/telegramBot/recipients/${id}`)
      .then(({ data: recipients }) => {
        this.setState({
          isLoading: false,
          recipients
        });
      });
  };

  render() {
    const { isLoading, recipients } = this.state;
    const { isActive } = this.props;

    if (isLoading) {
      return <CircularProgress />;
    }

    return (
      <List>
        {recipients.map(recipient => (
          <ListItem key={recipient.id}>
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src={recipient.photoUrl || config.defaultAvatar}
              />
            </ListItemAvatar>
            <ListItemText
              primary={`${recipient.firstName} ${recipient.lastName}`}
              secondary={recipient.id}
            />
            <ListItemSecondaryAction>
              <IconButton disabled={!isActive} aria-label="Delete">
                <DeleteIcon onClick={this.deleteRecipient(recipient.id)} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

export default withWidget({
  name: "telegramBot",
  title: "Telegram Bot",
  description:
    "Here you can see and edit list of telegram users which will receive messages about booking and adding new comment"
})(TelegramBotWidget);
