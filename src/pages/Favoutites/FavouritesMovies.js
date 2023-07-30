import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { get_Favourite_Movies } from '../../Services/movies';
import './favourite.css'
import moment from 'moment/moment';
import { ToastContainer, toast } from 'react-toastify';
import NavbarMain from "../../components/navbar/navbar";
import remove from '../../assests/delete_6861362.png'

const FavouritesMovies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [movies, setmovies] = useState([])

  const [arr, setArr] = useState([{
    "adult": false,
    "backdrop_path": "/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",
    "genre_ids": [
      878,
      12,
      28
    ],
    "id": 447365,
    "original_language": "en",
    "original_title": "Guardians of the Galaxy Vol. 3",
    "overview": "Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe along with protecting one of their own. A mission that, if not completed successfully, could quite possibly lead to the end of the Guardians as we know them.",
    "popularity": 2050.089,
    "poster_path": "/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
    "release_date": "2023-05-03",
    "title": "Guardians of the Galaxy Vol. 3",
    "video": false,
    "vote_average": 8.107,
    "vote_count": 3620
  }])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(true);
      get_Favourite_Movies().then((res) => {
        setFirstLoad(false);
        setmovies(res.data.results || [])
      })
        .catch(err => {
          toast.error('failed to fetch movies')
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }, firstLoad ? 0 : 1000);
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const handleDelete = () => {
    toast.success('Video Deleted')
    setArr([])
  }

  return (
    <>
      <NavbarMain />
      <div className=' favourite-page'>
        <ToastContainer />

        <Container>
          <div className='movie-list mt-5'>
            <Row xs={1} md={9} className="g-4">
              {isLoading ? (
                <Spinner size="md search-loader" />
              ) : (
                arr?.map((row) => {
                  return (
                    <Col key={row?.id}>
                      <div className="favourite-movie-card" key={row?.id}>
                        <div className="movie-header" style={{ background: `url(https://image.tmdb.org/t/p/w500/${row?.poster_path})`, backgroundSize: 'cover' }}>
                        </div>
                        <div className="movie-content">
                          <div className="movie-content-header">
                            <p className="movie-title">
                              {row?.title}
                            </p>
                          </div>
                          <div className="movie-info">
                            <div className="info-section">
                              <label>Release &amp; Date</label>
                              <span>{moment(row?.release_date).format('LL')}</span>
                            </div>
                            <div className="info-section">
                              <label>Rating</label>
                              <span>{row?.vote_average}/10</span>
                            </div>
                            <div className="info-section" onClick={() => handleDelete(row)}>
                              <img src={remove} width={30} height={30} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  )
                })
              )}
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default FavouritesMovies