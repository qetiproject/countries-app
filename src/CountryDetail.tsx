import { useParams } from "react-router-dom";

export default function CountryDetail() {
  const { name } = useParams();
  console.log(name);
  return <div>CountryDetail</div>;
}
