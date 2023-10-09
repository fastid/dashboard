import {Box, CircularProgress} from "@chakra-ui/react";

export default function Loader() {
  return (
    <Box textAlign="center" py={30} px={6}>
      <CircularProgress isIndeterminate color='blue.300' />
    </Box>
  )
}
