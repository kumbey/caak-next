function CardsWrapper({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        maxHeight: "168px",
        overflowY: "scroll",
      }}
    >
      {children}
    </div>
  );
}
export default CardsWrapper