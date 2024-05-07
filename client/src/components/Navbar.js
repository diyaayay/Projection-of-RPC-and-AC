function Navbar({ data, setShowComp, setShowForm }) {
    const handleCreatePolicyClick = () => {
      setShowComp(true);
      setShowForm(false); // Hide the overlaps form if it's currently displayed
    };
  
    const handleOverlapsClick = () => {
      setShowComp(false); // Hide the create policy form if it's currently displayed
      setShowForm(true);
    };
  
    return (
      <div className="navbar">
        <ul>
          <button className="navbar-button" onClick={handleCreatePolicyClick}>
            Create Policy
          </button>
          <button className="navbar-button" onClick={handleOverlapsClick}>
            Overlaps
          </button>
          <button className="navbar-button">Recovery Points</button>
        </ul>
      </div>
    );
  }

  export default Navbar;