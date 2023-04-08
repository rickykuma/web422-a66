import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import useSWR from "swr";
import Error from "next/error";

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );
  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          src={
            data.primaryImageSmall ||
            "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
          }
        />
        <Card.Body>
          <Card.Title>{data.title || "N/A"}</Card.Title>
          <Card.Text>
            <div>
              <strong>Date: </strong>
              {data.objectDate || "N/A"}
            </div>
            <div>
              <strong>Classification:</strong> {data.classification || "N/A"}
            </div>
            <div>
              <strong>Medium:</strong> {data.medium || "N/A"}
            </div>
          </Card.Text>
          <div>
          <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
            <Button variant="btn btn-outline-primary">
              <strong>ID:</strong>
              {objectID}
            </Button>
          </Link></div>
        </Card.Body>
      </Card>
    </>
  );
}
