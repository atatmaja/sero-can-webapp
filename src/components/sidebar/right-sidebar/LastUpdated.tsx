import React, { useContext } from "react";
import { AppContext } from "../../../context";
import InformationIcon from "../../shared/InformationIcon";
import './RightSidebar.css';

export default function LastUpdated() {
  const [state] = useContext(AppContext);

  return (
    <div className="col-12 pb-4">
      <div className='col-12 p-0 center-item flex'>
        <div className="section-title">
          LAST UPDATED
        </div>
        <div className="tooltip-vert-adj">
          <InformationIcon
              offset={10}
              position="top right"
              color="#455a64"
              tooltipHeader={"Last Updated"}
              popupSize="small"
              size="sm"
              tooltip={'SeroTracker is continuously updated with findings from newly-released serological studies. We include new studies from our search within 48 hours of publication.'}/>
        </div>
      </div>
      <div className="py-2 center">
        {state.updated_at}
      </div>
    </div>
  )
}