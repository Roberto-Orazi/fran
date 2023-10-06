import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Stack,
  Typography,
} from '@mui/material'
import { useHistory, useLocation } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Close } from '@mui/icons-material'
import { ELinks } from '../routes/links'

const links = [
  { label: 'Inicio', path: ELinks.home },
  { label: 'Apartamentos', path: ELinks.apartments },
  { label: 'Autos', path: ELinks.cars },
  { label: 'Autos Agencia', path: ELinks.agencyCars },
  { label: 'Gestoria', path: ELinks.agencyProcedure }
]

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null)
  const location = useLocation()
  const history = useHistory()

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProfileAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null)
  }

  const goToPath = (path: string) => {
    history.push(path)
    setMobileMenuOpen(false)
  }

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#fff', marginTop: '0' }} >
      <Toolbar>
        <IconButton
          sx={{ color: '#000' }}
          onClick={() => setMobileMenuOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={handleProfileMenuOpen}
          sx={{ marginLeft: 'auto', marginRight: '1em' }}
        >
          <AccountCircleIcon sx={{ color: '#0077b6' }} />
        </IconButton>
        <Menu
          anchorEl={profileAnchorEl}
          open={Boolean(profileAnchorEl)}
          onClose={handleProfileMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleProfileMenuClose}>Account Settings</MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>Log Off</MenuItem>
        </Menu>
      </Toolbar>
      {
        mobileMenuOpen
        && <Box sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'white',
          position: 'fixed',
          zIndex: 10
        }}>
          <Close
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              color: 'black',
              position: 'absolute',
              top: '1rem',
              left: '1rem'
            }}
          />
          <Stack gap={3} sx={{ textAlign: 'center' }}>
            {
              links.map((link) => (
                <Typography
                  sx={{
                    color: location.pathname.includes(link.path) ? 'red' : 'black',
                    '&:hover': {
                      cursor: 'pointer',
                    }
                  }}
                  variant='body1'
                  onClick={() => goToPath(link.path)}
                >
                  {link.label}
                </Typography>
              ))
            }
          </Stack>

        </Box>
      }
    </AppBar >
  )
}

export default Navbar
