import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function RepInfo() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
        <Button onClick={handleOpen} sx={{
            backgroundColor: '#000000',
            width: '140px',
            padding: '8px',
            float: 'left',
            marginLeft: '16px'
        }}>
          Rep Range
        </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="rep-modal"
        aria-describedby="rep-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            padding: 4,
            backgroundColor: '#131416',
            color: 'white'
          }}
        >
          <Typography id="InfoHeader" variant="h6" component="h3">
            Strength Rep Range
          </Typography>
          <Typography id="InfoBody" sx={{ mt: 2 }}>
            <b>Higher Weight:</b> 5 sets of 5-6 reps
            <br/>
            <br/>
            <b>Lower Weight:</b> 3 sets 8-15 reps
            <br/>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
