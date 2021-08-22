import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getWatchProviders } from "../../api/tmdb-api";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 550,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
  title: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
}));

const WatchProviders = ({ movie }) => {
  const classes = useStyles();
  //the provider data for the movie 
  const [providers, setProviders] = useState({});
  //the selected region 
  const [region, setRegion] = useState("");
  //the selected option 
  const [option, setOption] = useState("");

  //array of available regions from provider data
  var regions = [];
  //array of available options for the selected region
  var options = [];
  // get the provider data for the movie and set it
  useEffect(() => {
    getWatchProviders(movie.id).then((res) => {
      setProviders(res);
    });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fill the regions array with available regions from the provider data
  Object.keys(providers).forEach((country) => regions.push(country));

  //if a region is selected, fill the options array with available options from the provider data for selected region
  if (region) {
    Object.keys(providers[region])
      .filter((word) => word !== "link")
      .forEach((option) => options.push(option));
    console.log(options);
  }

  //set the region after form select  
  const handleRegionChange = (e, value) => {
    e.preventDefault();
    setOption("");
    setRegion(value.props.value);
    console.log(value.props.value);
  };
  //set the option after form select  
  const handleOptionChange = (e, value) => {
    e.preventDefault();
    setOption(value.props.value);
    console.log(value.props.value);
    console.log(JSON.stringify(providers[region]).option);
  };

  return (
    <>
      <Typography variant="h5"  className={classes.title}>
        Watch Providers for {movie.title} - provided by JustWatch
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel id="region-label">Choose Region</InputLabel>
        <Select
          labelId="region-label"
          id="region-select"
          value={region}
          onChange={handleRegionChange}
        >
          {regions.map((r) => {
            return (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="option-label">Choose Option</InputLabel>
        <Select
          labelId="option-label"
          id="option-select"
          value={option}
          onChange={handleOptionChange}
        >
          {options.map((o) => {
            return (
              <MenuItem key={o} value={o}>
                {o}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="providers table">
          <TableHead>
            <TableRow>
              <TableCell>Provider Name </TableCell>
              <TableCell>Provider Logo </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {region && option ? (
              providers[region][option].map((p) => (
                <TableRow key={p.provider_name}>
                  <TableCell>{p.provider_name}</TableCell>
                  <TableCell>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${p.logo_path}`}
                      alt={"provider logo"}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default WatchProviders
