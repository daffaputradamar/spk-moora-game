import React, { Fragment, Component } from "react";
import "./App.css";
import {
  Row,
  Col,
  Container,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import illustration from "./assets/undraw_selected_options_42hx.svg";
import InputAlternative from "./components/InputAlternative";
import axios from "axios";
import TableRank from "./components/TableRank";

const HOST_NAME = "http://localhost:8000";

class App extends Component {
  state = {
    // alternatives: [
    //   {
    //     name: "",
    //     price: 0,
    //     ram: 0,
    //     size: 0,
    //     processor: 0,
    //     vga: 0,
    //     selectedOS: [],
    //     selectedGenres: [],
    //     selectedPlayers: [],
    //     isVRSupported: false,
    //     selectedOthers: [],
    //   },
    // ],
    alternatives: [],
    isAutomaticallyFilled: true,
    alternativesTitle: [],
    mooraResult: {},
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
    console.log(alternativesCriteria);
    this.setState({ alternativesTitle });
    axios
      .post(`${HOST_NAME}/moora`, alternativesCriteria)
      .then((res) => this.setState({ mooraResult: res.data }));
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
    if (!this.state.isAutomaticallyFilled) {
      values.push({
        name: "",
        price: null,
        ram: null,
        size: null,
        processor: null,
        vga: null,
        selectedOS: [],
        selectedGenres: [],
        selectedPlayers: [],
        isVRSupported: false,
        selectedOthers: [],
      });
    } else {
      switch (this.state.alternatives.length) {
        case 0:
          values.push({
            name: "DOOM ETERNAL",
            price: 799000,
            ram: 8000,
            size: 50000,
            processor: 3.3,
            vga: 4000,
            selectedOS: [{ label: "Windows", value: "Windows" }],
            selectedGenres: [{ label: "Action", value: "Action" }],
            selectedPlayers: [
              { label: "Singleplayer", value: "Singleplayer" },
              { label: "Multiplayer", value: "Multiplayer" },
            ],
            isVRSupported: false,
            selectedOthers: [
              { label: "First Person Shooter (FPS)", value: "FPS" },
            ],
          });
          break;
        case 1:
          values.push({
            name: "HALF LIFE: ALYX",
            price: 249999,
            ram: 12000,
            size: 67000,
            processor: 3.2,
            vga: 6000,
            selectedOS: [{ label: "Windows", value: "Windows" }],
            selectedGenres: [
              { label: "Action", value: "Action" },
              { label: "Adventure", value: "Adventure" },
            ],
            selectedPlayers: [{ label: "Singleplayer", value: "Singleplayer" }],
            isVRSupported: true,
            selectedOthers: [
              { label: "First Person Shooter (FPS)", value: "FPS" },
            ],
          });
          break;
        case 2:
          values.push({
            name: "RESIDENT EVIL 3 REMAKE",
            price: 824999,
            ram: 8000,
            size: 45000,
            processor: 3.2,
            vga: 2000,
            selectedOS: [{ label: "Windows", value: "Windows" }],
            selectedGenres: [
              { label: "Action", value: "Action" },
              { label: "Horror", value: "Horror" },
            ],
            selectedPlayers: [
              { label: "Singleplayer", value: "Singleplayer" },
              { label: "Multiplayer", value: "Multiplayer" },
              { label: "Co-op", value: "Coop" },
            ],
            isVRSupported: false,
            selectedOthers: [
              { label: "Third Person Shooter (TPS)", value: "TPS" },
              { label: "Gore", value: "Gore" },
            ],
          });
          break;
        case 3:
          values.push({
            name: "ORI AND THE WILL OF THE WISPS",
            price: 139999,
            ram: 8000,
            size: 20000,
            processor: 3.2,
            vga: 2000,
            selectedOS: [{ label: "Windows", value: "Windows" }],
            selectedGenres: [
              { label: "Action", value: "Action" },
              { label: "Adventure", value: "Adventure" },
            ],
            selectedPlayers: [{ label: "Singleplayer", value: "Singleplayer" }],
            isVRSupported: false,
            selectedOthers: [
              { label: "2D Side Scroller", value: "2D Side Scroller" },
            ],
          });
          break;
        case 4:
          values.push({
            name: "BLEEDING EDGE",
            price: 139999,
            ram: 8000,
            size: 15000,
            processor: 3.2,
            vga: 2000,
            selectedOS: [{ label: "Windows", value: "Windows" }],
            selectedGenres: [{ label: "Action", value: "Action" }],
            selectedPlayers: [{ label: "Multiplayer", value: "Multiplayer" }],
            isVRSupported: false,
            selectedOthers: [
              { label: "Third Person Shooter (TPS)", value: "TPS" },
            ],
          });
          break;
        default:
          values.push({
            name: "",
            price: null,
            ram: null,
            size: null,
            processor: null,
            vga: null,
            selectedOS: [],
            selectedGenres: [],
            selectedPlayers: [],
            isVRSupported: false,
            selectedOthers: [],
          });
          break;
      }
    }
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
          <h3
            className="text-center mt-4 mb-3 font-weight-bolder"
            id="alternatives"
          >
            Masukkan Alternatif
          </h3>
          <FormGroup check className="mb-4 text-center">
            <Label check>
              <Input
                type="checkbox"
                name="isAutomaticallyFilled"
                checked={this.state.isAutomaticallyFilled}
                onChange={(e) =>
                  this.setState({
                    isAutomaticallyFilled: !this.state.isAutomaticallyFilled,
                  })
                }
              />{" "}
              Terisi Otomatis?
            </Label>
          </FormGroup>
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
            <Button
              className="invisible"
              color="info"
              outline
              onClick={() => this.handleAddFields()}
            >
              {" "}
              + Tambah Alternatif
            </Button>
            <Button color="info" outline onClick={() => this.handleAddFields()}>
              {" "}
              + Tambah Alternatif
            </Button>
            <Button
              className="bg-purple text-white"
              size="lg"
              outline
              onClick={() => this.handleRanking()}
              disabled={this.state.alternatives.length < 2}
            >
              {" "}
              Mulai Ranking
            </Button>
          </div>
          <hr />
          {Object.keys(this.state.mooraResult).length !== 0 &&
            this.state.mooraResult.constructor === Object && (
              <Fragment>
                <h3
                  className="text-center my-4 font-weight-bolder"
                  id="alternatives"
                >
                  Ranking Alternatif
                </h3>
                <TableRank
                  alternatives={this.state.alternativesTitle}
                  ranked={this.state.mooraResult.ranked}
                />
              </Fragment>
            )}

          <pre>{JSON.stringify(this.state.mooraResult, null, 2)}</pre>
        </Container>
        <div className="mt-5 pt-5"></div>
        <hr />
        <h6 className="text-center text-muted my-4">&copy; Daffa Akbar 2020</h6>
      </Fragment>
    );
  }
}

export default App;
