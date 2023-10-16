import { Container } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  const cellPadding = "10px"; // Adjust the padding value as needed

  return (
    <Container p={"30px"}>
      <Container>
        <Container
          display={"flex"}
          flexDir={"row-reverse"}
          mr={"142px"}
          p={"20px"}
        >
          <Link to={"/adduserinfo"}>
            <Button p={"5px 10px"} cursor={"pointer"}>
              Add User
            </Button>
          </Link>
        </Container>
        <Container
          p={"10px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Table
            w={"70vw"}
            border={"1px solid black"}
            variant="striped"
            colorScheme="teal"
            borderWidth="2px"
          >
            <Thead>
              <Tr>
                <Th borderRight="1px solid black" padding={cellPadding}>
                  Sr.No
                </Th>
                <Th borderRight="1px solid black" padding={cellPadding}>
                  Name
                </Th>
                <Th borderRight="1px solid black" padding={cellPadding}>
                  Email
                </Th>
                <Th borderRight="1px solid black" padding={cellPadding}>
                  Phone Number
                </Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td borderRight="1px solid black" padding={cellPadding}>
                  1
                </Td>
                <Td borderRight="1px solid black" padding={cellPadding}>
                  John Doe
                </Td>
                <Td borderRight="1px solid black" padding={cellPadding}>
                  johndoe@example.com
                </Td>
                <Td borderRight="1px solid black" padding={cellPadding}>
                  9558423323
                </Td>
                <Td borderWidth="1px" padding={cellPadding}>
                  <Button cursor={"pointer"} mr={"3px"}>
                    Edit
                  </Button>
                  <Button cursor={"pointer"}>Delete</Button>
                </Td>
              </Tr>
              <Tr>
                <Td borderRight="1px solid black" padding={cellPadding}>
                  1
                </Td>
                <Td borderRight="1px solid black" padding={cellPadding}>
                  John Doe
                </Td>
                <Td borderRight="1px solid black" padding={cellPadding}>
                  johndoe@example.com
                </Td>
                <Td borderRight="1px solid black" padding={cellPadding}>
                  9558423323
                </Td>
                <Td borderWidth="1px" padding={cellPadding}>
                  <Button cursor={"pointer"} mr={"3px"}>
                    Edit
                  </Button>
                  <Button cursor={"pointer"}>Delete</Button>
                </Td>
              </Tr>
              <Tr>
                <Td borderRight="1px solid black" padding={cellPadding}>
                  1
                </Td>
                <Td borderRight="1px solid black" padding={cellPadding}>
                  John Doe
                </Td>
                <Td borderRight="1px solid black" padding={cellPadding}>
                  johndoe@example.com
                </Td>
                <Td borderRight="1px solid black" padding={cellPadding}>
                  9558423323
                </Td>
                <Td borderWidth="1px" padding={cellPadding}>
                  <Button cursor={"pointer"} mr={"3px"}>
                    Edit
                  </Button>
                  <Button cursor={"pointer"}>Delete</Button>
                </Td>
              </Tr>

              {/* Add more rows as needed */}
            </Tbody>
          </Table>
        </Container>
      </Container>
    </Container>
  );
};

export default Home;
