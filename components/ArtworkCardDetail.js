import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import useSWR from "swr";
import Error from "next/error";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useState } from "react";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";
import { useEffect } from "react";

export default function ArtworkCardDetail({ objectID }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  const [showAdded, setShowAdded] = useState(false);
  
  useEffect(()=>{
    setShowAdded(favouritesList?.includes(objectID))
}, [favouritesList])

  
  const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);

  const favouritesClicked = async() => {
    if (showAdded) {
      setFavouritesList(
        await removeFromFavourites(objectID)
      );
      setShowAdded(false);
    } else {
      setFavouritesList(await addToFavourites(objectID));
      setShowAdded(true);
    }
  };

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <Card variant="top">
        {data.primaryImage && (
          <Card.Img variant="top" src={data.primaryImage} />
        )}
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
            <br />

            <div>
              <strong>Artist:</strong>{" "}
              {data.artistDisplayName ? (
                <span>
                  {data.artistDisplayName} (
                  <a
                    href={data.artistWikidata_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    wiki
                  </a>
                  )
                </span>
              ) : (
                "N/A"
              )}
            </div>
            <div>
              <strong>Credit Line:</strong> {data.creditLine || "N/A"}
            </div>
            <div>
              <strong>Dimensions:</strong> {data.dimensions || "N/A"}
            </div>
            <Button
              variant={showAdded ? "primary" : "outline-primary"}
              onClick={favouritesClicked}
            >
              {showAdded ? "+ Favourite (added)" : "+ Favourite"}
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
