import { useSubmit } from '../hooks/useSubmit';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  nameValidation,
  productionDateValidation,
  genreValidation,
  directorValidation,
  descriptionValidation,
} from '../lib/validations';
import Input from './Input';
import Select from './Select';
import TextArea from './TextArea';
import Button from './Button';
import axios from 'axios';
import { useData } from '../hooks/useData';
import { useEdit } from '../hooks/useEdit';

const Form = () => {
  const { state, dispatch } = useSubmit();
  const [formValid, setFormValid] = useState(false);
  const { dataState, dataDispatch } = useData();
  const { isEditing, setIsEditing } = useEdit();

  useEffect(() => {
    const valid =
      state.name.error === '' &&
      state.name.value !== '' &&
      state.genre.error === '' &&
      state.genre.value !== '' &&
      state.director.error === '' &&
      state.director.value !== '' &&
      state.productionDate.error === '' &&
      state.productionDate.value !== '';
    setFormValid(valid);
  }, [state]);
  const notify = () => {
    toast.success('با موفقیت اضافه شد', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const notifyEdit = () => {
    toast.info('با موفقیت ویرایش شد', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  // ................handleSubmit...............
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValid) {
      if (isEditing === false) {
        axios.post(
          'http://localhost:5000/movies',
          {
            name: state.name.value,
            genre: state.genre.value,
            director: state.director.value,
            producedDate: state.productionDate.value,
            description: state.description.value,
          },

          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        dataDispatch({
          type: 'Post_data',
          payload: {
            id: crypto.randomUUID(),
            name: state.name.value,
            genre: state.genre.value,
            director: state.director.value,
            producedDate: state.productionDate.value,
            description: state.description.value,
          },
        });
        notify();
        dispatch({
          type: 'Reset_the_form',
          payload: {
            name: {
              value: '',
              error: '',
            },
            genre: {
              value: '',
              error: '',
            },
            director: {
              value: '',
              error: '',
            },
            productionDate: {
              value: '',
              error: '',
            },
            description: {
              value: '',
              error: '',
            },
          },
        });
      } else {
        dataDispatch({
          type: 'Update_value',
          payload: {
            id: state.id,
            name: state.name.value,
            genre: state.genre.value,
            director: state.director.value,
            producedDate: state.productionDate.value,
            description: state.description.value,
          },
        });
        notifyEdit();
        dispatch({
          type: 'Reset_the_form',
          payload: {
            name: {
              value: '',
              error: '',
            },
            genre: {
              value: '',
              error: '',
            },
            director: {
              value: '',
              error: '',
            },
            productionDate: {
              value: '',
              error: '',
            },
            description: {
              value: '',
              error: '',
            },
          },
        });
        setIsEditing(false);
      }
    } else {
      dispatch({
        type: 'Name_is_valid',
        payload: {
          value: state.name.value,
          error: nameValidation(state.name.value),
        },
      });

      dispatch({
        type: 'Genre_is_valid',
        payload: {
          value: state.genre.value,
          error: genreValidation({ genre: state.genre.value }),
        },
      });
      dispatch({
        type: 'Director_is_valid',
        payload: {
          value: state.director.value,
          error: directorValidation(state.director.value),
        },
      });
      dispatch({
        type: 'Production_Date_is_valid',
        payload: {
          value: state.productionDate.value,
          error: productionDateValidation(state.productionDate.value),
        },
      });
      dispatch({
        type: 'Description_is_valid',
        payload: {
          value: state.description.value,
          error: descriptionValidation(state.description.value),
        },
      });
    }
  };
  // .................handleReset...............
  const handleReset = (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    dispatch({
      type: 'Reset_the_form',
      payload: {
        value: '',
        error: '',
      },
    });
  };
  // .................hanndleChangeName...........
  const handleChangeName = (value: string) => {
    dispatch({
      type: 'Name_is_valid',
      payload: { value: value, error: nameValidation(value) },
    });
  };
  // ...................handleChangeDirector.........
  const handleChangeDirector = (value: string) => {
    dispatch({
      type: 'Director_is_valid',
      payload: { value: value, error: directorValidation(value) },
    });
  };
  // ...................handleChangeGenre...........
  const handleChangeGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e);
    const selectedValue = e.target.value;
    dispatch({
      type: 'Genre_is_valid',
      payload: {
        value: selectedValue,
        error: genreValidation({ e: e }),
      },
    });
  };
  // ....................handleChangeProducedDate........
  const handleChangeProducedDate = (value: string) => {
    dispatch({
      type: 'Production_Date_is_valid',
      payload: {
        value: value,
        error: productionDateValidation(value),
      },
    });
  };
  // ....................handleChangeDescription.........
  const handleChangeDescription = (value: string) => {
    dispatch({
      type: 'Description_is_valid',
      payload: {
        value: value,
        error: descriptionValidation(value),
      },
    });
  };
  ////////////////////////////////////////////////////////

  return (
    <form
      onReset={handleReset}
      className="flex flex-col w-full px-7 gap-5 justify-between sm:flex-row sm:px-16 sm:gap-16"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-8 sm:flex-row sm:w-1/2">
        <div className="sm:w-1/2 flex flex-col gap-8">
          <Input
            type="text"
            lable="نام فیلم"
            name="userName"
            placeholder="نام فیلم را وارد کنید"
            value={state.name.value}
            error={state.name.error}
            onChange={handleChangeName}
          />
          <Input
            type="text"
            lable="کارگردان"
            name="director"
            placeholder="نام کارگردان را وارد کنید"
            value={state.director.value}
            error={state.director.error}
            onChange={handleChangeDirector}
          />
        </div>
        <div className="sm:w-1/2 flex flex-col gap-8">
          <Select
            options={['علمی/تخیلی', 'طنز/کمدی', 'وحشت/هیجانی']}
            error={state.genre.error}
            selectName="ژانر فیلم"
            onChange={handleChangeGenre}
            value={state.genre.value}
          />
          <Input
            lable="سال تولید"
            type="text"
            name="productionDate"
            placeholder="سال ساخت فیلم را وارد کنید"
            value={state.productionDate.value}
            error={state.productionDate.error}
            onChange={handleChangeProducedDate}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-6 sm:w-1/2 ">
        <TextArea
          label="توضیحات"
          placeHolder="توضیحات درباره فیلم..."
          value={state.description.value}
          error={state.description.error}
          onChange={handleChangeDescription}
        />
        <div className="w-full flex justify-end gap-5">
          {isEditing === false ? (
            <Button
              borderColor="none"
              textColor="black"
              bgColor="yellow-400"
              type="submit"
              text="ذخیره"
              restClassName="text-black font-semibold"
            />
          ) : (
            <Button
              borderColor="none"
              textColor="black"
              bgColor="yellow-400"
              type="submit"
              text="ویرایش"
              restClassName="text-black font-semibold"
            />
          )}

          <Button
            border="border"
            borderColor="gray-400"
            bgColor="transparent"
            type="reset"
            textColor="white"
            text="انصراف"
          />
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Form;
