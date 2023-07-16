import axios from 'axios';
import { useData } from '../hooks/useData';
import { useEffect, useState } from 'react';
import { FiTrash2, FiEdit, FiClipboard } from 'react-icons/fi';
import Button from '../component/Button';
import { DataType } from '../interfaces/interfaces';
import { useSubmit } from '../hooks/useSubmit';
import { useEdit } from '../hooks/useEdit';
import ModalDescriptionComponent from '../component/ModalDescription.tsx';
import ModalDelete from '../component/ModalDelete.tsx';
import Input from '../component/Input.tsx';
import { debounce } from 'lodash';
import Select from '../component/Select.tsx';

function MovieTable() {
  const { dataState, dataDispatch } = useData();
  const { state, dispatch } = useSubmit();
  const { isEditing, setIsEditing } = useEdit();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemModalDesc, setItemModalDesc] = useState({});
  const [itemModalDel, setItemModalDel] = useState({});
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ژانر');
  console.log(search);
  const handleSearchChange = (e) => {
    console.log(e);
    setSearch(e);
    dataDispatch({
      type: 'Search_value',
      payload: e,
    });
  };

  const handleModalDesc = (movie: DataType) => {
    setIsOpen(true);
    setItemModalDesc({
      id: movie.id,
      name: movie.name,
      genre: movie.genre,
      director: movie.director,
      productionDate: movie.producedDate,
      description: movie.description,
    });
  };

  const handleModalDel = (movie: DataType) => {
    setIsModalOpen(true);
    setItemModalDel({
      id: movie.id,
      name: movie.name,
      genre: movie.genre,
      director: movie.director,
      productionDate: movie.producedDate,
      description: movie.description,
    });
  };
  const handleChangeGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e);
    const selectedValue = e.target.value;
    console.log(selectedValue);
    setFilter(selectedValue);
  };
  // useEffect(() => {
  //   axios(`http://localhost:5000/movies`).then((res) => {
  //     // console.log(res.data);
  //     dataDispatch({
  //       type: 'Update_data',
  //       payload: res.data,
  //     });
  //   });
  // }, [dataState]);
  useEffect(() => {
    if (filter !== 'ژانر') {
      axios(`http://localhost:5000/movies?genre=${filter}`).then((res) => {
        console.log(res.data);
        dataDispatch({
          type: 'Update_data',
          payload: res.data,
        });
      });
    } else {
      axios(' http://localhost:5000/movies').then((res) => {
        console.log(res.data);

        dataDispatch({
          type: 'Update_data',
          payload: res.data,
        });
      });
    }
  }, [dataState.newRender, filter]);
  // console.log(dataState.allMovies);

  return (
    <>
      <ModalDescriptionComponent
        description={itemModalDesc}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <ModalDelete
        setIsOpen={setIsModalOpen}
        isOpen={isModalOpen}
        dataDispatch={dataDispatch}
        item={itemModalDel}
      />
      <div className="bg-gray-600 px-5 md:px-10 relative min-h-[378px] text-neutral-300 text-center w-full">
        <div className=" w-full pb-5 pt-8 pr:2 md:pr-8 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="w-3 bg-yellow-400 h-8"></div>

            <h3 className=" text-right text-neutral-100 font-bold text-xl">
              لیست فیلم
            </h3>
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <Select
              options={['علمی/تخیلی', 'طنز/کمدی', 'وحشت/هیجانی']}
              selectName="فیلتر بر اساس:"
              onChange={handleChangeGenre}
            />
            <Input
              type="search"
              name={'search'}
              placeholder={'جستجو'}
              value={search}
              onChange={debounce(handleSearchChange, 100)}
              lable={'جستجو'}
            />
          </div>
        </div>
        <div className="overflow-auto menu">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <td className="whitespace-nowrap p-4">ردیف</td>
                <td className="whitespace-nowrap p-4">نام فیلم</td>
                <td className="whitespace-nowrap p-4">کارگردان</td>
                <td className="whitespace-nowrap p-4">ژانر فیلم</td>
                <td className="whitespace-nowrap p-4">سال ساخت</td>
                <td className="whitespace-nowrap p-4">توضیحات</td>
                <td className="whitespace-nowrap p-4">حذف</td>
                <td className="whitespace-nowrap p-4">ویرایش</td>
              </tr>
            </thead>
            <tbody>
              {dataState.allMovies.map((movie: DataType) => {
                return (
                  <tr key={movie.id} className="content-center">
                    <td className="whitespace-nowrap p-4 font-bold">
                      {movie.id}
                    </td>
                    <td className="whitespace-nowrap p-4">{movie.name}</td>
                    <td className="whitespace-nowrap p-4">{movie.genre}</td>
                    <td className="whitespace-nowrap p-4">{movie.director}</td>
                    <td className="whitespace-nowrap p-4">
                      {movie.producedDate}
                    </td>
                    <td className=" p-4">
                      <Button
                        border="border"
                        borderColor="blue-500"
                        // text="توضیحات"
                        type="button"
                        textColor="white"
                        bgColor="transparent"
                        onClick={() => {
                          handleModalDesc(movie);
                        }}
                        children={
                          <span className="text-blue-500">
                            <FiClipboard />
                          </span>
                        }
                        restClassName="text-neutral-100 border-blue-500"
                      />
                    </td>
                    <td className=" p-4 align-top">
                      <Button
                        border="border"
                        borderColor="red-500"
                        // text="حذف"
                        type="button"
                        textColor="white"
                        bgColor="transparent"
                        onClick={() => {
                          handleModalDel(movie);
                        }}
                        children={
                          <span className="text-red-500">
                            <FiTrash2 />
                          </span>
                        }
                        restClassName="border-red-600"
                      />
                    </td>
                    <td className="whitespace-nowrap flex items-center justify-center p-4">
                      <Button
                        border="border"
                        borderColor="red-500"
                        // text="ویرایش"
                        type="button"
                        textColor="white"
                        bgColor="transparent"
                        onClick={() => {
                          setIsEditing(true);
                          dispatch({
                            type: 'Edit_value',
                            payload: {
                              id: movie.id,
                              name: movie.name,
                              genre: movie.genre,
                              director: movie.director,
                              productionDate: movie.producedDate,
                              description: movie.description,
                            },
                          });
                        }}
                        children={
                          <span className="text-green-500">
                            <FiEdit />
                          </span>
                        }
                        restClassName="border-green-600"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default MovieTable;
