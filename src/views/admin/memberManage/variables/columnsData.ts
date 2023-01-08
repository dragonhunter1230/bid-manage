interface IColumnHeader {
  Header: string;
  accessor: string;
}

type Columns = IColumnHeader[];

export const columnsDataColumns: Columns = [
  {
    Header: "SUBTEAM",
    accessor: "subTeam",
  },
  {
    Header: "USERNAME",
    accessor: "username",
  },
  {
    Header: "BIRTHDAY",
    accessor: "birthday",
  },
  {
    Header: "WORK",
    accessor: "work",
  },
  {
    Header: "ACTION",
    accessor: "action",
  }
];
