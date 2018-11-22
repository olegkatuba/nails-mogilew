import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  CircularProgress,
  TextField,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
  Grid,
  ListItemAvatar,
  Avatar,
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import withWidget from "../widget";
import axios from "axios";
import config from "../config.json";

class ImagesWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      url: "",
      name: "",
      description: ""
    };
  }

  componentDidMount() {
    axios.get(config.apiPath + "/images").then(({ data: images }) => {
      this.setState({
        isLoading: false,
        images
      });
    });
  }

  deleteImage = _id => () => {
    this.setState({
      isLoading: true
    });
    axios.delete(config.apiPath + `/images/${_id}`).then(() => {
      this.props.onenSnackbar({
        message: "Image deleted"
      });
      this.setState(prevState => ({
        isLoading: false,
        images: prevState.images.filter(i => i._id !== _id)
      }));
    });
  };

  addImage = () => {
    const { name, url, description } = this.state;
    this.setState({
      isLoading: true
    });
    axios
      .post(config.apiPath + `/images`, { name, url, description })
      .then(({ data: image }) => {
        this.props.onenSnackbar({
          message: "Image added"
        });
        this.setState(prevState => ({
          isLoading: false,
          name: "",
          url: "",
          description: "",
          images: [...prevState.images, image]
        }));
      });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  /*onChange = event => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      console.log("RESULT", reader.result);
    };
    reader.readAsDataURL(file);
  };*/

  render() {
    const { isLoading, url, name, description, images } = this.state;
    const { isActive } = this.props;

    if (isLoading) {
      return <CircularProgress />;
    }

    return (
      <React.Fragment>
        <GridList cellHeight={180}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">Gallery</ListSubheader>
          </GridListTile>
          {images.map(image => (
            <GridListTile key={image._id}>
              <img src={image.url} alt={image.name} />
              <GridListTileBar
                title={image.name}
                subtitle={image.description}
                actionIcon={
                  <IconButton disabled={!isActive} aria-label="Delete">
                    <DeleteIcon onClick={this.deleteImage(image._id)} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        <ExpansionPanel>
          <ExpansionPanelSummary>
            <Typography>Add new image</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={24}>
              <Grid container xs={12} lg={8}>
                <Grid item xs={12}>
                  <TextField
                    label="Image name"
                    value={name}
                    onChange={this.handleChange("name")}
                    margin="dense"
                    disabled={!isActive}
                    fullWidth
                  />
                  <TextField
                    label="Image link"
                    value={url}
                    onChange={this.handleChange("url")}
                    margin="dense"
                    fullWidth
                    disabled={!isActive}
                    multiline
                    required
                    rowsMax="5"
                  />
                  <TextField
                    label="Description"
                    value={description}
                    onChange={this.handleChange("description")}
                    margin="dense"
                    fullWidth
                    disabled={!isActive}
                    multiline
                    rowsMax="5"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    disabled={!url || !isActive}
                    onClick={this.addImage}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
              <Grid style={{ textAlign: "center" }} item xs={true}>
                <img src={url} style={{ height: "150px" }} />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </React.Fragment>
    );
  }
}

export default withWidget({
  name: "images",
  title: "Images",
  description: "Upload or delete images which will be displayed in gallery"
})(ImagesWidget);
