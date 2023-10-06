import { Dialog, DialogContent } from '@mui/material'
import React from 'react'

interface Props {
  open: boolean
  handleClose?: any,
}

export default function AlertDialog(props: Props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent />
    </Dialog>
  )
}
