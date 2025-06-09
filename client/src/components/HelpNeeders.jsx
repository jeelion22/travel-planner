import React, { useEffect, useState } from "react";
import ReuniteSeekerResponseForm from "./ReuniteSeekerResponseForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import UpdateReuniteSeekerStatus from "./UpdateReuniteSeekerStatus";
import userServices from "../../services/userServices";

const HelpNeeders = ({ contribution, userId }) => {
  const [showResponse, setShowResponse] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);

  useEffect(() => {
    const handleStatus = async (contributionId) => {
      try {
        const response = await userServices.getStatus(contributionId);

        if (contribution.status === "rescued") {
          setBtnDisable(true);
          return;
        }

        if (
          response.data?.message?.checking &&
          response.data?.message?.status === "not-rescued"
        ) {
          if (response.data.message.visitorsId === userId) {
            setShowResponse(true);
            setBtnDisable(true);
          } else if (response.data.message.visitorsId !== userId) {
            setBtnDisable(true);
          } else {
            setShowResponse(false);
            setBtnDisable(false);
          }
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    handleStatus(contribution._id);
  }, [contribution._id]);

  return (
    <div className="col " key={contribution._id}>
      <div className="card h-100">
        <img
          src={contribution.url}
          className="card-img-top img-thumbnail img-fluid"
          type="button"
          data-bs-toggle="modal"
          data-bs-target={`#${contribution._id.toString()}`}
          alt={contribution.name}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{contribution.name}</h5>
          <p className="card-text">{contribution.description}</p>
          <p className="card-text">
            <small className="text-muted">{contribution.uploadDate}</small>
          </p>
          <p className="card-text">
            <small className="text-muted">Status: {contribution.status}</small>
          </p>
        </div>

        {showResponse && (
          <UpdateReuniteSeekerStatus contributionId={contribution._id} />
        )}

        <div
          className="modal fade"
          id={`exampleModal-${contribution._id}`}
          tabIndex="-1"
          aria-labelledby={`exampleModalLabel-${contribution._id}`}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5 "
                  id={`exampleModalLabel-${contribution._id}`}
                >
                  For Location
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <ReuniteSeekerResponseForm contribution={contribution} />
              </div>
            </div>
          </div>
        </div>
        {/* for img modal */}

        <div
          class="modal fade"
          id={contribution._id}
          tabIndex="-1"
          aria-labelledby={contribution._id}
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id={contribution._id}>
                  Picture of help needer
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <img
                  src={contribution.url}
                  className="img-thumbnail img-fluid"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer text-center">
          <button className="btn border-0" disabled={btnDisable}>
            <FontAwesomeIcon
              icon={faMapLocationDot}
              type="button"
              className="btn btn-outline-success"
              data-bs-toggle="modal"
              data-bs-target={`#exampleModal-${contribution._id}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpNeeders;
