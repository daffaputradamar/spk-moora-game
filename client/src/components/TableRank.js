import React, { Fragment } from "react";
import { Table } from "reactstrap";

function TableRank({ title, alternatives, ranked }) {
  return (
    <Fragment>
      <h3 className="text-center my-4 font-weight-bolder">{title}</h3>
      <Table bordered striped hover responsive>
        <thead>
          <tr>
            <th>Alternatif</th>
            <th>Ranking</th>
          </tr>
        </thead>
        <tbody>
          {ranked.map((alt, index) => {
            return (
              <tr>
                <th>{alternatives[index]}</th>
                <td>{alt.rank}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Fragment>
  );
}

export default TableRank;
