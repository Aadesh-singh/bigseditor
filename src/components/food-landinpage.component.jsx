import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';

export default function Landing(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        let token = sessionStorage.getItem('loginToken');
        let user = JSON.parse(localStorage.getItem('user'));
        setUserDetails(user);
        fetch('http://localhost:8000/api/restaurants/fetchAllRestaurants')
            .then((response) => response.json())
            .then((json) => setData(json['restaurants']))
            .catch((error) => console.log('errr: ', error));
    }, [])

    useEffect(() => {
        if (data.length !== 0) {
            setIsLoading(false);
        }
        console.log(data);
    }, [data]);



    return (
        <div>
            {
                userDetails == null ?
                <Link to='/'>User Register</Link>
                : <div></div>
            }
            <br />
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                data.map((restr) => (
                    <Link key={restr._id} to={`/details?id=${restr._id}`}>{restr.name} {restr.address}</Link>

                    // <h1 key={restr._id}>
                    //     {restr.name} {restr.address}
                    // </h1>
                ))
            )}
            
        </div>
    )
}