import React from 'react'
import { useColorMode, Button } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Button onClick={toggleColorMode} size="md" position="absolute" top="4" right="4">
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}

export default DarkModeToggle
