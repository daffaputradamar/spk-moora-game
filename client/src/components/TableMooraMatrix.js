import React, { Fragment } from "react";
import { Table } from "reactstrap";

function TableMooraMatrix({ title, alternatives, data }) {
  function roundNumber(num, scale) {
    if (!("" + num).includes("e")) {
      return +(Math.round(num + "e+" + scale) + "e-" + scale);
    } else {
      var arr = ("" + num).split("e");
      var sig = "";
      if (+arr[1] + scale > 0) {
        sig = "+";
      }
      return +(
        Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) +
        "e-" +
        scale
      );
    }
  }
  return (
    <Fragment>
      <h4 className="my-4 pt-3">{title}</h4>
      <Table bordered striped hover responsive>
        <thead>
          <tr>
            <th>Alternatif</th>
            <th>Harga</th>
            <th>RAM</th>
            <th>Ukuran Game</th>
            <th>Frekuensi Processor</th>
            <th>VRAM Grpahic Card</th>
            <th>Sistem Operasi</th>
            <th>Genre</th>
            <th>Jumlah Player</th>
            <th>Support VR</th>
            <th>Lainnya</th>
          </tr>
        </thead>
        <tbody>
          {data.map((alt, index) => {
            return (
              <tr>
                <th>{alternatives[index]}</th>
                {alt.map((cri) => {
                  return <td>{roundNumber(cri, 4)}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Fragment>
  );
}

export default TableMooraMatrix;
