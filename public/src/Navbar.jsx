import "./navbar.css"
export default function Navbar() {
    return (
        <>
            <div className="conainer navbar-cont">
                <nav className="navbar navbar-expand-lg navbar-light bg-secondary bg-gradient">
                    <div className="container-fluid">
                        <a className="navbar-brand" >
                            {localStorage.getItem("rolename")}
                        </a>
                        
                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                           
                           <button className="btn btn-primary">Logout</button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}
