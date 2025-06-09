import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import userServices from "../../../services/userServices";
import { Link } from "react-router-dom";

const AdminUsersContributions = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [contributions, setContributions] = useState([]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  useEffect(() => {
    const getAllContributions = async () => {
      try {
        const response = await userServices.adminGetAllContributions();

        if (response) {
          setContributions(response.data.message);
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    getAllContributions();
  }, []);

  const itemsPerPage = 10;
  const allContributions = contributions || [];
  const paginatedContributionsList = allContributions.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleLocation = async (location) => {
    try {
      const locationUrl = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
      window.open(locationUrl, "_blank");
    } catch (error) {
      console.log("Error fetching Google Maps URL:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <h4 className="text-center border-bottom  p-2 shadow-lg">
            List of Contributions
          </h4>
        </div>

        <div className="row ">
          <div className="col  border rounded bg-light">
            <div className="table-responsive pt-2">
              <table className="table borderless table-hover align-middle p-4">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Filename</th>
                    <th scope="col">Type</th>
                    <th scope="col">Size</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">UploadedBy</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedContributionsList.map((contribution, index) => {
                    const itemNumber = currentPage * itemsPerPage + index + 1;
                    return (
                      <tr key={contribution._id.toString()}>
                        <th scope="row">{itemNumber}</th>

                        <td>
                          <Link
                            type="button"
                            //   className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target={`#${contribution._id.toString()}`}
                          >
                            {contribution.fileName}
                          </Link>

                          <div
                            className="modal fade"
                            id={contribution._id.toString()}
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"
                            tabIndex="-1"
                            aria-labelledby={contribution._id.toString()}
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-dialog-scrollable">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h1
                                    className="modal-title fs-5"
                                    id={contribution._id.toString()}
                                  >
                                    Reunite Seekers Information
                                  </h1>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body">
                                  <div
                                    className="card"
                                    style={{ width: "auto" }}
                                  >
                                    <img
                                      src={contribution.imgUrl}
                                      className="card-img-top"
                                      alt={contribution.fileName}
                                    />

                                    <div className="card-body">
                                      <table className="table table-borderless">
                                        <tbody>
                                          <tr>
                                            <th>Description</th>
                                            <td>
                                              {contribution?.description || "-"}
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Name</th>
                                            <td>{contribution?.name || "-"}</td>
                                          </tr>
                                          <tr>
                                            <th>Address</th>
                                            <td>
                                              {contribution?.address || "-"}
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Phone</th>
                                            <td>
                                              {contribution?.phone || "-"}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                      handleLocation(contribution.location);
                                    }}
                                  >
                                    Location
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{contribution.fileType}</td>
                        <td>
                          {(contribution.fileSize / (1024 * 1024)).toFixed(2)}
                          Mb
                        </td>
                        <td>{contribution.uploadDate.split("T")[0]}</td>
                        <td>{contribution.status}</td>
                        <td>{contribution.uploadedBy}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ReactPaginate
        previousLabel="previous"
        nextLabel="next"
        breakLabel="..."
        pageCount={Math.ceil(contributions.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        className="pagination justify-content-center mt-4"
        pageClassName="page_item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
        onPageChange={handlePageClick}
      />
    </>
  );
};

export default AdminUsersContributions;
