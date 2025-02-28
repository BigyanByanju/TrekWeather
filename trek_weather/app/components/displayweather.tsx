import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Define the WeatherData type
interface WeatherData {
  Date: string;
  Checkpoint: string;
  Latitude: number;
  Longitude: number;
  "Max Temp (°C)": number;
  "Min Temp (°C)": number;
  "Rain (mm)": number;
  "Will It Rain?": string;
  "Weather Condition": string;
}

// Define the props type that includes the typed data array
interface WeatherProps {
  data: WeatherData[];
}

// Function to remove duplicates based on Date and Checkpoint
const removeDuplicates = (data: WeatherData[]): WeatherData[] => {
  const uniqueData = new Map<string, WeatherData>();

  data.forEach((item) => {
    const key = `${item.Checkpoint}-${item.Date}`; // Combining Checkpoint and Date as key
    if (!uniqueData.has(key)) {
      uniqueData.set(key, item); // Only add if key doesn't exist
    }
  });

  return Array.from(uniqueData.values());
};

const DisplayWeather: React.FC<WeatherProps> = ({ data }) => {
  // Remove duplicates before grouping data
  const uniqueData = removeDuplicates(data);

  // Group data by Checkpoint
  const groupedByCheckpoint = uniqueData.reduce((acc, row) => {
    if (!acc[row.Checkpoint]) {
      acc[row.Checkpoint] = [];
    }
    acc[row.Checkpoint].push(row);
    return acc;
  }, {} as Record<string, WeatherData[]>);

  return (
    <>
      {Object.keys(groupedByCheckpoint).map((checkpoint) => {
        const checkpointData = groupedByCheckpoint[checkpoint];
        return (
          <TableContainer
            component={Paper}
            key={checkpoint}
            sx={{ marginBottom: 4 }}
          >
            <h3>{checkpoint}</h3>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell align="right">Max Temp (°C)</StyledTableCell>
                  <StyledTableCell align="right">Min Temp (°C)</StyledTableCell>
                  <StyledTableCell align="right">Rain (mm)</StyledTableCell>
                  <StyledTableCell align="right">Will It Rain?</StyledTableCell>
                  <StyledTableCell align="right">
                    Weather Condition
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {checkpointData.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {row.Date}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row["Max Temp (°C)"]}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row["Min Temp (°C)"]}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row["Rain (mm)"]}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row["Will It Rain?"]}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row["Weather Condition"]}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      })}
    </>
  );
};

export default DisplayWeather;
