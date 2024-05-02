export default function StepTwo() {
    const toggleScheduleForm = () => {
      const scheduleForm = document.getElementById("scheduleForm");
      scheduleForm.classList.toggle("open");
    };
  
    return (
      <div className="overlaps-form-container">
        <form className="overlaps-form">
          <h2>Add Protection Policy</h2>
          <div className="form-group">
            <p>HPE Array Volumes</p>
            <div className="schedule-container">
          <h2>Schedule</h2>
          <button onClick={toggleScheduleForm}>+ Add Schedule</button>
          <h2>On-Premises Protection Store</h2>
          <button onClick={toggleScheduleForm}>+ Add Schedule</button>
          <h2>HPE Cloud Protection Store</h2>
          <button onClick={toggleScheduleForm}>+ Add Schedule</button>
          <div className="schedule-form" id="scheduleForm">
           
          </div>
        </div>
          </div>
        </form>
  
       
      </div>
    );
  }