import React, { useEffect, useState }  from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
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
}));

export default function WatchProviders({ movie }) {
  const classes = useStyles();
  const [providers, setProviders] = useState({});
  const [region, setRegion] = useState("");
  const [option, setOption] = useState("");
  
  var regions = []; 
  var options = []; 
  useEffect(() => {
    console.log(movie.id); 
    getWatchProviders(movie.id)?.then((res) => {
        setProviders(res);
        console.log("Providers" + JSON.stringify(res)); 
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  Object.keys(providers).forEach((country) => (regions.push(country)))
  if (region){
      Object.keys(providers[region]).filter(word => word != "link").forEach((option) => (options.push(option)));
      console.log(options); 
    }
  

  const handleRegionChange = (e, value) => {
    e.preventDefault();
    setOption(""); 
    setRegion(value.props.value); 
    console.log(value.props.value); 
    console.log(JSON.stringify(providers[region])); 
  };

  const handleOptionChange = (e, value) => {
    e.preventDefault();
    setOption(value.props.value); 
    console.log(value.props.value); 
    console.log(JSON.stringify(providers[region]).option); 
  };

  return (
      <>
    <Typography variant="h5" component="p">
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
            <TableCell >Name </TableCell>
            <TableCell >Logo </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>        
          
            
            {region && option ? providers[region][option].map((p) => (
                <TableRow key={p.provider_name}>
                <TableCell>{p.provider_name}</TableCell>              
                <TableCell><img src={`https://image.tmdb.org/t/p/original/${p.logo_path}`}alt={"provider logo"}/>
                </TableCell>
                </TableRow>))
            
            
            : <></>}
            
          
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}