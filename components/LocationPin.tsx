import SportsBarIcon from "@mui/icons-material/SportsBar";

function LocationPin({
  text,
  lat,
  lng,
}: {
  text: string;
  lat: string;
  lng: string;
}) {
  return (
    <div
      style={{
        border: '1px solid white',
        borderRadius: '50%',
        height: 10,
        width: 10,
        backgroundColor: 'blue',
        cursor: 'pointer',
        zIndex: 10,
      }}
    / >
  );
}
export default LocationPin;
