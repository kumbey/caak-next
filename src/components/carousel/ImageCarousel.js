const ImageCarousel = ({ children }) => {
  return (
    <div className={"relative h-full w-full overflow-hidden"}>
      <div className={"flex flex-nowrap flex-row items-center h-full w-full"}>
        {children}
      </div>
    </div>
  );
};

export default ImageCarousel;
