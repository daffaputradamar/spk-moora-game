import React, { Fragment } from "react";
import { Table } from "reactstrap";

function TablePreferensi({ title, alternatives, yi }) {
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
      <Table className="mb-5" bordered striped hover responsive>
        <thead>
          <tr>
            <th>Alternatif</th>
            <th>Max(Benefit)</th>
            <th>Min(Cost)</th>
            <th>Yi (Nilai Preferensi)</th>
          </tr>
        </thead>
        <tbody>
          {yi.map((alt, index) => {
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

export default TablePreferensi;
