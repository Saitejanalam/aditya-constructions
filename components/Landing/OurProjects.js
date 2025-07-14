const projectsData = [
  {
    name: "Aditya township",
    price: "₹ 29 Lacks",
    location: "F.k Palam (pitapuram)",
    description: "For More Details",
    image: "/projects/aditya-township.png",
    buttonText: "Click",
  },
  {
    name: "Vasudha township",
    price: "$1800.0",
    location: "Iskcon temple Kakinada ",
    description: "For More Details",
    image: "/projects/vasudha-township.png",
    buttonText: "Click",
  },
  {
    name: "Vaishnavi villas",
    price: "$1800.0",
    location: "Kakinada",
    description:
      "Lorem Ipsum is simply dummy text of the printing and type see more...",
    image: "",
  },
  {
    name: "Kandha Green Valley Humsafar",
    price: "$1800.0",
    location: "Tuni",
    description:
      "Lorem Ipsum is simply dummy text of the printing and type see more...",
    image: "",
  },
  {
    name: "Coconut Gardens Thata Gunta",
    price: "$1800.0",
    location: "Annavaram",
    description:
      "Lorem Ipsum is simply dummy text of the printing and type see more...",
    image: "",
  },
  {
    name: "Amogha Smart City",
    price: "$1800.0",
    location: "Kakinada",
    description:
      "Lorem Ipsum is simply dummy text of the printing and type see more...",
    image: "",
  },
  {
    name: "Fortune City",
    price: "$1800.0",
    location: "Pithapuram",
    description:
      "Lorem Ipsum is simply dummy text of the printing and type see more...",
    image: "",
  },
  {
    name: "Royal Homes",
    price: "$1800.0",
    location: "Banasapadu",
    description:
      "Lorem Ipsum is simply dummy text of the printing and type see more...",
    image: "",
  },
  {
    name: "Harvilo Green Meadows",
    price: "$1800.0",
    location: "Cheprolu Pithapuram",
    description:
      "Lorem Ipsum is simply dummy text of the printing and type see more...",
    image: "",
  },
  {
    name: "Nanda Gokulam",
    price: "$1800.0",
    location: "SRMT Kakinada",
    description:
      "Lorem Ipsum is simply dummy text of the printing and type see more...",
    image: "",
  },
  {
    name: "Sai srinivasam",
    price: "$1800.0",
    location: "Kara kudru Kakinada",
    description:
      "Lorem Ipsum is simply dummy text of the printing and type see more...",
    image: "",
  },
  {
    name: "Sachdeva Gardens",
    price: "$1800.0",
    location: "Mandapam Annavaram",
    description:
      "Lorem Ipsum is simply dummy text of the printing and type see more...",
    image: "",
  },
  {
    name: "Srinivasa garden",
    price: "$1800.0",
    location: "Palacherla Rajahmundry",
    description:
      "Lorem Ipsum is simply dummy text of the printing and type see more...",
    image: "",
  },
  {
    name: "Homes gadala",
    price: "$1800.0",
    location: "Rajahmundry",
    description:
      "Lorem Ipsum is simply dummy text of the printing and type see more...",
    image: "",
  },
  {
    name: " K r r gardens pata",
    price: "$1800.0",
    location: "Bommunuru Rajahmundry",
    description:
      "Lorem Ipsum is simply dummy text of the printing and type see more...",
    image: "",
  },
  {
    name: "Sri chakra nivas ",
    price: "$1800.0",
    location: "Dhavaleswaram Rajahmundry",
    description:
      "Lorem Ipsum is simply dummy text of the printing and type see more...",
    image: "",
  },
];

const OurProjects = () => {
  return (
    <section style={{ padding: "2rem"}}>
      <h2
        style={{
          textAlign: "center",
          color: "#003A80",
          fontSize: "2.3rem",
          fontWeight: "bold",
          marginBottom: "2rem",
        }}
      >
        Our Projects
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "left",
          gap: "2rem",
          margin: "0 180px",
        }}
      >
        {projectsData.map((project, index) => (
          <div
            key={index}
            style={{
              width: "360px",
              backgroundColor: "#eee",
              borderRadius: "16px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Image */}
            <div
              style={{
                height: "180px",
                backgroundColor: "#ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <div style={{ color: "#777", fontSize: "14px" }}>No Image</div>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: "#003A80",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                  }}
                >
                  {project.name}
                </h3>
                <div
                  style={{
                    background: "linear-gradient(to right, #5f0aff, #9d00ff)",
                    color: "white",
                    fontWeight: "bold",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "8px",
                    fontSize: "0.8rem",
                  }}
                >
                  {project.price}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <img
                  src="/icons/pin.png"
                  alt="location"
                  style={{ width: "16px", marginRight: "0.4rem" }}
                />
                <span style={{ fontSize: "0.9rem", color: "#333" }}>
                  {project.location}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#333",
                    minHeight: "3rem",
                  }}
                >
                  {project.description}
                </p>
                {project.description === "For More Details" && (
                  <button
                    style={{
                      background: "linear-gradient(to right, #5f0aff, #9d00ff)",
                      color: "white",
                      border: "none",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "0.85rem",
                      float: "right",
                    }}
                  >
                    {project.buttonText}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurProjects;
