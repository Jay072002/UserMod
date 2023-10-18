import { Container } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";
import { MyContext } from "../context/context";
import toast from "react-hot-toast";

const Home = () => {
  const cellPadding = "10px"; // Adjust the padding value as needed\
  const { isLogin, loggedInUser, setAddUserButtonFlag } = useContext(MyContext);

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/user", {
        withCredentials: true,
      });

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch all the users when component mounts
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
    fetchUsers();
  }, [isLogin]);

  const handleDelete = async (item) => {
    try {
      await axios.delete(`/user/${item._id}`, { withCredentials: true });

      setUsers((prevUsers) =>
        prevUsers.filter((user) => {
          return user._id !== item._id;
        })
      );
      return toast.success("User Deleted!");
    } catch (error) {
      console.log(error);
      return toast.error("Something Went Wrong!");
    }
  };

  return (
    <Container p={"30px"}>
      <Container>
        <Container
          display={"flex"}
          flexDir={"row-reverse"}
          mr={"142px"}
          p={"20px"}
        >
          {loggedInUser.isAdmin ? (
            <Link to={"/adduserinfo"}>
              <Button
                p={"5px 10px"}
                cursor={"pointer"}
                onClick={() => {
                  setAddUserButtonFlag(true);
                  navigate("/adduserinfo");
                }}
              >
                Add User
              </Button>
            </Link>
          ) : null}
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
              {users?.map((item, index) => {
                return (
                  <Tr key={item?._id}>
                    <Td
                      borderRight="1px solid black"
                      padding={cellPadding}
                      textAlign={"center"}
                    >
                      {index + 1}
                    </Td>
                    <Td
                      borderRight="1px solid black"
                      padding={cellPadding}
                      textAlign={"center"}
                    >
                      {item?.firstName + " " + item?.lastName || "-"}
                    </Td>
                    <Td
                      borderRight="1px solid black"
                      padding={cellPadding}
                      textAlign={"center"}
                    >
                      {item?.email || "-"}
                    </Td>
                    <Td
                      borderRight="1px solid black"
                      padding={cellPadding}
                      textAlign={"center"}
                    >
                      {item?.phoneNumber || "-"}
                    </Td>
                    {loggedInUser._id == item._id || loggedInUser?.isAdmin ? (
                      <Td
                        borderWidth="1px"
                        padding={cellPadding}
                        textAlign={"center"}
                      >
                        <Button
                          cursor={"pointer"}
                          mr={"3px"}
                          onClick={() =>
                            navigate(`/updateuserinfo/${item?._id}`)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(item)}
                          cursor={"pointer"}
                        >
                          Delete
                        </Button>
                      </Td>
                    ) : null}
                  </Tr>
                );
              })}

              {/* Add more rows as needed */}
            </Tbody>
          </Table>
        </Container>
      </Container>
    </Container>
  );
};

export default Home;
