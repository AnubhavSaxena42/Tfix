import React from "react";
import { ImCross } from "react-icons/im";

function AppliedFiltersList({ data, onClick, type }) {
  return (
    <>
      {data.map((dataItem) => (
        <div key={dataItem} className="appliedFilterItem">
          {`${type}-${dataItem}`}
          <div className="filterItemRemoveButton">
            <ImCross
              onClick={() => {
                onClick(dataItem);
              }}
              size={"5px"}
              color="#0f0f0f"
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default AppliedFiltersList;
