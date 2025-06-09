import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import userServices from "../../services/userServices";
import ReactPaginate from "react-paginate";
import ReuniteSeekerResponseForm from "./ReuniteSeekerResponseForm";
import HelpNeeders from "./HelpNeeders";
import { useLoaderData } from "react-router-dom";

export const ReuniteSeekerDashBoard = () => {
  const [contributions, setContributions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const { user } = useLoaderData();

  const userId = user.data.user._id;

  useEffect(() => {
    async function getAllContributions() {
      try {
        const response = await userServices.getAllContributions();
        setContributions(response.data);
      } catch (error) {
        alert(error.response.data.message);
      }
    }
    getAllContributions();
  }, []);

  const itemsPerPage = 6;
  const paginatedContributions = contributions.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className="container">
      <h3 className="text-center border-bottom shadow-lg p-3">
        Reunite Seekers
      </h3>
      <div className="row">
        <div className="col-md-12  p-3 ">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {paginatedContributions.map((contribution) => (
              <HelpNeeders
                key={contribution._id}
                contribution={contribution}
                userId={userId}
              />
            ))}
          </div>
        </div>

        {paginatedContributions && (
          <ReactPaginate
            previousLabel="previous"
            nextLabel="next"
            breakLabel="..."
            pageCount={Math.ceil(contributions.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            className="pagination justify-content-center mt-4 "
            pageClassName="page_item "
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
        )}
      </div>
    </div>
  );
};
