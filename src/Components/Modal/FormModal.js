import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '3%',
  left: '15%',
  bottom:"3%",
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const FormModal =({open, handleOpen, handleClose})=> {

  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {
            <Box sx={style}>
          <div className="d-flex justify-content-between">
          <div><h5>Add New Device</h5></div>
          <button onClick={handleClose}>close</button>
          </div>

          <form className='d-block'>  
          <div><label htmlFor="">Device Name</label></div>
          <input type="text" />
          <button>Save More</button>
          </form>
          
        </Box>
    }
    
      </Modal>
    </div>
  );
}

export default FormModal;