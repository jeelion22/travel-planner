import "../styles/Contributions.css";
import { useState, useEffect } from "react";
import { Outlet, useLoaderData, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import userServices from "../../services/userServices";
import EditSeekerData from "./EditSeekerData";
import ReactPaginate from "react-paginate";
import ImageDetails from "./ImageDetails";

const Contributions = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const handleDelete = async (fileName, imageId) => {
    if (confirm(`Would you like to delete ${fileName} contribution?`)) {
      try {
        await userServices.deleteImage(imageId);

        alert(`${fileName} deleted successfully!`);
        navigate(0);
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const itemsPerPage = 6;
  const contributions = user.data.user.contributions || [];
  const paginatedContributions = contributions.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="border rounded text-center p-4 new-contribution">
            <h5>To make a new contribution, please </h5>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => {
                navigate("/users/contributions/new");
              }}
            >
              Click ME!
            </button>
          </div>
        </div>

        <div className="row">
          {/* <div className="col-md-12 col-sm-12"> */}
          {contributions.length === 0 ? (
            <div className="text-center mt-5">
              <p>***Not yet contributed***</p>
            </div>
          ) : (
            <div className="table-responsive border rounded mt-2 contribution-list">
              <table className="table  table-hover  mt-2">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">File</th>
                    <th scope="col">Size</th>
                    <th scope="col">DoU</th>
                    <th scope="col">Status</th>
                    <th scope="col">Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedContributions.map((contribution, index) => {
                    const itemNumber = currentPage * itemsPerPage + index + 1;
                    return (
                      <>
                        <tr key={contribution._id.toString()}>
                          <td scope="row">{itemNumber}</td>
                          <td>
                            <Link
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target={`#${contribution._id.toString()}`}
                            >
                              {contribution.fileName}
                            </Link>
                          </td>
                          <td>
                            {(contribution.fileSize / (1024 * 1024)).toFixed(2)}
                            MB
                          </td>
                          <td>{contribution.uploadDate.split("T")[0]}</td>
                          <td>{contribution.status}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <FontAwesomeIcon
                                icon={faPenToSquare}
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={() => {
                                  setEdit(contribution._id.toString());
                                }}
                              />
                              <FontAwesomeIcon
                                className="btn btn-outline-danger"
                                icon={faTrashCan}
                                type="button"
                                onClick={() => {
                                  handleDelete(
                                    contribution.fileName,
                                    contribution._id.toString()
                                  );
                                }}
                              />
                            </div>
                          </td>
                        </tr>

                        {edit === contribution._id.toString() && (
                          <tr>
                            {" "}
                            <td colSpan={6}>
                              <EditSeekerData
                                setEdit={setEdit}
                                contribution={contribution}
                              />
                            </td>
                          </tr>
                        )}

                        <div
                          class="modal fade"
                          id={contribution._id.toString()}
                          tabIndex="-1"
                          aria-labelledby={contribution._id.toString()}
                          aria-hidden="true"
                        >
                          <div class="modal-dialog modal-dialog-scrollable rounded">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h1
                                  class="modal-title fs-5"
                                  id={contribution._id.toString()}
                                >
                                  Details of Uploads
                                </h1>
                                <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div class="modal-body">
                                <ImageDetails
                                  contributionId={contribution._id.toString()}
                                  key={contribution._id.toString()}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
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
        pageClassName="page-item"
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

export default Contributions;
