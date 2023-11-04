import {Box, CircularProgress} from "@chakra-ui/react";

export const Loader = () => {
  return (
    <Box textAlign="center" py={30} px={6}>
      <CircularProgress isIndeterminate color='blue.300'/>
    </Box>
  )
}
