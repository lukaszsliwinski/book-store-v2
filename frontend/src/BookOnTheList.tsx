import { useNavigate } from "react-router-dom";
import { IBookData } from "./types";

export default function BookOnTheList({ data } : { data: IBookData }) {
  const navigate = useNavigate();
  const showDetails = () => {
    navigate(`/books/${data.id}`);
  };

  return (
    <ul>
      <li>{data.title}</li>
      <li>{data.authors}</li>
      <li><img src={data.coverUrl} height="150" alt="book cover"/></li>
      <li>{data.price} $</li>
      <button onClick={() => showDetails()}>details</button>
    </ul>
  );
};
