import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList || favouritesList.length === 0) {
    return (
      <Card>
        <Card.Body>
          <h4>Nothing Here</h4>
          Try adding some new artwork to the list.
        </Card.Body>
      </Card>
    );
  }

  return (
    <div>
      <Row className="gy-4">
        {favouritesList.map((currentObjectID) => (
          <Col lg={3} key={currentObjectID}>
            <ArtworkCard objectID={currentObjectID} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
