import {
  Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled
} from '@mui/material'
import React from 'react'

interface Props {
  open: boolean
  content: string
  handleOk: any,
  handleClose?: any,
  btnOkTitle?: string,
  isLoading: boolean
}

export default function AlertDialog(props: Props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.isLoading ? 'Cerrando sesion...' : 'Cerrar sesion'}</DialogTitle>
      <DialogContent>
        {
          !props.isLoading
          && (
            <DialogContentText id="alert-dialog-description">
              {props.content}
            </DialogContentText>
          )
        }
        {
          props.isLoading
          && (
            <CircularProgressContainer>
              <CircularProgress />
            </CircularProgressContainer>
          )
        }
      </DialogContent>
      {
        !props.isLoading
        && (
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={props.handleOk} color="primary" autoFocus>
              {props.btnOkTitle}
            </Button>
          </DialogActions>
        )
      }
    </Dialog>
  )
}

const CircularProgressContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})
