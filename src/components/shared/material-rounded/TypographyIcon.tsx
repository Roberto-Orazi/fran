import { Box, Typography, TypographyProps } from '@mui/material'

interface TypographyIconProps extends TypographyProps {
  startIcon?: any
  endIcon?: any
}

export const TypographyIcon = ({
  startIcon: StartIcon,
  endIcon: EndIcon,
  ...props
}: TypographyIconProps) => (
  <Box sx={{
    display: 'flex',
    alignItems: 'center',
  }}>
    {
      StartIcon && <StartIcon />
    }
    <Typography {...props}>{props.children}</Typography>
    {
      EndIcon && <EndIcon />
    }
  </Box>
)
