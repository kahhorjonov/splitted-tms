import {
  Autocomplete,
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import styles from "./AddShipmentForm.module.scss";

const countries = [
  {
    name: "JAPAN",
    code: "JP",
  },
];

const cities = [
  {
    name: "TOKYO",
    code: "JP",
    country: "JAPAN",
  },
  {
    name: "OSAKA",
    code: "JP",
    country: "JAPAN",
  },
  {
    name: "NAGOYA",
    code: "JP",
    country: "JAPAN",
  },
  {
    name: "YOKOHAMA",
    code: "JP",
    country: "JAPAN",
  },
  {
    name: "FUKUOKA",
    code: "JP",
    country: "JAPAN",
  },
  {
    name: "SAPPORO",
    code: "JP",
    country: "JAPAN",
  },
];

const AddShipmentForm = ({ route, item, handleChange }) => {
  const [inputValueCountryPoint1, setInputValueCountryPoint1] = useState("");
  const [inputValueCountryPoint2, setInputValueCountryPoint2] = useState("");

  const [inputValueCityPoint1, setInputValueCityPoint1] = useState("");
  const [inputValueCityPoint2, setInputValueCityPoint2] = useState("");

  const [countryErrorPoint1, setCountryErrorPoint1] = useState(false);
  const [countryErrorPoint2, setCountryErrorPoint2] = useState(false);

  // Refs to control focus
  const countryRefPoint1 = useRef(null);
  const countryRefPoint2 = useRef(null);

  const handleCountryInputChangePoint1 = (event, newInputValue) => {
    setInputValueCountryPoint1(newInputValue);
    if (!newInputValue) {
      // If input is empty, reset the selected value
      handleChange({
        target: {
          name: `point_list[${item.point_list[0].point_index_number}].country`,
          value: null,
        },
      });
    }
  };

  const handleCountryInputChangePoint2 = (event, newInputValue) => {
    setInputValueCountryPoint2(newInputValue);
    if (!newInputValue) {
      handleChange({
        target: {
          name: `point_list[${item.point_list[1].point_index_number}].country`,
          value: null,
        },
      });
    }
  };

  const handleCityInputChangePoint1 = (event, newInputValue) => {
    const countryCode = item?.point_list?.[0]?.country?.code;
    setInputValueCityPoint1(newInputValue);

    if (!countryCode) {
      setCountryErrorPoint1(true);
      countryRefPoint1.current?.focus();
      return;
    }

    if (!newInputValue) {
      handleChange({
        target: {
          name: `point_list[${item.point_list[0].point_index_number}].city`,
          value: null,
        },
      });
    }

    setCountryErrorPoint1(false);
  };

  const handleCityInputChangePoint2 = (event, newInputValue) => {
    const countryCode = item?.point_list?.[1]?.country?.code;
    setInputValueCityPoint2(newInputValue);

    if (!countryCode) {
      setCountryErrorPoint2(true);
      countryRefPoint2.current?.focus();
      return;
    }

    if (!newInputValue) {
      handleChange({
        target: {
          name: `point_list[${item.point_list[1].point_index_number}].city`,
          value: null,
        },
      });
    }

    setCountryErrorPoint2(false);
  };

  return (
    <Box className={styles.inputFieldsBox}>
      {/* Points section */}
      <Box className={styles.pointsBox}>
        <Box className={styles.containerBg}>
          <h3>Point 1</h3>
          <Grid container spacing={3}>
            {/* Point 1 Type */}
            <Grid item sm={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="point-type-1">Point Type *</InputLabel>
                <Select
                  required
                  name={`point_list[${item.point_list[0].point_index_number}].point_type`}
                  label="Point Type"
                  labelId="point-type-1"
                  id="point-type-select-1"
                  onChange={handleChange}
                  value={item?.point_list?.[0]?.point_type || ""}
                >
                  <MenuItem value={"origin_port"}>Origin</MenuItem>
                  <MenuItem value={"final_port"}>Final Port</MenuItem>
                  <MenuItem value={"transshipment_port"}>
                    Transship. Port
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Point 1 Country */}
            <Grid item sm={12} md={6}>
              <FormControl fullWidth size="small" error={countryErrorPoint1}>
                <Autocomplete
                  size="small"
                  freeSolo={true}
                  options={countries}
                  inputValue={inputValueCountryPoint1}
                  onInputChange={handleCountryInputChangePoint1}
                  filterOptions={(x) => x}
                  getOptionLabel={(option) => option?.name || ""}
                  value={item?.point_list?.[0]?.country || null}
                  disableClearable={!item?.point_list?.[0]?.country?.code}
                  inputRef={countryRefPoint1}
                  onChange={(event, newValue) => {
                    handleChange({
                      target: {
                        name: `point_list[${item.point_list[0].point_index_number}].country`,
                        value: newValue,
                      },
                    });
                    setInputValueCountryPoint1(newValue?.name || "");
                    setCountryErrorPoint1(false);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      variant="outlined"
                      required
                      error={countryErrorPoint1}
                    />
                  )}
                />
              </FormControl>
            </Grid>

            {/* Point 1 City */}
            <Grid item sm={12} md={6}>
              <FormControl size="small" fullWidth>
                <Autocomplete
                  size="small"
                  freeSolo={true}
                  options={cities}
                  inputValue={inputValueCityPoint1}
                  onInputChange={handleCityInputChangePoint1}
                  filterOptions={(x) => x}
                  getOptionLabel={(option) => `${option?.name}` || ""}
                  disableClearable={!item?.point_list?.[0]?.city?.code}
                  value={
                    item?.point_list?.[0]?.city || item?.point_list?.[0]?.name
                  }
                  onChange={(event, newValue) => {
                    handleChange({
                      target: {
                        name: `point_list[${item.point_list[0].point_index_number}].name`,
                        value: newValue,
                      },
                    });
                    setInputValueCityPoint1(newValue?.name || "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Point Name"
                      variant="outlined"
                      required
                    />
                  )}
                />
              </FormControl>
            </Grid>

            {/* Point 1 Forwarder */}
            <Grid item sm={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="forwarder-1">Forwarder *</InputLabel>
                <Select
                  label="Forwarder"
                  required
                  name={`point_list[${item.point_list[0].point_index_number}].forwarder`}
                  labelId="forwarder-1"
                  id="forwarder-select-1"
                  onChange={handleChange}
                  value={item?.point_list?.[0]?.forwarder || ""}
                >
                  <MenuItem value={"PGL"}>PGL</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Point 2 */}
        <Box className={styles.containerBg}>
          <h3>Point 2</h3>

          <Grid container spacing={3}>
            {/* Point 2 Type */}
            <Grid item sm={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="point-type-2">Point Type *</InputLabel>
                <Select
                  name={`point_list[${item.point_list[1].point_index_number}].point_type`}
                  label="Point Type"
                  required
                  labelId="point-type-2"
                  id="point-type-select-2"
                  onChange={handleChange}
                  value={item?.point_list?.[1]?.point_type || ""}
                >
                  <MenuItem value={"origin_port"}>Origin</MenuItem>
                  <MenuItem value={"final_port"}>Final Port</MenuItem>
                  <MenuItem value={"transshipment_port"}>
                    Transship. Port
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Point 2 Country */}
            <Grid item sm={12} md={6}>
              <FormControl fullWidth size="small" error={countryErrorPoint2}>
                <Autocomplete
                  size="small"
                  freeSolo={true}
                  options={countries}
                  inputValue={inputValueCountryPoint2}
                  onInputChange={handleCountryInputChangePoint2}
                  filterOptions={(x) => x}
                  getOptionLabel={(option) => option?.name || ""}
                  value={item?.point_list?.[1]?.country || null}
                  disableClearable={!item?.point_list?.[1]?.country?.code}
                  inputRef={countryRefPoint2} // Use ref to focus the country field
                  onChange={(event, newValue) => {
                    handleChange({
                      target: {
                        name: `point_list[${item.point_list[1].point_index_number}].country`,
                        value: newValue,
                      },
                    });
                    setInputValueCountryPoint2(newValue?.name || "");
                    setCountryErrorPoint2(false);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      variant="outlined"
                      required
                      error={countryErrorPoint2} // Display error styling
                    />
                  )}
                />
              </FormControl>
            </Grid>

            {/* Point 2 City */}
            <Grid item sm={12} md={6}>
              <FormControl fullWidth size="small">
                <Autocomplete
                  size="small"
                  freeSolo={true}
                  options={cities}
                  inputValue={inputValueCityPoint2}
                  onInputChange={handleCityInputChangePoint2}
                  filterOptions={(x) => x}
                  getOptionLabel={(option) => `${option?.name}` || ""}
                  disableClearable={!item?.point_list?.[1]?.city?.code}
                  value={
                    item?.point_list?.[1]?.city || item?.point_list?.[1]?.name
                  }
                  onChange={(event, newValue) => {
                    handleChange({
                      target: {
                        name: `point_list[${item.point_list[1].point_index_number}].name`,
                        value: newValue,
                      },
                    });
                    setInputValueCityPoint2(newValue?.name || "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Point Name"
                      variant="outlined"
                      required
                    />
                  )}
                />
              </FormControl>
            </Grid>

            {/* Point 2 Forwarder */}
            <Grid item sm={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="forwarder-2">Forwarder *</InputLabel>
                <Select
                  label="Forwarder"
                  name={`point_list[${item.point_list[1].point_index_number}].forwarder`}
                  required
                  labelId="forwarder-2"
                  id="forwarder-select-2"
                  onChange={handleChange}
                  value={item?.point_list?.[1]?.forwarder || ""}
                >
                  <MenuItem value={"PGL"}>PGL</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Shipment Details */}
      <Box className={styles.shipmentBox}>
        <h3>Shipment</h3>

        <Grid container spacing={3}>
          {/* Booking Number */}
          <Grid item md={12}>
            <FormControl fullWidth size="small">
              <TextField
                required
                size="small"
                name="booking"
                label="Booking Number"
                labelId="booking-number"
                onChange={handleChange}
                value={item?.booking || ""}
              />
            </FormControl>
          </Grid>

          {/* Carrier */}
          <Grid item md={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="carrier">Carrier *</InputLabel>
              <Select
                size="small"
                name="carrier"
                required
                label="Carrier"
                labelId="carrier"
                id="carrier-select"
                onChange={handleChange}
                value={item?.carrier || ""}
              >
                <MenuItem value={"MSC"}>MSC</MenuItem>
                <MenuItem value={"CMA"}>CMA</MenuItem>
                <MenuItem value={"Maersk"}>Maersk</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Transport Mode */}
          <Grid item md={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="transport-mode">Transport. Mode *</InputLabel>
              <Select
                value={item?.mode || ""}
                size="small"
                name="mode"
                required
                label="Transport. Mode"
                labelId="transport-mode"
                id="transport-mode-select"
                onChange={handleChange}
              >
                <MenuItem value={"sea"}>Sea</MenuItem>
                {/* <MenuItem value={"air"}>Air</MenuItem> */}
                <MenuItem value={"rail"}>Rail</MenuItem>
                <MenuItem value={"truck"}>Truck</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Incoterms */}
          <Grid item md={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="incoterms">Incoterms *</InputLabel>
              <Select
                size="small"
                name="incoterms"
                label="Incoterms"
                labelId="incoterms"
                id="incoterms-select"
                onChange={handleChange}
                required
                value={item?.incoterms || ""}
              >
                <MenuItem value={"FCA"}>FCA</MenuItem>
                <MenuItem value={"FCL"}>FCL</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Delivery Terms */}
          <Grid item md={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="delivery-terms">Delivery Terms *</InputLabel>
              <Select
                size="small"
                name="delivery_terms"
                label="Delivery Terms"
                labelId="delivery_terms"
                id="delivery-terms-select"
                onChange={handleChange}
                required
                value={item?.delivery_terms || ""}
              >
                <MenuItem value={"P-D"}>P-D</MenuItem>
                <MenuItem value={"D-P"}>D-P</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Delivery Type */}
          <Grid item md={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="delivery-type">Delivery Type *</InputLabel>
              <Select
                required
                size="small"
                label="Delivery Type"
                labelId="delivery-type"
                id="delivery-type-select"
                name="delivery_categories"
                onChange={handleChange}
                value={item?.delivery_categories || ""}
              >
                <MenuItem value={"main"}>Main</MenuItem>
                <MenuItem value={"local"}>Local</MenuItem>
                <MenuItem value={"spec"}>Special</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box className={styles.vehicleBox}>
        <h3>Vehicle</h3>

        {item?.vehicle_list?.map((vehicle, vehicleIndex) => (
          <Grid container spacing={3} key={vehicleIndex}>
            {/* Vehicle Type */}
            <Grid item md={12}>
              <FormControl fullWidth size="small">
                <InputLabel id={`vehicle-type-${vehicleIndex}`}>
                  Vehicle Type *
                </InputLabel>
                <Select
                  required
                  size="small"
                  label="Vehicle Type"
                  onChange={handleChange}
                  value={vehicle.vehicle_type || ""}
                  labelId={`vehicle-type-${vehicleIndex}`}
                  id={`vehicle-type-select-${vehicleIndex}`}
                  name={`vehicle_list[${vehicleIndex}].vehicle_type`}
                >
                  {item?.mode === "sea" ? (
                    <MenuItem value={"vessel"}>Vessel</MenuItem>
                  ) : item?.mode === "truck" ? (
                    <MenuItem value={"truck"}>Truck</MenuItem>
                  ) : (
                    <MenuItem value={"wagon"}>Wagon</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>

            {/* Vehicle Number */}
            <Grid item md={12}>
              <FormControl fullWidth size="small">
                <TextField
                  size="small"
                  name={`vehicle_list[${vehicleIndex}].vehicle_number`}
                  label="Vehicle Number"
                  value={vehicle.vehicle_number || ""}
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </Grid>

            {/* Vehicle Index */}
            <Grid item md={12}>
              <FormControl fullWidth size="small">
                <TextField
                  size="small"
                  name={`vehicle_list[${vehicleIndex}].vehicle_index`}
                  label="Vehicle Index"
                  value={vehicle.vehicle_index || ""}
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item md={12}>
              <Divider />
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default AddShipmentForm;
