import React from "react";
import { Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import MultiSelect from "react-multi-select-component";

function InputAlternative({
  alternative,
  index,
  handleInputChange,
  handleRemoveFields,
}) {
  const optionsOS = [
    { label: "Windows", value: "Windows" },
    { label: "Steam OS", value: "SteamOS" },
    { label: "Mac OS", value: "MacOS" },
    { label: "Linux", value: "Linux" },
  ];
  const optionsGenres = [
    { label: "Action", value: "Action" },
    { label: "Adventure", value: "Adventure" },
    { label: "Horror", value: "Horror" },
  ];
  const optionsPlayers = [
    { label: "Singleplayer", value: "Singleplayer" },
    { label: "Multiplayer", value: "Multiplayer" },
    { label: "Co-op", value: "Coop" },
  ];
  const optionsOthers = [
    { label: "First Person Shooter (FPS)", value: "FPS" },
    { label: "Third Person Shooter (TPS)", value: "TPS" },
    { label: "Gore", value: "Gore" },
    { label: "2D Side Scroller", value: "2D Side Scroller" },
  ];

  return (
    <div className="mb-5">
      <div className="d-flex align-items-center mb-3">
        <h5 className="mr-5 mb-0">Alternatif Ke {index + 1} </h5>
        {index !== 0 && (
          <Button
            color="danger"
            outline
            size="sm"
            onClick={() => handleRemoveFields(index)}
          >
            Hapus Alternatif
          </Button>
        )}
      </div>
      <Row>
        <Col md="4">
          <FormGroup>
            <Label for="name">Nama Game</Label>
            <Input
              type="text"
              name="name"
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
              value={alternative.name}
              placeholder="Ex: Doom New Horizon"
            />
          </FormGroup>
          <FormGroup>
            <Label for="price">Harga</Label>
            <Input
              type="number"
              name="price"
              placeholder="Ex: 599999"
              onChange={(e) =>
                handleInputChange(index, "price", e.target.value)
              }
              value={alternative.price}
            />
          </FormGroup>
          <FormGroup>
            <Label for="ram">Random Access Memory (RAM) dalam MB</Label>
            <Input
              type="number"
              name="ram"
              placeholder="Ex: 8000"
              onChange={(e) => handleInputChange(index, "ram", e.target.value)}
              value={alternative.ram}
            />
          </FormGroup>
          <FormGroup>
            <Label for="size">Size Game dalam MB</Label>
            <Input
              type="number"
              name="size"
              placeholder="Ex: 50000"
              onChange={(e) => handleInputChange(index, "size", e.target.value)}
              value={alternative.size}
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <Label for="processor">Frekuensi Processor dalam GHz</Label>
            <Input
              type="number"
              name="processor"
              placeholder="Ex: 3.20"
              onChange={(e) =>
                handleInputChange(index, "processor", e.target.value)
              }
              value={alternative.processor}
            />
          </FormGroup>
          <FormGroup>
            <Label for="processor">VRAM pada Graphic Card dalam MB</Label>
            <Input
              type="number"
              name="vga"
              placeholder="Ex: 4000"
              onChange={(e) => handleInputChange(index, "vga", e.target.value)}
              value={alternative.vga}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Sistem Operasi">
              Sistem Operasi yang tersedia pada Game
            </Label>
            <MultiSelect
              options={optionsOS}
              value={alternative.selectedOS}
              onChange={(val) => handleInputChange(index, "selectedOS", val)}
              labelledBy={"Sistem Operasi"}
            />
          </FormGroup>
          <FormGroup>
            <Label for="genre">Genre Game</Label>
            <MultiSelect
              options={optionsGenres}
              value={alternative.selectedGenres}
              onChange={(val) =>
                handleInputChange(index, "selectedGenres", val)
              }
              labelledBy={"Genre"}
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <Label for="Sistem Operasi">Jumlah Pemain</Label>
            <MultiSelect
              options={optionsPlayers}
              value={alternative.selectedPlayers}
              onChange={(val) =>
                handleInputChange(index, "selectedPlayers", val)
              }
              labelledBy={"Jumlah Pemain"}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Others Tags">Tags Lainnya</Label>
            <MultiSelect
              options={optionsOthers}
              value={alternative.selectedOthers}
              onChange={(val) =>
                handleInputChange(index, "selectedOthers", val)
              }
              labelledBy={"Tags Lainnya"}
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="isVRSupported"
                checked={alternative.isVRSupported}
                onChange={(e) =>
                  handleInputChange(index, "isVRSupported", e.target.value)
                }
              />{" "}
              Support VR?
            </Label>
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
}
export default InputAlternative;
