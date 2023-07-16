// import React from "react";
export const nameValidation = (name: string): string => {
  const re = new RegExp(/^[\u0600-\u06FF\s]{3,20}$/);
  const isvalid = re.test(name);
  return isvalid ? '' : 'نام فیلم حداقل ۳ حرف داشته باشد';
};

export const productionDateValidation = (date: string): string => {
  const re = new RegExp(/^[\u06F0-\u06F9]{4}\/[0-9]{4}$/);
  const isvalid = re.test(date);
  return isvalid ? '' : 'سال ساخت صحیح وارد کنید.مثال:(۱۳۹۵/2011)';
};

type Props = {
  e?: React.ChangeEvent<HTMLSelectElement>;
  genre?: string;
};

export const genreValidation = ({ e, genre }: Props) => {
  let isValid;
  let selectedGenre;
  console.log(genre);
  e ? (selectedGenre = e.target.value) : (selectedGenre = genre);
  selectedGenre === 'ژانر' || selectedGenre === ''
    ? (isValid = false)
    : (isValid = true);
  return isValid ? '' : 'ژانر را انتخاب کنید';
};
export const directorValidation = (director: string): string => {
  const re = new RegExp(/^[\u0600-\u06FF\s]{3,20}$/);
  const isvalid = re.test(director);
  return isvalid ? '' : 'نام کارگردان حداقل ۳ حرف داشته باشد';
};

export const descriptionValidation = (description: string): string => {
  const re = new RegExp(/^[\u0600-\u06FF\s]{10,120}$/);
  const isvalid = re.test(description);
  return isvalid ? '' : 'توضیحات باید حداقل از ۱۰ حرف تشکیل شده باشد';
};
