import React from "react";
import { Table } from "reactstrap";

function TableRank({ alternatives, ranked }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Alternative</th>
          <th>Nilai Preferensi</th>
          <th>Ranking</th>
        </tr>
      </thead>
      <tbody>
        {ranked.map((alt, index) => {
          return (
            <tr>
              <th>{alternatives[index]}</th>
              <td>{alt.value}</td>
              <td>{alt.rank}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default TableRank;
