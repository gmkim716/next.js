"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function ImagePicker({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  const imageInput = useRef<HTMLInputElement>(null);

  const [pickedImage, setPickedImage] = useState<string | null>(null);

  function handlePickClick() {
    if (!imageInput.current) {
      return;
    }
    imageInput.current.click();
  }

  function handleImageChange(event: any) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const fileReader = new FileReader(); // FileReader: 파일을 읽을 수 있는 객체

    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        setPickedImage(fileReader.result);
      }
    };

    fileReader.readAsDataURL(file); // readAsDataURL: 파일을 읽어서 base64 인코딩된 문자열로 반환
  }

  return (
    <div className={classes.picker}>
      {/* htmlfor: 레이블과 연결된 양식 컨트롤의 ID */}
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user"
              fill
            />
          )}
        </div>

        <input
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept=".png, .jpeg"
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
