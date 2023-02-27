import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Details() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [queryParameters] = useSearchParams();
    const [userDetails, setUserDetails] = useState(null);
    const [addReviewInfo, setAddReviewInfo] = useState({
        content: '',
        user: '',
        restaurants: ''
    });
    const [allReviews, setAllReviews] = useState([]);

    useEffect(() => {
        let id = queryParameters.get("id")
        let user = JSON.parse(localStorage.getItem('user'));
        setUserDetails(user);

        fetch('http://localhost:8000/api/restaurants/getDetailsOfRestaurants?id=' + id)
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

    useEffect(() => {
        let id = queryParameters.get("id")
        fetch('http://localhost:8000/api/review/fetchAllReviewsOfRestaurants?restaurants=' + id)
        .then((response) => response.json())
            .then((json) => setAllReviews(json['review']))
            .catch((error) => console.log('errr: ', error));
    }, [addReviewInfo])


    const handleChange = (event) => {
        setAddReviewInfo({ user: userDetails._id, restaurants: queryParameters.get("id"), content: event.target.value });
    } 

    const submitReview = (event) => {
        event.preventDefault();
        console.log(addReviewInfo);

        fetch('http://localhost:8000/api/review/createReview', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addReviewInfo)
        }).then((response) => response.json())
            .then((json) => {
                alert(json['msg']);
            })
            .catch((error) => console.log('Error: ', error));

            setAddReviewInfo({
                content: '',
                user: '',
                restaurants: ''
            })
    }



    return (
        <div>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                    <div>
                        <div>Name: {data.name}</div>
                        <div>Email: {data.email}</div>
                        <div>address: {data.address}</div>
                        <div>Description: {data.description}</div>
                        <div>Special foods: </div>
                        {
                            data.foods.map((item) => (
                                <div key={item}>{item}</div>
                            ))
                        }
                    </div>
                    <div>
                        <h3>All Reviews</h3>
                        {allReviews.map((item) => (
                            <div key={item._id}>
                                {item.content}
                                <sub>{item.user?.firstName}</sub>
                            </div>
                        ))}
                    </div>
                    {
                        userDetails ? (
                            <form onSubmit={submitReview}>
                                <div>
                                    <h3>Add Review</h3>
                                </div>
                                <div>
                                    <input type="text" name='content' value={addReviewInfo.content} onChange={handleChange} />

                                    <button>Submit</button>
                                </div>
                            </form>
                        ) : (
                            <div></div>
                        )
                    }
                </div>
            )}
        </div>
    )
}