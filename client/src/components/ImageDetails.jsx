import { useState, useEffect } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import axios from "axios";
import userServices from "../../services/userServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ImageDetails = ({ contributionId }) => {
  const imageId = contributionId;
  const { user } = useLoaderData();
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const response = await userServices.getImage(imageId);
        setImageUrl(response.data.url);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    fetchImageUrl();
  }, [imageId]);

  const handleImageUrl = async () => {
    try {
      const response = await userServices.getMapUrl(imageId);
      const { url } = response.data;
      window.location.href = url;
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const contribution = user.data.user.contributions.find((contribution) => {
    return contribution._id.toString() === imageId;
  });

  if (!contribution) {
    return <div>Contribution not found</div>;
  }

  return (
    <div className="card">
      <img
        src={imageUrl}
        className="card-img-top img-fluid rounded"
        alt={contribution.key.split("/")[1]}
      />

      <div className="card-body">
        <table className="table table-responsive table-borderless">
          <tbody>
            <tr>
              <th>Description</th>
              <td>
                {contribution.description ? contribution.description : "-"}
              </td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{contribution.name ? contribution.name : "-"}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{contribution.address ? contribution.address : "-"}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{contribution.phone ? contribution.phone : "-"}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Location</th>
              <td>
                <FontAwesomeIcon
                  icon={faMapLocationDot}
                  type="button"
                  onClick={handleImageUrl}
                  style={{ fontSize: "36px" }}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ImageDetails;
