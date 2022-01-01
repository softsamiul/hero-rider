// import React, { useEffect, useState } from 'react';
// import { Redirect, Route } from 'react-router';
// import spinner from '../../../assets/images/spinner.gif';
// import useAuth from '../../../Hooks/useAuth';


// const AdminRoute = ({ children, ...rest }) => {
//     const { user,loading } = useAuth()
//     const [allUsers, setAllUsers] = useState([]);

//     useEffect(()=>{
//         fetch('http://localhost:7000/riderUsersCollection/')
//         .then(res=>res.json())
//         .then(data=> setAllUsers(data))
//     },[])

//   console.log(setAllUsers);

//   const currentUser = allUsers.find(
//     (singleUser) => singleUser.fullName === user.displayName
//   );

//   const admin = currentUser?.role;   

//   console.log(admin)

//     if(loading){
//         return <div>
//             <img  className="mx-auto" src={spinner} alt="spinner" />
//         </div>
//     }
//     return (

//         <Route
//             {...rest}
//             render={({ location }) =>
//                 user.email &&  admin === "Admin" ? (
//                     children
//                 ) :
//                  (
//                     <Redirect
//                         to={{
//                             pathname: "/dashboard",
//                             state: { from: location }
//                         }}
//                     />
//                 )
//             }
//         />

//     );
// };

// export default AdminRoute;