import {
  AnchorIcon,
  PlaneUpIcon,
  RailIcon,
  TruckIcon,
} from "../../components/Icons/Icons";
import styles from "./DrawRoute.module.scss";

const colors = ["#6DA544", "#005CCC", "#667085"];

const getPreviousSpecCount = (items, currentIndex) => {
  let specCount = 0;
  for (let i = 0; i < currentIndex; i++) {
    if (items[i].delivery_categories === "spec") {
      specCount++;
    }
  }
  return specCount;
};

const DrawRoute = ({ items, setCurrentItem }) => {
  return (
    <div className={styles.root}>
      {items?.delivery_list?.map((item, idx) => {
        const previousSpecCount = getPreviousSpecCount(
          items.delivery_list,
          idx
        );

        const delta =
          item?.matched_points?.point_two?.delivery_index -
          item?.matched_points?.point_one?.delivery_index;

        return (
          <div
            style={{
              marginRight:
                item?.delivery_categories !== "spec" ? "30px" : "0px",
            }}
            className={styles.points}
            key={item.id}
          >
            {item?.delivery_categories === "local" ||
            item?.delivery_categories === "main" ||
            idx === 0 ? (
              <>
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "100%",
                    marginRight: "210px",
                    zIndex: 10,
                    backgroundColor: "white",
                    border: `3px solid ${colors[2]}`,
                    backgroundImage: `url(/images/flags/${item?.point_list?.[0]?.country?.code}.svg)`,
                    backgroundSize: "26px 26px",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />

                <svg
                  style={{
                    position: "absolute",
                    top: idx + 1 === 1 ? "53px" : "53px",
                    left: `${(idx - previousSpecCount) * 300 + 69}px`,
                    zIndex: 1,
                  }}
                >
                  <path
                    d="M1 1L216 1"
                    stroke="#667085"
                    fill="transparent"
                    strokeWidth="5"
                  />
                </svg>

                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "100%",
                    zIndex: 10,
                    backgroundColor: "white",
                    border: `3px solid ${colors[2]}`,
                    backgroundImage: `url(/images/flags/${item?.point_list?.[1]?.country?.code}.svg)`,
                    backgroundSize: "26px 26px",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />

                {idx > 0 && (
                  <svg
                    style={{
                      position: "absolute",
                      top: idx + 1 === 1 ? "53px" : "53px",
                      left: `${(idx - previousSpecCount) * 300 + 69 - 60}px`,
                      zIndex: 1,
                    }}
                  >
                    <path
                      d="M1 1L31 1"
                      stroke="#667085"
                      fill="transparent"
                      strokeWidth="5"
                    />
                  </svg>
                )}

                <div
                  onClick={() => setCurrentItem(item)}
                  style={{
                    width: "100px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: "0",
                    left: `${(idx - previousSpecCount) * 300 + 69 + 55}px`,
                    backgroundColor: "white",
                    padding: "5px 8px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  {item?.mode === "sea" ? (
                    <AnchorIcon style={{ width: "16px", height: "16px" }} />
                  ) : item?.mode === "air" ? (
                    <PlaneUpIcon style={{ width: "16px", height: "16px" }} />
                  ) : item?.mode === "rail" ? (
                    <RailIcon style={{ width: "16px", height: "16px" }} />
                  ) : (
                    <TruckIcon style={{ width: "16px", height: "16px" }} />
                  )}
                  <span>{item.carrier}</span>
                </div>
              </>
            ) : (
              <>
                <svg
                  width={`${
                    216 *
                      (item?.matched_points?.point_two?.delivery_index + 1) +
                    item?.matched_points?.point_two?.delivery_index * 30 +
                    item?.matched_points?.point_two?.delivery_index * 2 * 30 +
                    69
                  }`}
                  height="91"
                  viewBox={`0 0 ${
                    216 *
                      (item?.matched_points?.point_two?.delivery_index + 1) +
                    item?.matched_points?.point_two?.delivery_index * 30 +
                    item?.matched_points?.point_two?.delivery_index * 2 * 30
                  } 91`}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    position: "absolute",
                    top: idx + 1 === 1 ? "53px" : "53px",
                    left: `${
                      (item?.matched_points?.point_one?.delivery_index -
                        (previousSpecCount === 0 ? 0 : 1)) *
                        300 +
                      30
                    }px`,
                    zIndex: 1,
                  }}
                >
                  <path
                    d={`M1 1L95 72C108 83 125 89 143 89L${
                      0.5 * 216 * (delta + 1) +
                      delta * 30 +
                      delta * (delta + 2) * 30 +
                      10
                    } 89C${
                      0.5 * 216 * (delta + 1) +
                      delta * 30 +
                      delta * (delta + 2) * 30 +
                      50
                    } 89 ${
                      0.5 * 216 * (delta + 1) +
                      delta * 30 +
                      delta * (delta + 2) * 30 +
                      60
                    } 89 ${
                      0.5 * 216 * (delta + 1) +
                      delta * 30 +
                      delta * (delta + 2) * 30 +
                      80
                    } 79L${
                      216 * (delta + 1) + delta * 30 + delta * 2 * 30 - 5
                    } 1`}
                    stroke="#6DA544"
                    strokeWidth="3"
                  />
                </svg>

                <div
                  onClick={() => setCurrentItem(item)}
                  style={{
                    width: "100px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: "90px",
                    // left: `${
                    //   0.5 *
                    //     216 *
                    //     (item?.matched_points?.point_two?.delivery_index + 1) +
                    //   item?.matched_points?.point_two?.delivery_index * 2 * 30 -
                    //   20
                    // }px`,

                    left: `${0.5 * 216 * (delta + 1) + (delta + 1) * 30}px`,
                    backgroundColor: "white",
                    padding: "5px 8px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    cursor: "pointer",
                    zIndex: 10,
                  }}
                >
                  {item?.mode === "sea" ? (
                    <AnchorIcon style={{ width: "16px", height: "16px" }} />
                  ) : item?.mode === "air" ? (
                    <PlaneUpIcon style={{ width: "16px", height: "16px" }} />
                  ) : item?.mode === "rail" ? (
                    <RailIcon style={{ width: "16px", height: "16px" }} />
                  ) : (
                    <TruckIcon style={{ width: "16px", height: "16px" }} />
                  )}
                  <span>{item.carrier}</span>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DrawRoute;
