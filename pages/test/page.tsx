import dataURLtoBlob from "@/utils/blob";
import axios from "axios";
import Image from "next/image";

import React, { ChangeEvent, useState } from "react";

const Page = () => {
  const [result, setResult] = useState<string[]>([]);

  function uploadImage(event: ChangeEvent<any>) {
    if (event.target.files) {
      const file = event.target.files[0];
      const blob = new Blob([file], { type: file.type });

      setResult([]);
      post(blob);
    }
  }

  const post = (blob: Blob) => {
    const url = `${process.env.NEXT_PUBLIC_GCP_API_URL}/extract` as string;
    const formData = new FormData();

    formData.append("file", blob);

    axios
      .post(url, formData)
      .then((res) => {
        if (res.data.faces) {
          const faces = res.data.faces.map((image: string) => {
            return "data:image/jpeg;base64," + image;
          });
          setResult(faces);
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
