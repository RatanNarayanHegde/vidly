import React, { Component } from "react";

//column onSort sortColumn

class TableHeader extends Component {
  state = {};
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    // console.log(path1);
    // console.log(sortColumn);
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.path || column.key}
              style={{ cursor: "pointer" }}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
