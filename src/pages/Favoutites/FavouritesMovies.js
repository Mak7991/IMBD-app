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

  }

  return (
    <>
      <NavbarMain />
      <div className=' favourite-page'>
        <ToastContainer />

        <Container>
          <div className='movie-list mt-5'>
            <Row xs={1} md={3} className="g-4">
              {isLoading ? (
                <Spinner size="md search-loader" />
              ) : (
                movies?.map((row) => {
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