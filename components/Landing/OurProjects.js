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
    <section className="py-8 px-8">
      <h2 className="text-center text-[#003A80] text-3xl font-bold mb-8">Our Projects</h2>

      <div className="flex flex-wrap justify-start gap-8 mx-[180px]">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className="w-[360px] bg-gray-200 rounded-2xl overflow-hidden flex flex-col justify-between"
          >
            {/* Image */}
            <div className="h-[180px] bg-gray-300 flex items-center justify-center">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-gray-500 text-sm">No Image</div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="m-0 text-[#003A80] text-base font-bold">{project.name}</h3>
                <div className="bg-gradient-to-r from-[#5f0aff] to-[#9d00ff] text-white font-bold px-2 py-1 rounded-lg text-xs">
                  {project.price}
                </div>
              </div>

              <div className="flex items-center mb-2">
                <img
                  src="/icons/pin.png"
                  alt="location"
                  className="w-4 mr-2"
                />
                <span className="text-sm text-[#333]">{project.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-[#333] min-h-[3rem]">{project.description}</p>
                {project.description === "For More Details" && (
                  <button
                    className="bg-gradient-to-r from-[#5f0aff] to-[#9d00ff] text-white border-none px-3 py-2 rounded-lg cursor-pointer font-bold text-sm float-right"
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
