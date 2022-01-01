import { useState } from "react";

const useRideUsers = () => {
    const [rideUserID, setRideUserID] = useState('')

    return{
        rideUserID,
        setRideUserID
    }

}

export default useRideUsers;