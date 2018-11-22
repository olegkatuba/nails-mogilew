import React, { Component } from "react";
import "./App.css";
import { Snackbar } from "@material-ui/core";
import WidgetsContailer from "./widgetsContailer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbarState: {}
    };
  }

  handleOnenSnackbar = state => {
    this.setState(prevState => ({
      ...prevState,
      snackbarState: {
        ...prevState.snackbarState,
        ...state,
        open: true
      }
    }));
  };

  handleCloseSnackbar = () => {
    this.setState(prevState => ({
      ...prevState,
      snackbarState: { ...prevState.snackbarState, open: false }
    }));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Nails Admin</p>
        </header>
        <main>
          <WidgetsContailer
            onenSnackbar={this.handleOnenSnackbar}
            closeSnackbar={this.handleCloseSnackbar}
          />
        </main>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.snackbarState.open}
          onClose={this.handleCloseSnackbar}
          autoHideDuration={3000}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          {...this.state.snackbarState}
        />
      </div>
    );
  }
}

export default App;
