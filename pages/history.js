import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Button, Card, ListGroup } from "react-bootstrap";
import { searchHistoryAtom } from "@/store";
import { removeFromHistory } from "@/lib/userData";
import styles from "../styles/History.module.css";

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();
  let parsedHistory = [];
  if(!searchHistory) return null;
  
  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });
  
  function historyClicked(e, index) {
    e.preventDefault();
    router.push({
      pathname: "/artwork",
      query: searchHistory[index],
    });
  }
  
  async function removeHistoryClicked(e, index) {
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  }
  

  return (
    <>
      {parsedHistory.length === 0 ? (
        <Card>
          <Card.Body><h4>Nothing here.</h4> Try searching for some artwork.</Card.Body>
        </Card>
      ) : (<ListGroup>
      {parsedHistory.map((historyItem, index) => (
        <ListGroup.Item
          key={index}
          className={styles.historyListItem}
          onClick={(e) => historyClicked(e, index)}
        >
          {Object.keys(historyItem).map((key) => (
            <>
              {key}: <strong>{historyItem[key]}</strong>&nbsp;
            </>
          ))}
          <Button
            className="float-end"
            variant="danger"
            size="sm"
            onClick={(e) => removeHistoryClicked(e, index)}
          >
            &times;
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>)}
      
    </>
  );
}
