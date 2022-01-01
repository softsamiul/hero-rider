import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Packages from "../../Shared/Data/Data";
import Navigation from "../../Shared/Navigation/Navigation";
import useAuth from "../../Hooks/useAuth";
import "./Profile.css";
import { Table } from "@mui/material";

const Profile = () => {
  const [allUser, setAllUser] = useState([]);
  const [packages, setPackages] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetch(`http://localhost:7000/riderUsersCollection`)
      .then((res) => res.json())
      .then((data) => setAllUser(data));
  }, []);

  const currentUser = allUser.find(
    (singleUser) => singleUser.fullName === user.displayName
  );
  const currentUserType = currentUser?.userType;

  useEffect(() => {
    fetch(`http://localhost:7000/packages`)
      .then((res) => res.json())
      .then((data) => setPackages(data));
  }, []);
  const packagesToBuy = Packages;

  return (
    <div>
      <Navigation></Navigation>
      <Container className="profile-page-wrapper">
        <h2>Welcome {user.displayName}</h2>

        {currentUserType === "learner" ? (
          <Row className="mx-auto single-package-wraper">
            {packages.map((singlePackage) => (
              <div
                className="single-package"
                md={6}
                gap={2}
                key={singlePackage._id}
              >
                <div>
                  <div>
                    <img
                      src={singlePackage.img}
                      style={{ height: "180px" }}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <h2 className="my-3">{singlePackage.title}</h2>
                  <button className="btn-design me-2">
                    ${singlePackage.price}
                  </button>
                  <NavLink to={`/procedshiping/${singlePackage._id}`}>
                    <button className="btn-design">Buy Now</button>
                  </NavLink>
                </div>
              </div>
            ))}
          </Row>
        ) : (
          <Row>
            <div>
              <div>
                <img
                  className="img-fluid"
                  src="https://i.ibb.co/4NVKrWL/RIDE.png"
                  alt="Rider img"
                />
              </div>
              <div className='profile-table'>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>User Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{user.displayName}</td>
                      <td>{user?.email}</td>
                      <td>{currentUserType}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Profile;
