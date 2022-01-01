import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const MakeAdmin = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const {email} = data;
        const user={email}
      fetch('http://localhost:7000/riderUsersCollection',{
        method:'PUT',
        headers: {
          'content-type':'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(data => {
                 if(data.modifiedCount>0){
                  Swal.fire({
                    title: `${email} added as a new admin`,
                    icon:'success',
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    }
                  })
                  reset()
                 }
      })
       
    }
    return (
        <div className="text-center">
          <h1>Make an Admin</h1>
           <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-5">
             <input type="email" className="mx-auto w-75 my-2 p-2" placeholder="Enter your Email" {...register("email", { required: true })} /> <br />
             <input  className=  " mx-auto button-regular rounded w-75 fw-bold mb-3" type="submit" value="Make admin" /><br />
            </form>
        </div>
    );
};

export default MakeAdmin;