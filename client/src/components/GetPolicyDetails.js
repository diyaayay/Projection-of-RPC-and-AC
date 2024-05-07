export default function GetPolicyDetails(){

    return ( <div className="overlaps-form-container">
      <form className="overlaps-form">
        <h2>Add Protection Policy</h2>
        <div className="form-group">
          <label htmlFor="policyName">Protection Policy Name</label>
          <input
            type="text"
            id="policyName"
            placeholder="Enter Policy Name"
          />
          <label htmlFor="Description">Description</label>
          <input
            type="text"
            id="description"
          />
          <div className="checkbox-section">
            <label>Options:</label>
            <div>
              <input type="checkbox" id="vmware" name="vmware" />
              <label htmlFor="vmware">VMware</label>
            </div>
            <div>
              <input type="checkbox" id="databaseLog" name="databaseLog" />
              <label htmlFor="databaseLog">DataBase Log</label>
            </div>
            <div>
              <input type="checkbox" id="aws" name="aws" />
              <label htmlFor="aws">AWS</label>
            </div>
            <div>
              <input type="checkbox" id="hpeArrayVolumes" name="hpeArrayVolumes" />
              <label htmlFor="hpeArrayVolumes">HPE Array Volumes</label>
            </div>
          </div>
        </div>
        
      </form>
  
      
      </div>
    );
  }