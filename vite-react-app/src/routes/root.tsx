import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";


export default function Root() {

    const coursesList = ["react", "angular", "vue", "Javascript"];
    const randomCourseName = coursesList[Math.floor(Math.random() * coursesList.length)]

    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            <form method="post">
              <button type="submit">New</button>
            </form>
          </div>
          <nav>
            <ul>
              <li>
                <Link to={"contacts/1"}> Your Name </Link>
              </li>
              <li>
                <Link to = {"contacts/2"}> Your Friend </Link>
              </li>
            </ul>
          </nav>
        </div>
        <h1>
            NavLinks 
        </h1>
        <NavLink to={`/courses/${randomCourseName}`} style={({isActive }) => {
            return {
                backgroundColor : isActive ? "red" : "pink"
            }
        }
        
        }> {randomCourseName} </NavLink>
        <NavLink to={`/courses/${randomCourseName}`} > {randomCourseName} </NavLink>
        <NavLink to={"/courses/Javascript"} > JavaScript </NavLink>
        <div id="detail">
            <Outlet />
        </div>
      </>
    );
  }