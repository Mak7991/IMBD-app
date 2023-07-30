import React, { useEffect, useState } from 'react'
import { Col, Container, FloatingLabel, Form, Row, Spinner } from 'react-bootstrap';
import { get_Movies_Series } from '../../Services/movies';
import './home.css'
import moment from 'moment/moment';
import { ToastContainer, toast } from 'react-toastify';
import NavbarMain from "../../components/navbar/navbar";
import star from '../../assests/star_4855319.png'
import firebaseInstance from '../../firebase';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase'

const Home = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [filter, setfilter] = useState({ query: '' })
  const [data, setdata] = useState([])

  const handleFilter = (ev) => {
    setfilter({ ...filter, query: ev.target.value })
  }

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        setIsLoading(true);
        get_Movies_Series(filter.query)
          .then((res) => {
            setFirstLoad(false);
            setdata(res.data.results || []);
          })
          .catch((err) => {
            toast.error('Failed to fetch data, please refresh')
          })
          .finally(() => {
            setIsLoading(false);
          });
      },
      firstLoad ? 0 : 2000
    );
    return () => {
      clearTimeout(timeout);
    };
  }, [filter]);

  const handleAddtoFavourite =async (row) => {
    if (row.media_type === "movie") {
      await addDoc(collection(db, "movies"), {
        id: row?.id,
        title: row?.original_title,
        release_date: row?.release_date,
        image: `https://image.tmdb.org/t/p/w500/${row?.poster_path}`,
        vote: row?.vote_average,
        overview: row?.overview

      }).then(() => {
        toast("Your Item Was Added")
      }).catch((err) => toast(err))
    }
    else {
      await addDoc(collection(db, "series"), {
        id: row?.id,
        title: row?.name,
        release_date: row?.first_air_date,
        image: `https://image.tmdb.org/t/p/w500/${row?.poster_path}`,
        vote: row?.vote_average,
        overview: row?.overview

      }).then(() => {
        toast("Your Item Was Added")
      })
      .catch((err) => toast(err))
    }
  }


  return (
    <>
      <NavbarMain />
      <div className='mt-5 home-page'>
        <ToastContainer />

        <Container>
          <FloatingLabel
            controlId="floatingInput"
            label="Search Movie or Series"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Avengers - Peaky Blinders" value={filter.query} onChange={ev => handleFilter(ev)} />
          </FloatingLabel>


          <div className='search-result mt-5'>
            <Row xs={1} md={3} className="g-4">
              {isLoading ? (
                <Spinner size="md search-loader" />
              ) : !data.length && !firstLoad ? (
                <h4 className='mt-5 no-record'>
                  No Record Found
                </h4>
              ) : (
                data?.map((row) => {
                  return (
                    <Col key={row?.id}>
                      <div className="movie-card" key={row?.id} onClick={() => handleAddtoFavourite(row)}>
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
                            <div className="info-section">
                              <label>Vote Count</label>
                              <img src={star} width={30} height={30} className='favourite' />
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

export default Home