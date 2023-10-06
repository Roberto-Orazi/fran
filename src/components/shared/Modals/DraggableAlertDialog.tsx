import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  styled
} from '@mui/material'
import React from 'react'

interface Props {
  open: boolean
  content: string
  handleOk: any,
  handleClose?: any,
  btnOkTitle?: string
  title: string
  isLoading: boolean
  messageAfterDelete?: string
}

const DraggableDialog = (props: Props) => (
  <Dialog
    open={props.open}
    onClose={props.handleClose}
    PaperComponent={(props) => <Paper {...props} />}
    aria-labelledby="draggable-dialog-title"
  >
    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
      {props.title}
    </DialogTitle>
    <DialogContent>
      {
        (!props.isLoading && !props.messageAfterDelete)
        && (
          <DialogContentText id="alert-dialog-description">
            {props.content}
          </DialogContentText>
        )
      }
      {
        (!props.isLoading && props.messageAfterDelete)
        && (
          <>
            <DialogContentText id="alert-dialog-description">
              {props.messageAfterDelete}
            </DialogContentText>
            <Grid container justifyContent="center">
              <Button
                // fullWidth
                variant="contained"
                color="primary"
                // className={classes.submit}
                onClick={() => props.handleClose()}
              >
                Cerrar
              </Button>
            </Grid>
          </>
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
      (!props.messageAfterDelete && !props.isLoading)
      && (
        <DialogActions>
          <Grid container justifyContent="flex-end">
            <Button autoFocus onClick={props.handleClose} color="primary">
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={props.handleOk}
            >
              {props.btnOkTitle}
            </Button>
          </Grid>
        </DialogActions>
      )
    }
  </Dialog>
)

const CircularProgressContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export default DraggableDialog
