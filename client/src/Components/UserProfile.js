import { Container, Grid, GridItem, Input } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/context";
import { useLocation } from "react-router-dom";

const UserProfile = () => {
  const [addFlag, setAddFlag] = useState(true);

  const { userProfile, setUserProfile, setAccordianItems } =
    useContext(MyContext);

  const gridItemStyle = {
    margin: "7px",
    backgroundColor: "#D9D9D9",
    padding: "10px",
  };

  const location = useLocation();

  const { pathname } = location;

  useEffect(() => {
    if (pathname?.includes("update")) {
      setAddFlag(false);
    }
  }, []);

  const handleInputChange = (field, value) => {
    // Create a new object with the updated value and set the entire state
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };
  return (
    <Container
      p={"30px"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={"30px"}
    >
      <Grid
        w={"70vw"}
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={20}
      >
        <GridItem style={gridItemStyle}>
          <Input
            onChange={(e) => {
              handleInputChange("firstName", e.target.value);
            }}
            value={userProfile?.firstName}
            placeholder="First Name"
          />
        </GridItem>
        <GridItem style={gridItemStyle}>
          <Input
            onChange={(e) => {
              handleInputChange("lastName", e.target.value);
            }}
            value={userProfile?.lastName}
            placeholder="Last Name"
          />
        </GridItem>
        <GridItem style={gridItemStyle}>
          <Input
            onChange={(e) => {
              handleInputChange("email", e.target.value);
            }}
            value={userProfile?.email}
            placeholder="Email"
          />
        </GridItem>
        {addFlag ? (
          <GridItem style={gridItemStyle}>
            <Input
              onChange={(e) => {
                handleInputChange("password", e.target.value);
              }}
              value={userProfile?.password}
              placeholder="Password"
            />
          </GridItem>
        ) : null}

        <GridItem style={gridItemStyle}>
          <input
            type="number"
            maxLength="10"
            onChange={(e) => {
              handleInputChange("phoneNumber", e.target.value);
            }}
            value={userProfile?.phoneNumber}
            placeholder="Phone Number"
          />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default UserProfile;
