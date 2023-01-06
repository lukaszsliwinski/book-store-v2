import { IBookData } from "./types";

export default function BookOnTheList({ data } : { data: IBookData }) {
  return (
    <ul>
      <li>{data.title}</li>
      <li>{data.authors}</li>
      <li><img src={data.imgSrc} height="150"/></li>
      <li>{data.price} $</li>
    </ul>
  );
};
