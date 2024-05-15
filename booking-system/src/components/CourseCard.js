import { Card, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../App";

export default function CourseCard({ courseProp }) {
  const { _id, name, description, price } = courseProp;
  const [seats, setSeats] = useState(10);
  const [isExpanded, setIsExpanded] = useState(false); // State to manage the expansion of text

  const formatter = new Intl.NumberFormat("en-US");
  // Function to toggle the display of full/short description
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to return either the full description or a truncated version
  const displayDescription = () => {
    return isExpanded || description.length <= 100
      ? description
      : description.substring(0, 100);
  };

  return (
    <Card id="courseComponent1" className="centered-form">
      <Card.Body>
        <Card.Title className="text-center">
          <h3 className="mb-4">{name}</h3>
        </Card.Title>
        <Card.Text>
          {displayDescription()}
          {description.length > 100 && ( // Only show the button if the description is longer than 100 characters
            <Button
              variant="link"
              onClick={toggleExpand}
              className="ps-1 mb-1 text-black text-decoration-none"
            >
              {isExpanded ? "(See Less)" : "..."}
            </Button>
          )}
        </Card.Text>
        <Row className="mb-4">
          <Col sm={12} md={6}>
            <Card.Text>₱ {formatter.format(price)}</Card.Text>
          </Col>
          <Col sm={12} md={6}>
            <Card.Text>Seats: {seats}</Card.Text>
          </Col>
        </Row>

        <Link className="btn btn-primary" to={`/courses/${_id}`}>
          Details
        </Link>
      </Card.Body>
    </Card>
  );
}
