import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import './RegisteredUsers.css'

const RegisteredUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [usersToFilter, setUsersToFilter] = useState([]);
  const [filtered, setFiltered] = useState("");
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => setFiltered(data);



//   const size = 10;
//   useEffect(() => {
//     fetch(`http://localhost:7000/riderUsersCollection?page=${page}&&size=${size}`)
//         .then(res => res.json())
//         .then(data => {setAllUsers(data.users)
//           console.log(data)
//             const count=data.count;
//             const pageNumber=Math.ceil(count/size)
//             setPageCount(pageNumber)}
//         );
// }, [page]);

  useEffect(() => {
    fetch(`http://localhost:7000/riderUsersCollection`)
      .then((res) => res.json())
      .then((data) => setUsersToFilter(data));
  }, []);

  let filteredUser = usersToFilter;

  if (filtered) {
    filteredUser = usersToFilter.filter((user) => {
      return (
        user.phone === filtered.filterCopy ||
        user.fullName === filtered.filterCopy ||
        user.email === filtered.filterCopy
      );
    });
  }

  return (
    <div>
      <div className="container my-5">
        <h1 className="text-center mb-5">All Registered Users</h1>

        <Row>
          <div>
            {/* Search Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="search-form">
              <input className="search-inp"
                placeholder="Name, Email or Phone"
                {...register("filterCopy", { required: true, maxLength: 20 })}
              />

              {/* <select
                className="inp-field search-inp"
                id="user1"
                name="carType"
                {...register("flterAge")}
              >
                <option value="select">Select</option>
                <option value="car">18 - 25</option>
                <option value="bike">26 - 30</option>
              </select> */}
              <input type="submit" className="search-inp search-inp-submit" value='Search' />
            </form>
          </div>
        </Row>
        <Table responsive striped bordered hover className="m-5 ">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Address</th>
              <th>Age</th>
              <th>User type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUser.map((user) => (
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.age}</td>
                <td>{user.userType}</td>
                <td>Action</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="pagination m-5">
                        {
                            [...Array(pageCount).keys()]
                                .map(number => <button
                                    className= {number === page ? 'selected' : ' '}
                                    key={number}
                                    onClick={() => setPage(number)}
                                >{number + 1}</button>)
                        }
                    </div>
      </div>
    </div>
  );
};

export default RegisteredUsers;
