import React, { Fragment, Component } from "react";
import "./App.css";
import { Row, Col, Container, Button } from "reactstrap";
import illustration from "./assets/undraw_selected_options_42hx.svg";
import InputAlternative from "./components/InputAlternative";
import axios from "axios";

const HOST_NAME = "http://localhost:8000";

class App extends Component {
  state = {
    alternatives: [
      {
        name: "",
        price: 0,
        ram: 0,
        size: 0,
        processor: 0,
        vga: 0,
        selectedOS: [],
        selectedGenres: [],
        selectedPlayers: [],
        isVRSupported: false,
        selectedOthers: [],
      },
    ],
    alternativesTitle: [],
  };

  handleRanking = () => {
    const _newAlternatives = this.state.alternatives.map((alternative) =>
      Object.values(alternative)
    );

    const newAlternatives = _newAlternatives.reduce((arrAlt, alternative) => {
      const newArrAlt = alternative.map((alt) => {
        if (Array.isArray(alt) && alt.length) {
          const newAltValue = alt.map((altVal) => altVal.value);
          return newAltValue;
        }
        return alt;
      });
      return [...arrAlt, newArrAlt];
    }, []);
    const alternativesCriteria = [];
    const alternativesTitle = newAlternatives.map((newAlt) => {
      const [title, ...rest] = newAlt;
      alternativesCriteria.push(rest);
      return title;
    });
    this.setState({ alternativesTitle });
    axios
      .post(`${HOST_NAME}/moora`, alternativesCriteria)
      .then((res) => console.log(res));
    console.log(alternativesTitle);
    console.log(alternativesCriteria);
  };

  handleInputChange = (index, name, value) => {
    const values = [...this.state.alternatives];
    if (name === "isVRSupported") {
      values[index][name] = !values[index][name];
    } else {
      values[index][name] = value;
    }
    this.setState({ alternatives: values });
  };

  handleAddFields = () => {
    const values = [...this.state.alternatives];
    values.push({
      name: "",
      price: 0,
      ram: 0,
      size: 0,
      processor: 0,
      vga: 0,
      selectedOS: [],
      selectedGenres: [],
      selectedPlayers: [],
      isVRSupported: false,
      selectedOthers: [],
    });
    this.setState({ alternatives: values });
  };

  handleRemoveFields = (index) => {
    const values = [...this.state.alternatives];
    values.splice(index, 1);
    this.setState({ alternatives: values });
  };

  render() {
    return (
      <Fragment>
        <Container className="mb-5">
          <h3 className="text-center mt-4 text-muted py-3">
            SPK | Daffa Akbar Dwiputra Damarriyanto
          </h3>
          <hr />
          <Row className="vh-75 mt-5">
            <Col md="4">
              <div className="d-flex flex-column justify-content-center align-items-center h-75">
                <h1 className="font-weight-bolder mb-3">
                  Sistem Pendukung Keputusan
                </h1>
                <h3 className="mb-5">Pemilihan Game dengan Metode Moora</h3>
                <a href="#alternatives" className="align-self-start">
                  <Button
                    color="primary"
                    size="lg"
                    className=" rounded-pill bg-purple border-0 px-4 py-3"
                  >
                    Coba Sekarang
                  </Button>
                </a>
              </div>
            </Col>
            <Col md="8">
              <div className="d-flex justify-content-end align-items-center h-75">
                <img
                  src={illustration}
                  alt="illustration"
                  className="img-fluid mt-5 ml-5"
                  width="550"
                />
              </div>
            </Col>
          </Row>
          <hr />
          <h3 className="text-center mt-4 font-weight-bolder" id="alternatives">
            Masukkan Alternatif
          </h3>
          {this.state.alternatives.map((alternative, index) => {
            return (
              <InputAlternative
                key={index}
                alternative={alternative}
                index={index}
                handleInputChange={this.handleInputChange}
                handleRemoveFields={this.handleRemoveFields}
              />
            );
          })}
          <div className="d-flex justify-content-between align-items-center">
            <Button color="info" outline onClick={() => this.handleAddFields()}>
              {" "}
              + Tambah Alternatif
            </Button>
            <Button
              className="bg-purple text-white"
              size="lg"
              outline
              onClick={() => this.handleRanking()}
            >
              {" "}
              Mulai Ranking
            </Button>
          </div>
        </Container>
      </Fragment>
    );
  }
}

export default App;
