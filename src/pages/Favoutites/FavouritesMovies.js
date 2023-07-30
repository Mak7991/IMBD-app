import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import './favourite.css'
import moment from 'moment/moment';
import { ToastContainer, toast } from 'react-toastify';
import NavbarMain from "../../components/navbar/navbar";
import remove from '../../assests/delete_6861362.png'
import { db } from '../../firebase'
import { deleteDoc, getDocs, collection } from "firebase/firestore";

const FavouritesMovies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [movies, setmovies] = useState([])

  useEffect(() => {
    const timeout = setTimeout(() => {
      const collectionRef = collection(db, 'movies');
      setIsLoading(true);
      getDocs(collectionRef)
        .then((querySnapshot) => {
          setFirstLoad(false);
          const dataArray = querySnapshot.docs.map((doc) => doc.data());
          setmovies(dataArray || [])
        })
        .catch((err) => {
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


  const handleDelete = async (row) => {
    const productIDToDelete = row.id;
    const productRef = collection(db, 'movies', productIDToDelete);
    console.log(productRef)
    await deleteDoc(productRef)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error('Error removing favourite: ', error);
      })
      .finally(() => {

      })
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
                        <div className="movie-header" style={{ background: `url(${row?.image})`, backgroundSize: 'cover' }}>
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
                              <span>{row?.vote}/10</span>
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