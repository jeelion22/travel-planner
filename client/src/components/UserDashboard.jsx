import { useLoaderData } from "react-router-dom";

import { ReuniteSeekerDashBoard } from "./ReuniteSeekerDashBoard";
import ContributorDashboard from "./ContributorDashboard";

const UserDashboard = () => {
  const { user } = useLoaderData();

  const userInfo = user.data.user;

  return (
    <>
      {user.data.user.userCategory === "reuniteSeeker" ||
      userInfo.userCategory === "both" ? (
        <ReuniteSeekerDashBoard userInfo = {userInfo} />
      ) : (
        <ContributorDashboard userInfo={userInfo} />
      )}
    </>
  );
};

export default UserDashboard;
