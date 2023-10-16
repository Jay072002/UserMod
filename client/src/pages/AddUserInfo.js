import {
  Button,
  Container,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import UserProfile from "../Components/UserProfile";
import UserAddress from "../Components/UserAddress";
import { MyContext } from "../context/context";

const AddUserInfo = () => {
  const [tabFlag, setTabFlag] = useState(true);
  const { userProfile, setUserProfile, accordionItems } = useContext(MyContext);

  // handle submit
  const handleSubmit = () => {
    // hit the
  };

  console.log(accordionItems);

  return (
    <Container h={"80vh"} p={"15px"}>
      <Container p={"40px 100px"}>
        <Tabs position="relative" variant="unstyled">
          <TabList>
            <Tab
              p={"6px"}
              mr={"10px"}
              w={"7rem"}
              cursor={"pointer"}
              onClick={() => {
                setTabFlag(true);
              }}
              style={{
                background: tabFlag ? null : "none", // If tabFlag is true, set the background to none
              }}
            >
              Profile
            </Tab>
            <Tab
              onClick={() => {
                setTabFlag(false);
              }}
              cursor={"pointer"}
              w={"7rem"}
              style={{
                background: tabFlag ? "none" : null, // If tabFlag is true, set the background to none
              }}
            >
              {" "}
              Addresses
            </Tab>
          </TabList>
        </Tabs>
      </Container>

      {/* conditional rendering according to tab */}
      {tabFlag ? <UserProfile /> : <UserAddress />}

      <Container p={"20px"} display={"flex"} flexDir={"row-reverse"}>
        <Button
          onClick={handleSubmit}
          p={"4px 18px"}
          cursor={"pointer"}
          mr={"163px"}
        >
          submit
        </Button>
      </Container>
    </Container>
  );
};

export default AddUserInfo;
