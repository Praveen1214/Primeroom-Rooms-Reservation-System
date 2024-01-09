import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Room({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const { imageurls, name } = room;

  return (
    <div className="row bs">
      <div className="col-md-5">
        <img src={imageurls[0]} className="smallimg" alt={name} />
      </div>
      <div className="col-md-7 text-left ">
        <b>
          <h1>
            <b>{room.name}</b>
          </h1>
          <p>Max Count: {room.maxcount}</p>
          <p>Phone Number: {room.phonenumber}</p>
          <p>Type: {room.type}</p>
        </b>
      </div>

      <div
        style={{ display: "flex", justifyContent: "flex-end", float: "right" }}
      >
        <Link to={`/book/${room._id}/${fromdate || ""}/${todate || ""}`}>
          <button className="btn btn-primary m-2">Book Now</button>
        </Link>

        <button className="btn btn-primary m-2" onClick={handleShow}>
          View Details
        </button>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imageurls.map((url, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100 bigimg" src={url} alt="" />
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
