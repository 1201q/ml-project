import dataURLtoBlob from "@/utils/blob";
import axios from "axios";
import Image from "next/image";

import React, { ChangeEvent, useState } from "react";

const Page = () => {
  const [result, setResult] = useState<string[]>([]);

  const url = process.env.NEXT_PUBLIC_GCP_API_URL as string;

  function uploadImage(event: ChangeEvent<any>) {
    if (event.target.files) {
      const file = event.target.files[0];
      const blob = new Blob([file], { type: file.type });
      setResult([]);
      post(blob);
    }
  }

  const post = (blob: Blob) => {
    const formData = new FormData();
    let array: string[] = [];
    formData.append("file", blob);
    axios
      .post(`${url}/extract`, formData)
      .then((res) => {
        if (res.data.faces) {
          res.data.faces.map((image: string) => {
            const data = "data:image/jpeg;base64," + image;
            array.push(data);
          });
          setResult(array);
        } else {
          setResult([]);
        }

        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <input type="file" onChange={uploadImage} />

      {result.map((image, index) => (
        <Image
          src={image}
          alt={`image-${index}`}
          width={100}
          height={100}
          key={`image-${index}`}
        />
      ))}
    </div>
  );
};

export default Page;
