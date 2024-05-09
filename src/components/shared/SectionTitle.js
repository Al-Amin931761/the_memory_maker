const SectionTitle = ({ title, icon = "" }) => {
  return (
    <div>
      <h1 className="text-center mb-3 fw-bold second-font ">
        {icon} {title} {icon}
      </h1>
    </div>
  );
};

export default SectionTitle;
