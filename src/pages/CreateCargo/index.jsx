import {
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddShipmentForm from "../../components/AddShipmentForm";
import SecondaryButton from "../../components/Button/SecondaryButton";
import DrawRoute from "../../components/DrawRoute";
import styles from "./CreateCargo.module.scss";

const CreateCargo = () => {
  const [currentItemId, setCurrentItemId] = useState(null);
  const [items, setItems] = useState({
    route_type: "NASA",
    booking: "",
    delivery_list: [],
    container_flow_list: [],
    uom_list: [],
  });

  const handleAddRoute = () => {
    setItems((prevItems) => {
      const lastDelivery =
        prevItems.delivery_list[prevItems.delivery_list.length - 1] || null;

      const newDeliveryList = {
        _id: prevItems?.delivery_list?.length + 1,
        delivery_index_number: prevItems?.delivery_list?.length + 1,
        carrier: "MSC",
        mode: "sea",
        incoterms: "",
        delivery_terms: "",
        booking: "",
        delivery_categories: "main",
        containers_flow: [],
        vehicle_list: [
          {
            vehicle_type: "vessel",
            vehicle_number: "",
          },
        ],
        container_flow_list: [],
        point_list: [
          {
            name: lastDelivery
              ? lastDelivery.point_list[1].name
              : { name: "", code: "", country: "" },
            point_type: lastDelivery
              ? lastDelivery?.point_list?.[1]?.point_type
              : "origin_port",
            country: lastDelivery
              ? lastDelivery.point_list[1].country
              : { name: "", code: "" },
            forwarder: lastDelivery
              ? lastDelivery.point_list[1].forwarder
              : "PGL",
            point_index_number: 1,
            delivery_index_numbers: [],
          },
          {
            name: { name: "", code: "", country: "" },
            point_type: "origin_port",
            country: { name: "", code: "" },
            forwarder: "PGL",
            point_index_number: 2,
            delivery_index_numbers: [],
          },
        ],
      };

      const updatedItems = { ...prevItems };
      updatedItems.delivery_list = [
        ...prevItems.delivery_list,
        newDeliveryList,
      ];

      return updatedItems;
    });

    setItems((prevItems) => {
      const updatedItems = { ...prevItems };
      const updatedDeliveryList = checkAndUpdateCategories(
        updatedItems.delivery_list
      );
      return { ...updatedItems, delivery_list: updatedDeliveryList };
    });
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;

    setItems((prevItems) => {
      const updatedItems = { ...prevItems };
      const itemIndex = updatedItems?.delivery_list?.findIndex(
        (item) => item._id === currentItemId
      );

      if (itemIndex !== -1) {
        const path = name.split(".");
        let target = updatedItems.delivery_list[itemIndex];

        const vehicleMatch = path[0].match(/vehicle_list\[(\d+)\]/);
        if (vehicleMatch) {
          const vehicleIndex = parseInt(vehicleMatch[1], 10);

          // Ensure the target vehicle exists in vehicle_list
          if (target.vehicle_list[vehicleIndex]) {
            target.vehicle_list[vehicleIndex] = {
              ...target.vehicle_list[vehicleIndex],
              [path[1]]: value,
            };
          }
        } else if (
          name === "carrier" ||
          name === "mode" ||
          name === "booking" ||
          name === "incoterms" ||
          name === "delivery_terms" ||
          name === "delivery_categories"
        ) {
          target[name] = value;
        }

        const arrayMatch = path[0].match(/point_list\[(\d+)\]/);
        if (arrayMatch) {
          const pointIndexNumber = parseInt(arrayMatch[1], 10);
          const pointIndex = target.point_list.findIndex(
            (point) => point.point_index_number === pointIndexNumber
          );

          if (pointIndex !== -1) {
            if (path.length === 2) {
              target.point_list[pointIndex][path[1]] = value;

              if (path[1] === "country") {
                target.point_list[pointIndex].name = {
                  name: "",
                  code: "",
                  country: "",
                };
              }
            }
          }
        }
      }

      checkAndUpdateCategories(updatedItems.delivery_list);
      return updatedItems;
    });
  };

  const checkAndUpdateCategories = (draftDeliveryList) => {
    if (!draftDeliveryList || draftDeliveryList.length === 0) {
      return draftDeliveryList;
    }

    let currentStageIndex = 0;

    // Iterate through the delivery list
    draftDeliveryList.forEach((delivery, index) => {
      const currentDelivery = { ...delivery };
      let firstPointMatched = false;
      let secondPointMatched = false;

      // Initialize matched points object for the delivery
      const matchedPoints = {
        point_one: null,
        point_two: null,
      };

      const firstPoint = currentDelivery.point_list[0];
      const secondPoint = currentDelivery.point_list[1];

      // Generate comparison keys for the current delivery points
      const firstPointKey = `${firstPoint.name?.name}-${firstPoint.country?.code}`;
      const secondPointKey = `${secondPoint.name?.name}-${secondPoint.country?.code}`;

      // Iterate over all previous deliveries to check for matching points
      draftDeliveryList.forEach((prevDelivery, prevIndex) => {
        if (prevIndex !== index) {
          const prevFirstPoint = prevDelivery.point_list[0];
          const prevSecondPoint = prevDelivery.point_list[1];

          const prevFirstPointKey = `${prevFirstPoint.name?.name}-${prevFirstPoint.country?.code}`;
          const prevSecondPointKey = `${prevSecondPoint.name?.name}-${prevSecondPoint.country?.code}`;

          // Match the first point (origin) by name and country code
          if (firstPointKey === prevFirstPointKey) {
            firstPointMatched = true;
            matchedPoints.point_one = {
              delivery_index: prevIndex,
              point: prevFirstPoint,
            };
          }

          // Match the second point (destination) by name and country code
          if (secondPointKey === prevSecondPointKey) {
            secondPointMatched = true;
            matchedPoints.point_two = {
              delivery_index: prevIndex,
              point: prevSecondPoint,
            };
          }
        }
      });

      // If both points match, assign the matched points to the current delivery
      if (firstPointMatched && secondPointMatched) {
        currentStageIndex += 1;
        const delIndex = currentDelivery?.delivery_index_number;
        currentDelivery.delivery_categories = "spec";
        currentDelivery.delivery_index_number =
          delIndex < 100
            ? currentStageIndex === 0
              ? 200 + delIndex
              : (currentStageIndex + 1) * 100 + delIndex
            : delIndex;
        currentDelivery.matched_points = matchedPoints;
      } else {
        // currentDelivery.delivery_categories = "local";
        currentDelivery.matched_points = null;
      }

      draftDeliveryList[index] = currentDelivery;
    });

    return draftDeliveryList;
  };

  const handleSelectItem = (item) => {
    setCurrentItemId(item._id);
  };

  useEffect(() => {
    setItems({
      route_type: "NASA",
      booking: "",
      delivery_list: [],
      uom_list: [],
    });

    setCurrentItemId(null);
  }, []);

  return (
    <>
      <Box className={styles.root}>
        <Card className={styles.card}>
          <Box className={styles.createRouteButtonsBox}>
            <FormControl sx={{ width: "18rem" }} size="small">
              <InputLabel id="route">Route</InputLabel>
              <Select
                label="Route"
                labelId="route"
                id="route-select"
                name="route_type"
                value={items.route_type || ""}
                onChange={handleItemChange}
              >
                <MenuItem value={"NASA"}>NASA</MenuItem>
                <MenuItem value={"TSR"}>TSR</MenuItem>
                <MenuItem value={"TCR"}>TCR</MenuItem>
              </Select>
            </FormControl>

            <SecondaryButton label="Add shipment" onClick={handleAddRoute} />
          </Box>

          <Box className={styles.body}>
            <Box
              sx={{
                width: "100%",
                minHeight: "300px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f2f4f7",
                borderRadius: "8px",
                overflow: "auto",
              }}
            >
              <DrawRoute items={items} setCurrentItem={handleSelectItem} />
            </Box>

            {currentItemId && items.delivery_list.length ? (
              <AddShipmentForm
                route={items}
                item={
                  items?.delivery_list?.find(
                    (item) => item._id === currentItemId
                  ) || {}
                }
                handleChange={handleItemChange}
              />
            ) : null}
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default CreateCargo;
