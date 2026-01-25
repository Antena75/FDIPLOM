import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/API";
import { useAppSelector } from "../../store/hooks";
import LoaderMain from "../Loader/LoaderMain";
import RentalsTable from "./RentalsTable";

function RentalsList() {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [list, setList] = useState<any>([]);
  const [reload, setReload] = useState<boolean>(false);
  const userId = useAppSelector(state => state.user.id);
  const queryParams = new URLSearchParams(location.search);
  const { rentalsAPI } = API();
  const navigate = useNavigate();

  const handleDeleteRental = (rentalId: string) => {
    try {
      rentalsAPI.removeRental(rentalId, userId)
        .then(() => {          
          iziToast.success({
            message: 'Вы успешно удалили аренду книги',
            position: 'bottomCenter',
          });
          setReload(!reload);
        })
        .catch(err => {
          iziToast.error({
            message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
            position: 'bottomCenter',
          });
        });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setError(false);
    setLoading(true);

    if (!queryParams.get('id')) {
      navigate('/error');
      return;
    }

    const id: any = queryParams.get('id');

    rentalsAPI.search({ userId: id })
      .then(result => {  
        setList(result.data);
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        iziToast.error({
          message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
          position: 'bottomCenter',
        });
      });
  }, [reload]);

  return (
    <>
      {loading ? (
        <LoaderMain />
      ) : (
        error ? (
          <p>Произошла ошибка при загрузке списка!</p>
        ) : (
          <RentalsTable list={list} handleDelete={handleDeleteRental} />
        )
      )}
    </>
  )
}

export default RentalsList