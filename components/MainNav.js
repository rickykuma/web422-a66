import { Container, Nav, Navbar, Form, Button, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from '@/store';
import { addToHistory } from "@/lib/userData";
import { removeToken } from "@/lib/authenticate";
import { readToken } from "@/lib/authenticate";


export default function MainNav() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  function toggleNavbar() {
    setIsExpand(!isExpanded);
  }
  function toggleNavlink() {
    setIsExpand(false);
  }

  function logout(){
    setIsExpand(false);
    removeToken();
    router.push("/login");
  }

  async function submitForm(e) {
    e.preventDefault();
    setIsExpand(false);
    const searchField = e.target.search.value;
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
    router.push(`/artwork?title=true&q=${searchField}`);
  }
  const [isExpanded, setIsExpand] = useState(false);
  let token = readToken();

  return (
    <>
      <Navbar
        expand="lg"
        className="navbar fixed-top navbar-dark bg-primary"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand>Mohammad Rashidi</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={toggleNavbar}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/"} onClick={toggleNavlink}>Home</Nav.Link>
              </Link>
              {token ?(<Link href="/search" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/search"} onClick={toggleNavlink}>Advanced Search</Nav.Link>
              </Link>):("")}
            </Nav>
            {token?(""):(<Nav>
            <Link href="/register" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/register"} onClick={toggleNavlink}>Register</Nav.Link>
              </Link>
              <Link href="/login" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/login"} onClick={toggleNavlink}>Login</Nav.Link>
              </Link>
              </Nav>)} 
            &nbsp;
            {token?(<Form className="d-flex" onSubmit={submitForm}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                name="search"
              />
              <Button type="submit" variant="success">
                Search
              </Button>
            </Form> ):("")}
            &nbsp;
            {token?(<Nav>
              <NavDropdown title={token.userName} id="basic-nav-dropdown">
              <Link href="/favourites" passHref legacyBehavior>
              <NavDropdown.Item active={router.pathname === "/favourites"} onClick={toggleNavlink} >Favourites</NavDropdown.Item>
              </Link>
              <Link href="/history" passHref legacyBehavior>
              <NavDropdown.Item active={router.pathname === "/history"} onClick={toggleNavlink} >Search History</NavDropdown.Item>
              </Link>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item> 
              </NavDropdown>
            </Nav>):("")}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />
    </>
  );
}
