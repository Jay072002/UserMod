import { Container, Grid, GridItem, Input } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { MyContext } from "../context/context";

const UserProfile = () => {
  const { userProfile, setUserProfile } = useContext(MyContext);

  const gridItemStyle = {
    margin: "7px",
    backgroundColor: "#D9D9D9",
    padding: "10px",
  };

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
