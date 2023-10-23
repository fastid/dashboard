import {Box, Button, Heading} from "@chakra-ui/react";
import {IoHomeOutline} from "react-icons/io5";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

export default function NotFound() {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const goToDashboard = () => navigate('/')

  return (
    <>
    <Box textAlign="center" py={30} px={6}>
      <Heading mb={4}>404 | Page Not Found</Heading>
      <Button size='md' colorScheme='brand' mt='18px' leftIcon={<IoHomeOutline />} onClick={goToDashboard}>
        {t('back_to_dashboard')}
      </Button>
    </Box>
  </>
  )
}
