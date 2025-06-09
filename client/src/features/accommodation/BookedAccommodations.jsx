import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import {
  deleteBookedAccommodation,
  getAllBookedAccommodations,
  selectAllBookedAccommodations,
  selectGettingAllBookedAccommodationsError,
  selectGettingAllBookedAccommodationsStatus,
} from "./accommodationSlice";
import getSymbolFromCurrency from "currency-symbol-map";

const BookedAccommodations = ({ tripId }) => {
  const bookedAccommodations = useSelector(selectAllBookedAccommodations);
  const gettingAllBookedAccommodationsStatus = useSelector(
    selectGettingAllBookedAccommodationsStatus
  );
  const gettingAllBookedAccommodationsError = useSelector(
    selectGettingAllBookedAccommodationsError
  );

  const dispatch = useDispatch();

  //   loading cancel btn
  const [cancelBtnLoading, setCancelBtnLoading] = useState({});

  const handleAccommodationBookingCancel = (accommodation) => {
    const accommodationBookingId = accommodation._id;

    setCancelBtnLoading((prev) => ({
      ...prev,
      [accommodationBookingId]: true,
    }));

    dispatch(deleteBookedAccommodation(accommodationBookingId))
      .unwrap()
      .then(() => {
        alert("Accommodation booking canceled");
        return dispatch(getAllBookedAccommodations(tripId));
      })
      .catch((err) =>
        alert(`Error canceling travel booking: ${err.message || err}`)
      )
      .finally(() =>
        setCancelBtnLoading((prev) => ({
          ...prev,
          [accommodationBookingId]: false,
        }))
      );
  };

  useEffect(() => {
    dispatch(getAllBookedAccommodations(tripId));
  }, [dispatch, tripId]);

  if (gettingAllBookedAccommodationsStatus === "failed") {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <i class="bi bi-building-x fs-3"></i>
            <h6>No Accommodation Booked</h6>
          </div>
        </div>
      </div>
    );
  }

  if (gettingAllBookedAccommodationsStatus === "loading") {
    <div className="container">
      <div className="row ">
        <div className="col text-center">
          <FontAwesomeIcon icon={faSpinner} spinPulse className="fs-3" />
          <h6 className="mt-2">Loading...</h6>
        </div>
      </div>
    </div>;
  }

  if (gettingAllBookedAccommodationsStatus === "succeeded") {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h6 className="text-start text-secondary">
              Accommodations Booked (*CheckIn&out can be done any time)
            </h6>

            <div
              className="table-responsive"
              style={{
                maxHeight: "300px",
                overflowY: "scroll",
                scrollbarWidth: "none",
                outline: "none",
              }}
            >
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Amenities</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Check-In</th>
                    <th scope="col">Check-Out</th>
                    <th scope="col">Cost</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {bookedAccommodations?.map((accommodation, index) => {
                    return (
                      <tr key={accommodation._id}>
                        <td>{index + 1}</td>
                        <td>{accommodation.accommodationName}</td>
                        <td>{accommodation.address}</td>
                        <td>{accommodation.amenities.join(", ")}</td>
                        <td>{accommodation.rating}</td>
                        <td>
                          {new Date(accommodation.checkInDate).toLocaleString(
                            "en-IN"
                            // {
                            //   timeZone: "UTC",
                            // }
                          )}
                        </td>

                        <td>
                          {" "}
                          {new Date(accommodation.checkOutDate).toLocaleString(
                            "en-IN"
                            // {
                            //   timeZone: "UTC",
                            // }
                          )}
                        </td>
                        <td>
                          {getSymbolFromCurrency(accommodation.cost.currency)}
                          {accommodation.cost.amount}
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-danger rounded-pill"
                            disabled={cancelBtnLoading[accommodation._id]}
                            onClick={() =>
                              handleAccommodationBookingCancel(accommodation)
                            }
                          >
                            {cancelBtnLoading[accommodation._id] === true ? (
                              <span role="status">Canceling...</span>
                            ) : (
                              "Cancel"
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>BookedAccommodations</div>;
};

export default BookedAccommodations;
