import axios from "axios";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useAuth from "../../Hooks/useAuth";

const ProcedShiping = () => {
    const {id} = useParams();
    const {user} = useAuth();
    const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {

    axios.post('http://localhost:7000/orders',data)
        .then(response => {
            console.log(response);
            if(response.data.insertedId){
                const url = `/payment/${id}`;
                history.push(url);
            }
        })
  };


  return (
    <div>
      <Container>
        <h2>Proced Shiping</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group-wrapper">
            <label className="inp-label">Full Name: </label>
            <input
              className="inp-field" value={user.displayName}
              {...register("fullName",  { required: true, maxLength: 40 })}
            />
          </div>
          <div className="input-group-wrapper">
            <label className="inp-label">Email: </label>
            <input
              className="inp-field"
              type="email" value={user.email}
              {...register("email", { required: true, maxLength: 40 })}
            />
          </div>
          <div className="input-group-wrapper">
            <label className="inp-label">Phone: </label>
            <input
              className="inp-field"
              type="number"
              {...register("phone", { required: true, maxLength: 40 })}
            />
          </div>
          <div className="input-group-wrapper">
            <label className="inp-label">Address: </label>
            <input
              className="inp-field"
              type="text"
              {...register("address", { required: true, maxLength: 40 })}
            />
          </div>
          
          <input type="submit" />
        </form>
      </Container>
    </div>
  );
};

export default ProcedShiping;
