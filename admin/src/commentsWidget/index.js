import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Checkbox,
  CircularProgress,
  TextField,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  FormControl,
  Button,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import withWidget from "../widget";
import axios from "axios";
import config from "../config.json";

class CommentsWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      author: "",
      text: ""
    };
  }

  componentDidMount() {
    axios.get(config.apiPath + "/comments").then(({ data: comments }) => {
      this.setState({
        isLoading: false,
        comments
      });
    });
  }

  deleteComment = id => () => {
    this.setState({
      isLoading: true
    });
    axios
      .delete(config.apiPath + `/comments/${id}`)
      .then(({ data: comments }) => {
        this.props.onenSnackbar({
          message: "Comment deleted"
        });
        this.setState({
          isLoading: false,
          comments
        });
      });
  };

  aproveComment = id => ({ target: { checked } }) => {
    this.setState({
      isLoading: true
    });
    axios
      .put(config.apiPath + `/comments/${id}/approve`, {
        approved: checked
      })
      .then(({ data: comments }) => {
        this.props.onenSnackbar({
          message: `Comment ${checked ? "approved" : "rejected"}`
        });
        this.setState({
          isLoading: false,
          comments
        });
      });
  };

  addComment = () => {
    const { author, text } = this.state;
    this.setState({
      isLoading: true
    });
    axios
      .post(config.apiPath + `/comments`, { author, text })
      .then(({ data: comment }) => {
        this.props.onenSnackbar({
          message: "Comment added"
        });
        this.setState(prevState => ({
          isLoading: false,
          author: "",
          text: "",
          comments: [...prevState.comments, comment]
        }));
      });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { isLoading, comments, author, text } = this.state;
    const { isActive } = this.props;

    if (isLoading) {
      return <CircularProgress />;
    }

    return (
      <React.Fragment>
        <List>
          {comments.map(comment => (
            <ListItem key={comment._id}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={config.defaultAvatar} />
              </ListItemAvatar>
              <ListItemText primary={comment.text} secondary={comment.author} />
              <ListItemSecondaryAction>
                <Checkbox
                  checked={comment.approved}
                  disabled={!isActive}
                  onChange={this.aproveComment(comment._id)}
                  color="primary"
                />
                <IconButton disabled={!isActive} aria-label="Delete">
                  <DeleteIcon onClick={this.deleteComment(comment._id)} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <ExpansionPanel>
          <ExpansionPanelSummary>
            <Typography>Add new comment</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FormControl fullWidth required>
              <TextField
                label="Name"
                disabled={!isActive}
                required
                value={author}
                onChange={this.handleChange("author")}
                margin="dense"
                fullWidth
              />
              <TextField
                label="Comment"
                required
                disabled={!isActive}
                multiline
                rowsMax="5"
                rows="2"
                value={text}
                onChange={this.handleChange("text")}
                margin="dense"
                fullWidth
              />
              <Button disabled={!author || !text} onClick={this.addComment}>
                Save
              </Button>
            </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </React.Fragment>
    );
  }
}

export default withWidget({
  name: "comments",
  title: "User comments",
  description: "List of user comments"
})(CommentsWidget);
