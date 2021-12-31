const Stepper2 = ({ currentStep, maxStep, bgColor }) => {
  return (
    <div
      className="w-full mt-1 relative bg-caak-titaniumwhite"
      style={{ height: "4px" }}
    >
      <div
        className={`h-full transition-all duration-700 ${bgColor}`}
        style={{ width: `${(currentStep / maxStep) * 100}%` }}
      ></div>
    </div>
  );
};

export default Stepper2;
