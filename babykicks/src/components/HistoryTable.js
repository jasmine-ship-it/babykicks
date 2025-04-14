import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { ProfileContext } from "../contexts/profile.context";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { TextField } from "@mui/material";

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

  const rows = currentProfile.history.map((item) =>
    createData(formatDate(item.startTime), item.strength)
  );
  const [isEditing, setIsEditing] = useState(false);
  const [strengthValue, setStrengthValue] = useState(rows.strength);
  const [startTimeValue, setStartTimeValue] = useState(rows.startTime);
  const { updateProfileHistory } = useGoogleAuth();

  const handleDelete = async (index) => {
    const updatedHistory = currentProfile.history.filter((_, i) => i !== index);
    await updateProfileHistory(currentProfile, updatedHistory);
    setCurrentProfile({ ...currentProfile, history: updatedHistory });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    console.log("handle edit function running");
  };

  const handleStrengthChange = (event) => {
    setStrengthValue(event.target.value);
    // console.log("the strength value is:", strengthValue);
  };

  const handleStartTimeChange = (event) => {
    setStartTimeValue(event.target.value);
    // console.log("the start time is:", startTimeValue);
  };

  const handleSaveClick = () => {
    setIsEditing(!isEditing);
    console.log("handle edit function running");
  };

  return (
    <TableContainer>
      <Table sx={{ maxWidth: 650, minWidth: 300 }} aria-label="history table">
        <TableHead>
          <TableRow>
            <TableCell>Entry</TableCell>
            <TableCell align="center">Start Time</TableCell>
            <TableCell align="center">Strength</TableCell>
            <TableCell align="center">Actions</TableCell>
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
              {isEditing ? (
                <TableCell align="center">
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    defaultValue={row.startTime}
                    variant="filled"
                    size="small"
                    align="center"
                    value={startTimeValue}
                    onChange={handleStartTimeChange}
                  />
                </TableCell>
              ) : (
                <TableCell align="center">{row.startTime}</TableCell>
              )}
              {isEditing ? (
                <TableCell align="center">
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    defaultValue={row.strength}
                    variant="filled"
                    size="small"
                    align="center"
                    value={strengthValue}
                    onChange={handleStrengthChange}
                  />
                </TableCell>
              ) : (
                <TableCell align="center">{row.strength}</TableCell>
              )}
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
                {!isEditing ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleSaveClick(index)}
                  >
                    Edit
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleEdit(index)}
                  >
                    Save
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
