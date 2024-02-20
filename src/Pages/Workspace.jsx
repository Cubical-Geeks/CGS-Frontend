import React, { useEffect, useState } from "react";
import Dashboard from "../Components/Dashboard";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import { CiCircleInfo } from "react-icons/ci";
import Footer from "../Components/Footer";
import { GoProjectRoadmap } from "react-icons/go";
import { MdIncompleteCircle } from "react-icons/md";
import { PiExamFill } from "react-icons/pi";
import { GiProgression } from "react-icons/gi";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";
import { useDrop, useDrag } from "react-dnd";
import WithAuth from "../Components/WithAuth";

const Workspace = () => {
  const cardInfo = [
    {
      heading: "To be alloted",
      path: "/Workspace/Alloted",
      image: <GoProjectRoadmap size={28} />,
    },
    {
      heading: "In Progress",
      path: "/Workspace/Progress",
      image: <GiProgression size={28} />,
    },
    {
      heading: "In Review",
      path: "/Workspace/Interview",
      image: <PiExamFill size={28} />,
    },
    {
      heading: "Completed",
      path: "/Workspace/Completed",
      image: <MdIncompleteCircle size={28} />,
    },
  ];

  const [inProgressItems, setInProgressItems] = useState([]);
  const [toBeAllotedItems, setToBeAllotedItems] = useState([]);
  const [InReviewItems, setInReviewItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [update, setUpdate] = useState(false);

  const handleOnDrag = (e, section, projectData) => {
    e.dataTransfer.setData("section", section);
    e.dataTransfer.setData("projectData", JSON.stringify(projectData));
  };

  const handleOnDrop = (e, targetSection) => {
    console.log(completedItems);
    const sourceSection = e.dataTransfer.getData("section");
    const projectData = JSON.parse(e.dataTransfer.getData("projectData"));

    const updatedSourceSection = geUpdatedSourceSection(
      sourceSection,
      projectData
    );

    const updatedTargetSection = getUpdatedTargetSection(
      targetSection,
      projectData
    );

    updateSectionState(sourceSection, updatedSourceSection);
    updateSectionState(targetSection, updatedTargetSection);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const geUpdatedSourceSection = (section, projectData) => {
    return sectionDataMap[section].filter(
      (item) => item.title !== projectData.title
    );
  };

  const getUpdatedTargetSection = (section, projectData) => {
    // console.log(section)
    // console.log(projectData)
    return [...sectionDataMap[section], projectData];
  };

  useEffect(() => {
    console.log("completedItems updated:", completedItems);
  }, [completedItems]);

  const updateSectionState = (section, updatedSectionData) => {
    switch (section) {
      case "toBeAlloted":
        setToBeAllotedItems((prevItems) => updatedSectionData);
        break;

      case "inProgress":
        setInProgressItems((prevItems) => updatedSectionData);
        break;

      case "inReview":
        setInReviewItems((prevItems) => updatedSectionData);
        break;

      case "completed":
        console.log("completed working");
        console.log("UdatedSectionData", updatedSectionData);
        setCompletedItems((prevItems) => {
          console.log("completedItems", prevItems);
          return updatedSectionData;
        });
        break;

      default:
        break;
    }
  };

  const sectionDataMap = {
    toBeAlloted: toBeAllotedItems,
    inProgress: inProgressItems,
    inReview: InReviewItems,
    completed: completedItems,
  };

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchingProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/projects/get"
        );
        setProjects(response.data.data[0]);
        console.log(response.data.data[0]);
      } catch (error) {
        console.log("Error in fetching projects ", error);
      }
    };

    fetchingProjects();
  }, []);

  const Grid = ({ children }) => {
    const [, drop] = useDrop({
      accept: "PROJECT",
      drop: (item) => console.log("Dropped:", item),
    });

    return (
      <div
        ref={drop}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "0.5rem",
          padding: "1rem",
          border: "1px solid black",
        }}
      >
        {children}
      </div>
    );
  };

  const Project = ({ name }) => {
    const [{ isDragging }, drag] = useDrag({
      item: { type: "PROJECT", name },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    return (
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: "move",
          border: "1px dashed gray",
          padding: "0.5rem",
          marginBottom: "0.5rem",
          backgroundColor: "white",
        }}
      >
        {name}
      </div>
    );
  };

  return (
    <>
      <div className="flex">
        <div>
          <Dashboard />
        </div>
        <div className="container flex flex-col justify-between">
          <div>
            <Navbar />
            <div className="pt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 px-5 text-white">
                {cardInfo.map((item, index) => (
                  <div key={index}>
                    {item.heading === "To be alloted" && (
                      <div>
                        {/* <Link to={item.path}>
        </Link> */}
                        <div className="rounded-lg p-2 bg-red-500 flex justify-between items-center">
                          <h3 className="text-xl">{item.heading}</h3>
                          <div>
                            <div className="opacity-50">{item.image}</div>
                          </div>
                        </div>

                        <div className="py-5">
                          {projects.map((item2, index2) => (
                            <Link to={`/ProjectDetails/:${item2.id}`}>
                              <div
                                key={index2}
                                className="border rounded-lg p-3 shadow-lg mb-4 text-black bg-slate-200"
                                draggable
                                onDragStart={(e) =>
                                  handleOnDrag(e, "toBeAlloted", item2)
                                }
                              >
                                <h3 className="text-xl font-bold mb-2">
                                  {item2.title}
                                </h3>
                                <h3 className="mb-2">
                                  Client: {item2.clientName}
                                </h3>
                                <h3 className="mb-2">
                                  <span className="font-semibold text-red-500">
                                    Deadline:
                                  </span>{" "}
                                  {item2.deleiveryDate}
                                </h3>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    {item.heading === "In Progress" && (
                      <div>
                        {/* <Link to={item.path}>
        </Link> */}
                        <div
                          className="rounded-lg p-2 bg-orange-500 flex justify-between items-center"
                          onDrop={(e) => handleOnDrop(e, "inProgress")}
                          onDragOver={handleDragOver}
                        >
                          <h3 className="text-xl">{item.heading}</h3>
                          <div>
                            <div className="opacity-50">{item.image}</div>
                          </div>
                        </div>
                        <div className="py-5">
                          {inProgressItems.map((item2, index2) => (
                            <Link to={`/ProjectDetails/:${item2.userID}`}>
                              <div
                                key={index2}
                                className="border rounded-lg p-3 shadow-lg mb-4 text-black bg-slate-200"
                                draggable
                                onDragStart={(e) =>
                                  handleOnDrag(e, "inProgress", item2)
                                }
                              >
                                <h3 className="text-xl mb-2">{item2.title}</h3>
                                <h3 className="text-xl mb-2">{item2.Name}</h3>
                                <h3 className="text-xl mb-2">
                                  {item2.deadline}
                                </h3>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    {item.heading === "Completed" && (
                      <div>
                        {/* <Link to={item.path}>
        </Link> */}
                        <div
                          className="rounded-lg p-2 bg-green-500 flex justify-between items-center"
                          onDrop={(e) => handleOnDrop(e, "completed")}
                          onDragOver={handleDragOver}
                        >
                          <h3 className="text-xl">{item.heading}</h3>
                          <div>
                            <div className="opacity-50">{item.image}</div>
                          </div>
                        </div>
                        <div className="py-5">
                          {completedItems.map((item2, index2) => (
                            <Link to={`/ProjectDetails/:${item2.userID}`}>
                              <div
                                key={index2}
                                className="border rounded-lg p-3 shadow-lg mb-4 text-black bg-slate-200"
                              >
                                <h3 className="text-xl mb-2">{item2.title}</h3>
                                <h3 className="text-xl mb-2">{item2.Name}</h3>
                                <h3 className="text-xl mb-2">
                                  {item2.deadline}
                                </h3>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    {item.heading === "In Review" && (
                      <div>
                        {/* <Link to={item.path}>
        </Link> */}
                        <div
                          className="rounded-lg p-2 bg-yellow-500 flex justify-between items-center"
                          onDrop={(e) => handleOnDrop(e, "inReview")}
                          onDragOver={handleDragOver}
                        >
                          <h3 className="text-xl">{item.heading}</h3>
                          <div>
                            <div className="opacity-50">{item.image}</div>
                          </div>
                        </div>
                        <div className="py-5">
                          {InReviewItems.map((item2, index2) => (
                            <Link to={`/ProjectDetails/:${item2.userID}`}>
                              <div
                                key={index2}
                                className="border rounded-lg p-3 shadow-lg mb-4 text-black bg-slate-200"
                                draggable
                                onDragStart={(e) =>
                                  handleOnDrag(e, "inReview", item2)
                                }
                              >
                                <h3 className="text-xl mb-2">{item2.title}</h3>
                                <h3 className="text-xl mb-2">{item2.Name}</h3>
                                <h3 className="text-xl mb-2">
                                  {item2.deadline}
                                </h3>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default WithAuth(Workspace);
