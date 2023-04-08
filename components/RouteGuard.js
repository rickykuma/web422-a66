import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { favouritesAtom } from "@/store";
import { searchHistoryAtom } from "@/store";
import { getFavourites } from "@/lib/userData";
import { getHistory } from "@/lib/userData";
import { useAtom } from "jotai";

const PUBLIC_PATHS = ["/login", "/", "/_error", "/register"];

import { isAuthenticated } from "@/lib/authenticate";

// ...

export default function RouteGuard(props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    updateAtoms();
    // on initial load - run auth check
    authCheck(router.pathname);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  function authCheck(url) {
    const path = url.split("?")[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }

  return <>{authorized && props.children}</>;
}
