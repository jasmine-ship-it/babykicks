import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { ProfileContext } from "../contexts/profile.context";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

function createData(startTime, strength) {
  return { startTime, strength };
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export const HistoryTable = () => {
  const { currentProfile, setCurrentProfile } = useContext(ProfileContext);

  const { updateProfileHistory } = useGoogleAuth();

  const handleDelete = async (index) => {
    const updatedHistory = currentProfile.history.filter((_, i) => i !== index);
    await updateProfileHistory(currentProfile, updatedHistory);
    setCurrentProfile({ ...currentProfile, history: updatedHistory });
  };

  const rows = currentProfile.history.map((item) =>
    createData(formatDate(item.startTime), item.strength)
  );

  return (
    <TableContainer>
      <Table sx={{ maxWidth: 650, minWidth: 300 }} aria-label="history table">
        <TableHead>
          <TableRow>
            <TableCell>Entry</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">Strength</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={`${row.startTime}${index}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{row.startTime}</TableCell>
              <TableCell align="right">{row.strength}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
